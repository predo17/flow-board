import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { type User, type Session, AuthError } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

interface SignUpResult {
  error: AuthError | null
  data?: { user: User | null; session: Session | null } | null
}

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{
    data: any
    error: AuthError | null
  }>
  signUp: (email: string, password: string) => Promise<SignUpResult>
  signOut: () => Promise<void>
  resendConfirmationEmail: (email: string) => Promise<{ error: AuthError | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verifica a sessão atual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Escuta mudanças na autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      })
      
      if (error) {
        console.error('Erro no signIn:', {
          message: error.message,
          status: error.status,
          name: error.name,
        })
        
        // Melhorar mensagem de erro para 400
        if (error.status === 400) {
          if (error.message.includes('Credenciais de login inválidas') || 
              error.message.includes('E-mail não confirmado')) {
            // Manter a mensagem original do Supabase
          } else {
            // Para outros erros 400, dar uma mensagem mais genérica mas útil
            error.message = 'Credenciais inválidas. Verifique se você criou uma conta primeiro.'
          }
        }
      } else {
        console.log('Login bem-sucedido:', data.user?.email)
      }
      
      return { error }
    } catch (err) {
      console.error('Erro inesperado no signIn:', err)
      return { 
        error: { 
          message: 'Erro ao fazer login. Tente novamente.', 
          name: 'AuthError',
          status: 500
        } as AuthError 
      }
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
      })
      
      if (error) {
        console.error('Erro no signUp:', {
          message: error.message,
          status: error.status,
          name: error.name,
        })
      } else {
        console.log('Registro bem-sucedido:', data.user?.email)
        // Se o email precisa ser confirmado, o Supabase retorna user mas sem session
        if (data.user && !data.session) {
          console.log('Email de confirmação foi enviado')
        } else if (data.session) {
          console.log('Usuário logado automaticamente (confirmação de email desabilitada)')
        }
      }
      
      return { error, data }
    } catch (err) {
      console.error('Erro inesperado no signUp:', err)
      return { 
        error: { 
          message: 'Erro ao criar conta. Tente novamente.', 
          name: 'AuthError',
          status: 500
        } as AuthError,
        data: null
      }
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const resendConfirmationEmail = async (email: string) => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email.trim().toLowerCase(),
      })
      
      if (error) {
        console.error('Erro ao reenviar email:', error)
      } else {
        console.log('Email de confirmação reenviado para:', email)
      }
      
      return { error }
    } catch (err) {
      console.error('Erro inesperado ao reenviar email:', err)
      return { 
        error: { 
          message: 'Erro ao reenviar email. Tente novamente.', 
          name: 'AuthError',
          status: 500
        } as AuthError 
      }
    }
  }

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    resendConfirmationEmail,
  } as AuthContextType;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
