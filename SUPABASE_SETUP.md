# 🗄️ Configuração do Banco de Dados - Supabase

Para que as tarefas funcionem corretamente, você precisa criar a tabela `todos` no Supabase.

## Passo a Passo

### 1. Acessar o SQL Editor

1. Acesse o dashboard do Supabase
2. Vá em **SQL Editor** no menu lateral
3. Clique em **New Query**

### 2. Criar a Tabela

Cole o seguinte SQL e execute:

```sql
-- Criar tabela de tarefas
CREATE TABLE todos (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('todo', 'inProgress', 'done')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Criar índice para melhorar performance nas consultas por usuário
CREATE INDEX idx_todos_user_id ON todos(user_id);

-- Criar índice para ordenação
CREATE INDEX idx_todos_created_at ON todos(created_at DESC);

-- Habilitar Row Level Security (RLS)
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Criar política para usuários só verem suas próprias tarefas
CREATE POLICY "Users can view their own todos"
  ON todos FOR SELECT
  USING (auth.uid() = user_id);

-- Criar política para usuários criarem suas próprias tarefas
CREATE POLICY "Users can create their own todos"
  ON todos FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Criar política para usuários atualizarem suas próprias tarefas
CREATE POLICY "Users can update their own todos"
  ON todos FOR UPDATE
  USING (auth.uid() = user_id);

-- Criar política para usuários deletarem suas próprias tarefas
CREATE POLICY "Users can delete their own todos"
  ON todos FOR DELETE
  USING (auth.uid() = user_id);

-- Criar função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Criar trigger para atualizar updated_at
CREATE TRIGGER update_todos_updated_at
  BEFORE UPDATE ON todos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### 3. Verificar

Após executar o SQL:

1. Vá em **Table Editor** no menu lateral
2. Você deve ver a tabela `todos` listada
3. A tabela deve ter as colunas: `id`, `user_id`, `title`, `status`, `created_at`, `updated_at`

### 4. Testar

1. Faça login na aplicação
2. Crie uma nova tarefa
3. Verifique no **Table Editor** se a tarefa foi criada corretamente

## Estrutura da Tabela

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | BIGSERIAL | ID único da tarefa (auto-incremento) |
| `user_id` | UUID | ID do usuário (referência para auth.users) |
| `title` | TEXT | Título da tarefa |
| `status` | TEXT | Status: 'todo', 'inProgress' ou 'done' |
| `created_at` | TIMESTAMP | Data de criação |
| `updated_at` | TIMESTAMP | Data da última atualização |

## Segurança

- **Row Level Security (RLS)** está habilitado
- Usuários só podem ver, criar, atualizar e deletar suas próprias tarefas
- As políticas garantem que cada usuário tenha acesso apenas às suas tarefas

## Notas

- A tabela está configurada para deletar automaticamente as tarefas quando um usuário é deletado (CASCADE)
- O campo `updated_at` é atualizado automaticamente quando uma tarefa é modificada
- Os índices melhoram a performance das consultas
