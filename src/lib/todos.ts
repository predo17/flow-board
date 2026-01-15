import { supabase } from './supabase'
import type { Todo, TodoStatus } from '@/types/todo'

export async function fetchTodos(userId: string): Promise<Todo[]> {
  try {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erro ao buscar tarefas:', error)
      return []
    }

    return (data || []).map((todo: any) => ({
      id: todo.id,
      title: todo.title,
      status: todo.status as TodoStatus,
    }))
  } catch (error) {
    console.error('Erro inesperado ao buscar tarefas:', error)
    return []
  }
}

export async function createTodo(userId: string, title: string, status: TodoStatus = 'todo'): Promise<Todo | null> {
  try {
    const { data, error } = await supabase
      .from('todos')
      .insert([
        {
          user_id: userId,
          title,
          status,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('Erro ao criar tarefa:', error)
      return null
    }

    return {
      id: data.id,
      title: data.title,
      status: data.status as TodoStatus,
    }
  } catch (error) {
    console.error('Erro inesperado ao criar tarefa:', error)
    return null
  }
}

export async function updateTodoStatus(todoId: number, status: TodoStatus): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('todos')
      .update({ status })
      .eq('id', todoId)

    if (error) {
      console.error('Erro ao atualizar tarefa:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Erro inesperado ao atualizar tarefa:', error)
    return false
  }
}

export async function deleteTodo(todoId: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', todoId)

    if (error) {
      console.error('Erro ao deletar tarefa:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Erro inesperado ao deletar tarefa:', error)
    return false
  }
}
