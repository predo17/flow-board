import { KanbanSquare, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface KanbanHeaderProps {
    onReset: () => void;
    isLoading: boolean;
}

export function KanbanHeader({ onReset, isLoading }: KanbanHeaderProps) {
    return (
        <header
            className="
        sticky top-0 z-50
        border-b border-white/10
        bg-black/40 backdrop-blur-xl
      "
        >
            <div className="max-w-8xl mx-auto px-4 py-5">
                <div className="flex items-center justify-between gap-4">

                    {/* Logo + Title */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center h-10 w-10 rounded-xl
                            bg-gradient-to-br from-blue-500/20 to-purple-500/20
                            border border-white/10">
                            <KanbanSquare
                                className="h-5 w-5 text-blue-400"
                                aria-hidden="true"
                            />
                        </div>

                        <div>
                            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
                                FlowBoard
                            </h1>
                            <p className="text-xs sm:text-sm text-white/60">
                                Organize suas tarefas com foco e clareza
                            </p>
                        </div>
                    </div>

                    {/* Action */}
                    <Button
                        onClick={onReset}
                        disabled={isLoading}
                        variant="outline"
                        size="sm"
                        aria-label="Reset board to initial state"
                        className="border-white/20 text-white hover:bg-white/10 hover:text-white disabled:opacity-50 cursor-pointer"
                    >
                        <RotateCcw className="mr-2 h-4 w-4" aria-hidden="true" />
                        Reset
                    </Button>
                </div>
            </div>
        </header>
    );
}
