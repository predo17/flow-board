import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Loader2, Mail, Lock, LogIn, Send } from 'lucide-react'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isSignUp, setIsSignUp] = useState(false)
  const [needsConfirmation, setNeedsConfirmation] = useState(false)

  const { signIn, signUp, resendConfirmationEmail } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setIsLoading(true)

    try {
      const result = isSignUp
        ? await signUp(email, password)
        : await signIn(email, password)

      if (result.error) {
        // Mensagens de erro mais amigáveis
        let errorMessage = result.error.message
        
        if (result.error.message.includes('Credenciais de login inválidas')) {
          errorMessage = 'Email ou senha incorretos. Verifique suas credenciais.'
          setNeedsConfirmation(false)
        } else if (result.error.message.includes('E-mail não confirmado')) {
          errorMessage = 'Por favor, verifique seu email antes de fazer login.'
          setNeedsConfirmation(true)
        } else if (result.error.message.includes('Usuário já cadastrado')) {
          errorMessage = 'Este email já está cadastrado. Faça login ou use outro email.'
          setNeedsConfirmation(false)
        } else if (result.error.message.includes('A senha deve ser pelo menos')) {
          errorMessage = 'A senha deve ter pelo menos 8 caracteres.'
          setNeedsConfirmation(false)
        } else if (result.error.message.includes('Invalid email')) {
          errorMessage = 'Por favor, insira um email válido.'
          setNeedsConfirmation(false)
        } else if (result.error.status === 400 && !result.error.message.includes('Credenciais de login inválidas')) {
          errorMessage = 'Credenciais inválidas. Certifique-se de ter criado uma conta primeiro.'
          setNeedsConfirmation(false)
        }
        
        console.error('Erro de autenticação:', result.error)
        setError(errorMessage)
      } else if (isSignUp) {
        // Sucesso no registro
        // Verificar se precisa confirmar email (Supabase retorna user mas sem session se precisa confirmar)
        const needsEmailConfirmation = true // Assuymimos que precisa confirmar se não há sessão
        if (needsEmailConfirmation) {
          setNeedsConfirmation(true)
          setSuccess('Conta criada! Verifique seu email para confirmar sua conta antes de fazer login.')
        } else {
          setSuccess('Conta criada com sucesso! Você pode fazer login agora.')
        }
        setIsSignUp(false) // Mudar para modo de login
        setPassword('') // Limpar senha
      } else {
        // Login bem-sucedido
        setNeedsConfirmation(false)
      }
    } catch (err) {
      console.error('Erro inesperado:', err)
      setError('Ocorreu um erro inesperado. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-950 via-black to-gray-950 p-4">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            {isSignUp ? 'Criar Conta' : 'Bem-vindo de volta'}
          </h1>
          <p className="text-muted-foreground">
            {isSignUp
              ? 'Crie sua conta para começar'
              : 'Faça login para acessar seu Kanban'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
              <Mail size={16} />
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="seu@email.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
              <Lock size={16} />
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="••••••••"
            />
          </div>

          {success && (
            <div className="p-3 rounded-md bg-green-500/10 text-green-500 text-sm">
              <p className="font-medium">{success}</p>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm space-y-2">
              <p className="font-medium">{error}</p>
              {error.includes('Email ou senha incorretos') && (
                <p className="text-xs text-muted-foreground">
                  Certifique-se de ter criado uma conta primeiro. Se ainda não tem, clique em "Criar conta" abaixo.
                </p>
              )}
              {error.includes('Credenciais inválidas') && (
                <p className="text-xs text-muted-foreground">
                  Você precisa criar uma conta primeiro antes de fazer login.
                </p>
              )}
              {needsConfirmation && (
                <div className="mt-2 space-y-2">
                  <p className="text-xs text-muted-foreground">
                    Verifique sua caixa de entrada (e spam) por um email de confirmação.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={async () => {
                      setIsResending(true)
                      setError(null)
                      const { error: resendError } = await resendConfirmationEmail(email)
                      if (resendError) {
                        setError('Erro ao reenviar email. Tente novamente.')
                      } else {
                        setSuccess('Email de confirmação reenviado! Verifique sua caixa de entrada.')
                      }
                      setIsResending(false)
                    }}
                    disabled={isResending || !email}
                    className="w-full text-xs"
                  >
                    {isResending ? (
                      <>
                        <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                        Reenviando...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-3 w-3" />
                        Reenviar email de confirmação
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isSignUp ? 'Criando conta...' : 'Entrando...'}
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" />
                {isSignUp ? 'Criar Conta' : 'Entrar'}
              </>
            )}
          </Button>
        </form>

        <div className="text-center">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp)
              setError(null)
              setSuccess(null)
              setNeedsConfirmation(false)
            }}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {isSignUp
              ? 'Já tem uma conta? Faça login'
              : 'Não tem uma conta? Criar conta'}
          </button>
        </div>
      </Card>
    </div>
  )
}
