import { useState } from "react";
import { Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Todo } from "@/types/todo";

interface AddTaskColumnProps {
  onAddTask: (title: string) => void;
}

export function AddTaskColumn({ onAddTask }: AddTaskColumnProps) {
  const [title, setTitle] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    setIsAdding(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      onAddTask(title.trim());
      setTitle("");
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <section className="shrink-0">
      <Card className="
        bg-black/50 border border-white/10 backdrop-blur
        w-[280px]
        sm:w-[340px]
        md:w-[440px]
        min-h-[75vh]
        lg:min-h-[80vh]
        flex flex-col
      ">
        <CardHeader className="flex flex-row items-center gap-2">
          <span className="text-blue-400">
            <Plus size={18} />
          </span>
          <CardTitle className="text-sm font-semibold uppercase tracking-wide text-white">
            Nova Tarefa
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col gap-3">
          <form onSubmit={handleSubmit} className="space-y-3">
            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o título da tarefa..."
              className="w-full px-4 py-3 rounded-md border border-white/20 bg-black/40 
                       text-white placeholder:text-white/40 
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       resize-none min-h-[100px]"
              disabled={isAdding}
            />
            
            <Button
              type="submit"
              disabled={!title.trim() || isAdding}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              {isAdding ? "Adicionando..." : "Adicionar Tarefa"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
