import { type ReactNode, useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { LoginForm } from './LoginForm'
import { Loader2 } from 'lucide-react'

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const [showLoader, setShowLoader] = useState(false)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>


    if (loading) {
      timer = setTimeout(() => {
        setShowLoader(true)
      }, 500) // delay real do loader
    } else {
      setShowLoader(false)
    }

    return () => clearTimeout(timer)
  }, [loading])

  if (loading && showLoader) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-950 via-black to-gray-950">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
          <p className="text-lg font-medium text-muted-foreground">
            Carregando...
          </p>
        </div>
      </div>
    )
  }

  if (!loading && !user) {
    return <LoginForm />
  }

  if (!loading && user) {
    return <>{children}</>
  }

  return null
}

