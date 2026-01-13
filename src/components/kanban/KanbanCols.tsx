import type { ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { TodoStatus } from "@/types/todo";

interface KanbanColumnProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  status: TodoStatus;
  onDropTodo: (status: TodoStatus) => void;
}

export function KanbanColumn({ title, icon, children, status, onDropTodo }: KanbanColumnProps) {
  return (
    <section
      role="list"
      aria-label={title}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDropTodo(status)}
      className="flex flex-col gap-4"
    >
      <Card className="bg-black/50 border border-white/10 backdrop-blur">
        <CardHeader className="flex flex-row items-center gap-2">
          <span className="text-blue-400">{icon}</span>
          <CardTitle className="text-sm font-semibold uppercase tracking-wide text-white">
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-3">
          {children}
        </CardContent>
      </Card>
    </section>
  );
}
