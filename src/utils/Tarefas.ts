import type { Todo } from "@/types/todo";

export const initialTodos: Todo[] = [

  { id: 1, title: "Criar layout do Kanban", status: "todo" },
  { id: 4, title: "Adicionar drag and drop entre colunas", status: "todo" },
  { id: 5, title: "Criar estado vazio para colunas", status: "todo" },
  { id: 6, title: "Implementar persistência no localStorage", status: "todo" },
  { id: 7, title: "Criar loading e error states", status: "todo" },
  { id: 8, title: "Configurar SEO básico da página", status: "todo" },
  
  { id: 2, title: "Integrar API REST", status: "inProgress" },
  { id: 9, title: "Refatorar componentes para melhor reutilização", status: "inProgress" },
  { id: 10, title: "Melhorar responsividade para mobile e tablet", status: "inProgress" },

  { id: 3, title: "Finalizar acessibilidade", status: "done" },
  { id: 11, title: "Configurar shadcn/ui e TailwindCSS", status: "done" },
  { id: 12, title: "Criar estrutura de pastas profissional", status: "done" },
];
