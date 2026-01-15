import type { ReactNode } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import AnimatedList from "@/components/AnimatedList";
import type { TodoStatus } from "@/types/todo";

interface KanbanColumnProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  status: TodoStatus;
  onDropTodo: (status: TodoStatus) => void;
}

export function KanbanColumn({
  title,
  icon,
  children,
  status,
  onDropTodo,
}: KanbanColumnProps) {
  return (
    <section
      role="list"
      aria-label={title}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDropTodo(status)}
      className="shrink-0"
    >
      <Card
        className="
          bg-black/50 border border-white/10 backdrop-blur w-[clamp(240px,23rem,39rem)] min-h-[75vh] lg:min-h-[80vh] flex flex-col">
        <CardHeader className="flex flex-row items-center gap-2">
          <span className="text-blue-400">{icon}</span>
          <CardTitle className="text-sm font-semibold uppercase tracking-wide text-white">
            {title}
          </CardTitle>
        </CardHeader>

        <div className="flex-1 px-3 py-2">
          <AnimatedList
            className="w-full"
            maxHeight="calc(70vh - 5.5rem)"
            showGradients={true}
            enableArrowNavigation={false}
            displayScrollbar={true}
            onItemSelect={undefined}
          >
            {children}
          </AnimatedList>
        </div>
      </Card>
    </section>
  );
}
