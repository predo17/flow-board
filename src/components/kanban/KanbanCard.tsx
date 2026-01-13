import { Card, CardContent } from "@/components/ui/card";
import { GripVertical } from "lucide-react";
import type { Todo } from "@/types/todo";

interface KanbanCardProps {
  todo: Todo;
  onDragStart: (todoId: number) => void;
}

export function KanbanCard({ todo, onDragStart }: KanbanCardProps) {
  return (
    <Card
      role="listitem"
      tabIndex={0}
      draggable
      onDragStart={() => onDragStart(todo.id)}
      className="bg-black/40 border border-white/10 text-white 
                 hover:border-blue-500/40 transition 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-grab active:cursor-grabbing"
    >
      <CardContent className="flex items-start gap-3 p-4">
        <GripVertical className="text-white/40 mt-1" size={18} />
        
        <p className="text-sm leading-relaxed text-white/90 w-full">
          {todo.title}
        </p>
      </CardContent>
    </Card>
  );
}
