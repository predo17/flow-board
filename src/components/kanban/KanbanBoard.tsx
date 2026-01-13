import { useState } from "react";
import { ListTodo, Loader2, CheckCircle2 } from "lucide-react";

import { KanbanHeader } from "./KanbanHeade";
import { KanbanColumn } from "@/components/kanban/KanbanCols";
import { KanbanCard } from "@/components/kanban/KanbanCard";

import type { Todo, TodoStatus } from "@/types/todo";

const initialTodos: Todo[] = [
  { id: 1, title: "Criar layout do Kanban", status: "todo" },
  { id: 2, title: "Integrar API REST", status: "inProgress" },
  { id: 3, title: "Finalizar acessibilidade", status: "done" },
];

export default function KanbanBoard() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [draggedTodoId, setDraggedTodoId] = useState<number | null>(null)

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950">

      <KanbanHeader onReset={() => { }} isLoading={false} />

      {/* background effects omitidos para foco */}
      <div className="relative max-w-8xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          <KanbanColumn title="To Do" icon={<ListTodo size={18} />} status="todo" onDropTodo={handleDrop}>
            {todos
              .filter(t => t.status === "todo")
              .map(todo => (
                <KanbanCard key={todo.id} todo={todo} onDragStart={handleDragStart} />
              ))}
          </KanbanColumn>

          <KanbanColumn title="In Progress" icon={<Loader2 size={18} />} status="inProgress" onDropTodo={handleDrop}>
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
  );
}
