![FlowBoard](/public/flow-board.png)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.18-38B2AC?logo=tailwind-css)

# 📋 FlowBoard - Kanban Board

Um aplicativo moderno de gerenciamento de tarefas estilo Kanban, desenvolvido com React, TypeScript e TailwindCSS. Organize suas tarefas com foco e clareza através de uma interface intuitiva e responsiva.


## ✨ Funcionalidades

- **📊 Sistema Kanban Completo**: Organize tarefas em três colunas (To Do, In-Progress, Done)
- **🖱️ Drag and Drop**: Arraste e solte cards entre colunas para atualizar o status das tarefas
- **💾 Persistência Local**: Todas as mudanças são salvas automaticamente no localStorage
- **🔄 Reset Intuitivo**: Botão de reset para restaurar o estado inicial do board
- **⚡ Loading States**: Animações de carregamento durante operações
- **📱 Design Responsivo**: Interface adaptável para desktop, tablet e mobile
- **♿ Acessibilidade**: Componentes com suporte a ARIA e navegação por teclado

## 🛠️ Tecnologias Utilizadas

- **React 19.2.0** - Biblioteca JavaScript para construção de interfaces
- **TypeScript 5.9.3** - Superset JavaScript com tipagem estática
- **Vite 7.2.4** - Build tool rápida e moderna
- **TailwindCSS 4.1.18** - Framework CSS utility-first
- **Lucide React** - Biblioteca de ícones moderna e leve
- **Radix UI** - Componentes acessíveis e sem estilo
- **shadcn/ui** - Componentes UI construídos com Radix UI e TailwindCSS

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn** ou **pnpm**

## 🚀 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/flow-board.git
```

2. Entre no diretório do projeto:
```bash
cd flow-board
```

3. Instale as dependências:
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

## 💻 Como Usar

### Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

## 📁 Estrutura do Projeto

```
flow-board/
├── public/
├── src/
│   ├── components/             # Componentes React
│   │   ├── AnimatedList.tsx    # Lista animada reutilizável
│   │   ├── auth/               # Autenticação e rotas protegidas
│   │   │   ├── LoginForm.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── kanban/             # Componentes do Kanban Board
│   │   │   ├── AddTaskColumn.tsx
│   │   │   ├── DeleteConfirmDialog.tsx
│   │   │   ├── KanbanBoard.tsx
│   │   │   ├── KanbanCard.tsx
│   │   │   ├── KanbanCols.tsx
│   │   │   └── KanbanHeade.tsx
│   │   └── ui/                 # Componentes UI reutilizáveis
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       └── dialog.tsx
│   ├── contexts/               # Contextos React
│   │   └── AuthContext.tsx
│   ├── lib/                    # Integrações e helpers
│   │   ├── supabase.ts
│   │   ├── todos.ts
│   │   └── utils.ts
│   ├── types/                  # Tipos TypeScript
│   │   └── todo.ts
│   ├── App.tsx                 # Componente raiz
│   ├── main.tsx                # Ponto de entrada
│   └── index.css               # Estilos globais
├── package.json
├── tsconfig.json               # Configuração TypeScript
├── vite.config.ts              # Configuração Vite
└── README.md
```

## 🎯 Funcionalidades Detalhadas

### Drag and Drop
- Arraste cards entre colunas para atualizar o status das tarefas
- Feedback visual durante o arrasto
- Atualização automática do estado

### Autenticação & integração
- Integração com Supabase para autenticação de usuários
- Proteção de rotas com `ProtectedRoute`
- Formulário de login simples

### Adicionar/Remover Tarefas
- Formulário para adicionar uma nova tarefa
- Botão para remover tarefas somente na coluna "DONE"

## 🎨 Customização

### Personalizar Estilos

Os estilos são gerenciados pelo TailwindCSS. Edite as classes nos componentes ou modifique `src/index.css` para estilos globais.

## 🔮 Melhorias Futuras

- [x] Integração com API REST
- [x] Autenticação de usuários
- [ ] Múltiplos boards
- [ ] Edição de tarefas inline
- [x] Adicionar/remover tarefas
- [ ] Filtros e busca

