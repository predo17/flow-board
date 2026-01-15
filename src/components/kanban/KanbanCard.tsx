import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GripVertical, Trash2 } from "lucide-react";
import type { Todo } from "@/types/todo";

interface KanbanCardProps {
  todo: Todo;
  onDragStart: (todoId: number) => void;
  onDelete?: (todoId: number) => void;
}

export function KanbanCard({ todo, onDragStart, onDelete }: KanbanCardProps) {
  const isDone = todo.status === "done";

  return (
    <Card
      role="listitem"
      tabIndex={0}
      draggable
      onDragStart={() => onDragStart(todo.id)}
      className="bg-black/40 border border-white/10 text-white 
                 hover:border-blue-500/40 transition 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-grab active:cursor-grabbing
                 relative group m-0.5"
    >
      <CardContent className="flex items-start gap-3 p-4">
        <GripVertical className="text-white/40 mt-1" size={18} />
        
        <p className="text-sm leading-relaxed text-white/90 w-full pr-8">
          {todo.title}
        </p>

        {isDone && onDelete && (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(todo.id);
            }}
            className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 focus:opacity-100 group-focus:opacity-100 transition-opacity
                       hover:bg-red-500/20 hover:text-red-400 text-white/60"
            aria-label="Excluir tarefa"
          >
            <Trash2 size={14} />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
