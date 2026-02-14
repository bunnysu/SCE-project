// Type definitions for Task entities

export type Priority = 'low' | 'medium' | 'high';

export type FilterType = 'all' | 'completed' | 'pending';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: Priority;
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface TaskInput {
  title: string;
  description?: string;
  priority?: Priority;
  due_date?: string | null;
}

export interface TaskUpdate extends Partial<TaskInput> {
  completed?: boolean;
}
