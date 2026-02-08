import { Todo, TodosResponse, CreateTodoPayload, UpdateTodoPayload } from '@/types/todo';

const BASE_URL = 'https://dummyjson.com/todos';

export async function fetchTodos(): Promise<TodosResponse> {
  const res = await fetch(`${BASE_URL}?limit=30`);
  if (!res.ok) throw new Error('Failed to fetch todos');
  return res.json();
}

export async function fetchTodoById(id: number): Promise<Todo> {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch todo');
  return res.json();
}

export async function createTodo(payload: CreateTodoPayload): Promise<Todo> {
  const res = await fetch(`${BASE_URL}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create todo');
  return res.json();
}

export async function updateTodo(id: number, payload: UpdateTodoPayload): Promise<Todo> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to update todo');
  return res.json();
}

export async function deleteTodo(id: number): Promise<Todo & { isDeleted: boolean }> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete todo');
  return res.json();
}
