import { KanbanSquare, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export function KanbanHeader() {
    const { signOut, user } = useAuth();

    const handleSignOut = async () => {
        await signOut();
    };

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
                    <div className="flex items-start gap-4">
                        <div className="flex items-center justify-center h-10 w-10 rounded-xl
                            bg-linear-to-br from-blue-500/20 to-purple-500/20
                            border border-white/10 mt-1">
                            <KanbanSquare
                                className="h-6 w-6 text-blue-400"
                                aria-hidden="true"
                            />
                        </div>

                        <div>
                            <h1 className="text-lg sm:text-2xl font-semibold tracking-tight text-white">
                                FlowBoard
                            </h1>
                            <p className="text-[10px] sm:text-sm text-white/60">
                                {user?.email ? `Olá, ${user.email.split('@')[0]}` : 'Organize suas tarefas com foco e clareza'}
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <Button
                        onClick={handleSignOut}
                        variant="outline"
                        size="sm"
                        aria-label="Sair"
                        className="bg-white/5 border-white/20 text-white hover:text-white hover:bg-red-500/20 hover:border-red-500/50 transition-colors duration-300"
                    >
                        <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                        Sair
                    </Button>
                </div>
            </div>
        </header>
    );
}
