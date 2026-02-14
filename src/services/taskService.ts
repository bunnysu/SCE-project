// Service layer for task CRUD operations

import { supabase } from './supabase';
import { Task, TaskInput, TaskUpdate } from '../types/task';

/**
 * Fetch all tasks from the database, ordered by creation date (newest first)
 */
export const fetchTasks = async (): Promise<Task[]> => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch tasks: ${error.message}`);
  }

  return data || [];
};

/**
 * Create a new task in the database
 */
export const createTask = async (taskInput: TaskInput): Promise<Task> => {
  const { data, error } = await supabase
    .from('tasks')
    .insert([
      {
        title: taskInput.title,
        description: taskInput.description || '',
        priority: taskInput.priority || 'medium',
        due_date: taskInput.due_date || null,
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create task: ${error.message}`);
  }

  return data;
};

/**
 * Update an existing task
 */
export const updateTask = async (
  id: string,
  updates: TaskUpdate
): Promise<Task> => {
  const { data, error } = await supabase
    .from('tasks')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update task: ${error.message}`);
  }

  return data;
};

/**
 * Delete a task from the database
 */
export const deleteTask = async (id: string): Promise<void> => {
  const { error } = await supabase.from('tasks').delete().eq('id', id);

  if (error) {
    throw new Error(`Failed to delete task: ${error.message}`);
  }
};

/**
 * Toggle task completion status
 */
export const toggleTaskCompletion = async (
  id: string,
  completed: boolean
): Promise<Task> => {
  return updateTask(id, { completed });
};
