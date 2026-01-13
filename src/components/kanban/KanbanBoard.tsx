import { useState, useEffect } from "react";
import { ListTodo, Loader2, CheckCircle2 } from "lucide-react";

import { KanbanHeader } from "./KanbanHeade";
import { KanbanColumn } from "@/components/kanban/KanbanCols";
import { KanbanCard } from "@/components/kanban/KanbanCard";
import { initialTodos } from "@/utils/Tarefas";

import type { Todo, TodoStatus } from "@/types/todo";

const STORAGE_KEY = "kanban-todos";

function loadTodosFromStorage(): Todo[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Erro ao carregar todos do localStorage:", error);
  }
  return initialTodos;
}

function saveTodosToStorage(todos: Todo[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error("Erro ao salvar todos no localStorage:", error);
  }
}

function clearTodosFromStorage() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Erro ao limpar todos do localStorage:", error);
  }
}

export default function KanbanBoard() {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodosFromStorage());
  const [draggedTodoId, setDraggedTodoId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Salva os todos no localStorage sempre que houver mudanças
  useEffect(() => {
    saveTodosToStorage(todos);
  }, [todos]);

  function handleDragStart(todoId: number) {
    setDraggedTodoId(todoId);
  }

  function handleDrop(status: TodoStatus) {
    if (draggedTodoId === null) return;

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === draggedTodoId
          ? { ...todo, status }
          : todo
      )
    );

    setDraggedTodoId(null);
  }

  async function handleReset() {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      clearTodosFromStorage();
      setTodos(initialTodos);
    } catch (error) {
      console.error("Erro ao resetar todos:", error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-950 via-black to-gray-950">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" aria-hidden="true" />
          <p className="text-lg font-medium text-muted-foreground">Carregando suas tarefas...</p>
          <p className="text-sm text-muted-foreground">Por favor, espere um momento</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-black to-gray-950">

      <div className="mb-4">
        <KanbanHeader onReset={handleReset} isLoading={isLoading} />
      </div>

      <div className="w-full overflow-x-auto">
        <div className="min-w-fit p-4">
          <div className="flex min-w-max md:justify-start xl:justify-center gap-6">

            <KanbanColumn title="To Do" icon={<ListTodo size={18} />} status="todo" onDropTodo={handleDrop}>
              {todos
                .filter(t => t.status === "todo")
                .map(todo => (
                  <KanbanCard key={todo.id} todo={todo} onDragStart={handleDragStart} />
                ))}
            </KanbanColumn>

            <KanbanColumn title="In-Progress" icon={<Loader2 size={18} />} status="inProgress" onDropTodo={handleDrop}>
              {todos
                .filter(t => t.status === "inProgress")
                .map(todo => (
                  <KanbanCard key={todo.id} todo={todo} onDragStart={handleDragStart} />
                ))}
            </KanbanColumn>

            <KanbanColumn title="Done" icon={<CheckCircle2 size={18} />} status="done" onDropTodo={handleDrop}>
              {todos
                .filter(t => t.status === "done")
                .map(todo => (
                  <KanbanCard key={todo.id} todo={todo} onDragStart={handleDragStart} />
                ))}
            </KanbanColumn>
          </div>
        </div>
      </div>
    </div>
  );
}
