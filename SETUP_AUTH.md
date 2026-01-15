# 🔐 Configuração de Autenticação

Este projeto usa **Supabase** para autenticação de usuários.

## Passo a Passo

### 1. Criar conta no Supabase

1. Acesse [https://supabase.com](https://supabase.com)
2. Crie uma conta gratuita
3. Crie um novo projeto

### 2. Obter credenciais

No dashboard do Supabase:
1. Vá em **Settings** → **API**
2. Copie a **URL** do projeto
3. Copie a **anon/public key**

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com:

```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anon_do_supabase
```

**Exemplo:**
```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. Habilitar autenticação por email

No dashboard do Supabase:
1. Vá em **Authentication** → **Providers**
2. Certifique-se de que **Email** está habilitado
3. Configure as opções de email conforme necessário

### 4.1. Configurar confirmação de email (Opcional)

**Para desenvolvimento:**
- Vá em **Authentication** → **Settings** → **Email Auth**
- Desabilite **"Confirm email"** se quiser que os usuários possam fazer login imediatamente após criar a conta
- Isso é útil durante o desenvolvimento para não precisar verificar emails

**Para produção:**
- Mantenha **"Confirm email"** habilitado para maior segurança
- Os usuários receberão um email de confirmação após se registrarem
- Eles precisarão clicar no link do email antes de fazer login

### 5. Testar

1. Execute `npm run dev`
2. Acesse a aplicação
3. Crie uma conta ou faça login

## Funcionalidades

- ✅ Login com email e senha
- ✅ Registro de novos usuários
- ✅ Logout
- ✅ Proteção de rotas (usuários não autenticados são redirecionados para login)
- ✅ Sessão persistente (usuário permanece logado após recarregar a página)
- ✅ Reenvio de email de confirmação
- ✅ Mensagens de erro claras e em português

## Próximos Passos (Opcional)

Você pode expandir a autenticação para:
- Salvar tarefas por usuário no banco de dados
- Adicionar autenticação social (Google, GitHub, etc.)
- Recuperação de senha
- Verificação de email
