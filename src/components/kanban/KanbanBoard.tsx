import { useState, useEffect, useCallback } from "react";
import { ListTodo, Loader2, CheckCircle2 } from "lucide-react";

import { KanbanHeader } from "./KanbanHeade";
import { KanbanColumn } from "@/components/kanban/KanbanCols";
import { KanbanCard } from "@/components/kanban/KanbanCard";
import { AddTaskColumn } from "@/components/kanban/AddTaskColumn";
import { DeleteConfirmDialog } from "@/components/kanban/DeleteConfirmDialog";
import { useAuth } from "@/contexts/AuthContext";
import { fetchTodos, createTodo, updateTodoStatus, deleteTodo } from "@/lib/todos";

import type { Todo, TodoStatus } from "@/types/todo";

export default function KanbanBoard() {
  const { user } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [draggedTodoId, setDraggedTodoId] = useState<number | null>(null);
  const [todoToDelete, setTodoToDelete] = useState<number | null>(null);

  const loadTodos = useCallback(async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const fetchedTodos = await fetchTodos(user.id);
      setTodos(fetchedTodos);
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Carrega tarefas do Supabase quando o usuário estiver logado
  useEffect(() => {
    if (user) {
      loadTodos();
    }
  }, [user, loadTodos]);

  function handleDragStart(todoId: number) {
    setDraggedTodoId(todoId);
  }

  async function handleDrop(status: TodoStatus) {
    if (draggedTodoId === null) return;

    // Atualiza otimisticamente na UI
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === draggedTodoId
          ? { ...todo, status }
          : todo
      )
    );

    // Atualiza no Supabase
    const success = await updateTodoStatus(draggedTodoId, status);
    if (!success) {
      // Reverte se houver erro
      loadTodos();
    }

    setDraggedTodoId(null);
  }

  async function handleAddTask(title: string) {
    if (!user) return;

    // Adiciona otimisticamente na UI
    const tempId = Date.now(); // ID temporário
    const tempTodo: Todo = {
      id: tempId,
      title,
      status: "todo",
    };
    setTodos((prev) => [...prev, tempTodo]);

    // Cria no Supabase
    const newTodo = await createTodo(user.id, title, "todo");
    if (newTodo) {
      // Substitui o temporário pelo real
      setTodos((prev) => prev.map(t => t.id === tempId ? newTodo : t));
    } else {
      // Remove o temporário se houver erro
      setTodos((prev) => prev.filter(t => t.id !== tempId));
    }
  }

  function handleDeleteClick(todoId: number) {
    setTodoToDelete(todoId);
  }

  async function handleConfirmDelete() {
    if (todoToDelete === null) return;
    
    const todoIdToDelete = todoToDelete;
    setTodoToDelete(null); // Fecha o diálogo

    // Remove otimisticamente da UI
    setTodos((prev) => prev.filter((todo) => todo.id !== todoIdToDelete));

    // Deleta no Supabase
    const success = await deleteTodo(todoIdToDelete);
    if (!success) {
      // Recarrega se houver erro
      loadTodos();
    }
  }

  function handleCancelDelete() {
    setTodoToDelete(null);
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-950 via-black to-gray-950">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-blue-400" aria-hidden="true" />
          <p className="text-lg font-medium text-white/70">Carregando suas tarefas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-black to-gray-950">

      <div className="mb-4">
        <KanbanHeader/>
      </div>

      <div className="w-full overflow-x-auto kanban-scroll">
        <div className="min-w-fit p-4">
          <div className="flex min-w-max md:justify-start xl:justify-center gap-6">

            <AddTaskColumn onAddTask={handleAddTask} />

            <KanbanColumn title="To Do" icon={<ListTodo size={18} />} status="todo" onDropTodo={handleDrop}>
              {todos
                .filter(t => t.status === "todo")
                .sort((r, a) => r.id - a.id)
                .map(todo => (
                  <KanbanCard 
                    key={todo.id} 
                    todo={todo} 
                    onDragStart={handleDragStart}
                    onDelete={handleDeleteClick}
                  />
                ))}
            </KanbanColumn>

            <KanbanColumn title="In-Progress" icon={<Loader2 size={18} />} status="inProgress" onDropTodo={handleDrop}>
              {todos
                .filter(t => t.status === "inProgress")
                .map(todo => (
                  <KanbanCard 
                    key={todo.id} 
                    todo={todo} 
                    onDragStart={handleDragStart}
                    onDelete={handleDeleteClick}
                  />
                ))}
            </KanbanColumn>

            <KanbanColumn title="Done" icon={<CheckCircle2 size={18} />} status="done" onDropTodo={handleDrop}>
              {todos
                .filter(t => t.status === "done")
                .map(todo => (
                  <KanbanCard 
                    key={todo.id} 
                    todo={todo} 
                    onDragStart={handleDragStart}
                    onDelete={handleDeleteClick}
                  />
                ))}
            </KanbanColumn>
          </div>
        </div>
      </div>

      <DeleteConfirmDialog
        open={todoToDelete !== null}
        onOpenChange={(open) => !open && handleCancelDelete()}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        taskTitle={todos.find(t => t.id === todoToDelete)?.title || ""}
      />
    </div>
  );
}
