import KanbanBoard from "./components/kanban/KanbanBoard"
import { AuthProvider } from "./contexts/AuthContext"
import { ProtectedRoute } from "./components/auth/ProtectedRoute"

function App() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <KanbanBoard />
      </ProtectedRoute>
    </AuthProvider>
  )
}

export default App
