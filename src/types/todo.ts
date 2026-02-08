export type TodoStatus = 'todo' | 'in-progress' | 'done';

export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface EnrichedTodo extends Todo {
  status: TodoStatus;
}

export interface TodosResponse {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}

export interface CreateTodoPayload {
  todo: string;
  completed: boolean;
  userId: number;
}

export interface UpdateTodoPayload {
  todo?: string;
  completed?: boolean;
}
