export interface Todo {
  id: string;
  user_id: string;
  task: string;
  is_complete: boolean;
  created_at: string;
}

export interface CreateTodoInput {
  task: string;
}

export interface UpdateTodoInput {
  task?: string;
  is_complete?: boolean;
} 