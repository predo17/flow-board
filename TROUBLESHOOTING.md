# 🔧 Troubleshooting - Erros de Autenticação

## Erro 400 (Bad Request) ao fazer login

Este erro geralmente acontece por um dos seguintes motivos:

### 1. **Usuário não existe**
   - **Solução**: Certifique-se de criar uma conta primeiro usando o botão "Criar conta"
   - Não é possível fazer login com um email que não foi registrado

### 2. **Senha incorreta**
   - **Solução**: Verifique se está usando a senha correta
   - A senha é case-sensitive (diferencia maiúsculas e minúsculas)

### 3. **Email não verificado (Email not confirmed)**
   - **Problema**: Se a verificação de email estiver habilitada no Supabase, você precisa verificar o email antes de fazer login
   - **Solução**: 
     - Verifique sua caixa de entrada (e spam) por um email do Supabase
     - Clique no link de confirmação no email
     - Use o botão **"Reenviar email de confirmação"** na tela de login se não recebeu o email
     - **Para desenvolvimento**: Desabilite a confirmação de email em **Authentication** → **Settings** → **Email Auth** → Desmarque **"Confirm email"**

### 4. **Configuração do Supabase**

Verifique no dashboard do Supabase:

1. **Authentication → Settings → Email Auth**
   - Certifique-se de que "Enable Email Signup" está habilitado
   - Verifique as configurações de "Confirm email"

2. **Authentication → Providers → Email**
   - Deve estar habilitado

3. **Settings → API**
   - Verifique se a URL e a chave anon estão corretas no seu `.env`

### 5. **Variáveis de ambiente**

Certifique-se de que o arquivo `.env` está na raiz do projeto e contém:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_aqui
```

**Importante**: 
- Reinicie o servidor de desenvolvimento após criar/editar o `.env`
- Use `npm run dev` novamente

### 6. **Verificar no Console do Navegador**

Abra o Console do navegador (F12) e verifique:
- Se as variáveis de ambiente estão sendo carregadas
- Se há outros erros além do 400
- As mensagens de log que foram adicionadas

## Como testar

1. **Primeiro, crie uma conta:**
   - Clique em "Criar conta"
   - Use um email válido
   - Senha com pelo menos 6 caracteres
   - Clique em "Criar Conta"

2. **Depois, faça login:**
   - Use o mesmo email e senha
   - Clique em "Entrar"

## Se o problema persistir

1. Verifique os logs no console do navegador
2. Verifique os logs no dashboard do Supabase (Authentication → Logs)
3. Certifique-se de que o projeto do Supabase está ativo e não foi pausado
