import { KanbanHeader } from "./KanbanHeade";
import { KanbanColumn } from "@/components/kanban/KanbanCols";
import { KanbanCard } from "@/components/kanban/KanbanCard";
import { ListTodo, Loader2, CheckCircle2 } from "lucide-react";
import type { Todo } from "@/types/todo";

const todos: Todo[] = [
  { id: 1, title: "Criar layout do Kanban", status: "todo" },
  { id: 2, title: "Integrar API REST", status: "inProgress" },
  { id: 3, title: "Finalizar acessibilidade", status: "done" },
];

export default function KanbanBoard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950">

      <KanbanHeader onReset={() => { }} isLoading={false} />

      {/* background effects omitidos para foco */}
      <div className="relative max-w-8xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          <KanbanColumn title="To Do" icon={<ListTodo size={18} />}>
            {todos
              .filter(t => t.status === "todo")
              .map(todo => (
                <KanbanCard key={todo.id} todo={todo} />
              ))}
          </KanbanColumn>

          <KanbanColumn title="In Progress" icon={<Loader2 size={18} />}>
            {todos
              .filter(t => t.status === "inProgress")
              .map(todo => (
                <KanbanCard key={todo.id} todo={todo} />
              ))}
          </KanbanColumn>

          <KanbanColumn title="Done" icon={<CheckCircle2 size={18} />}>
            {todos
              .filter(t => t.status === "done")
              .map(todo => (
                <KanbanCard key={todo.id} todo={todo} />
              ))}
          </KanbanColumn>

        </div>
      </div>
    </div>
  );
}
