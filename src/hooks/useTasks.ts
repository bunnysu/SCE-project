// Custom hook for managing tasks state and operations

import { useState, useEffect, useCallback } from 'react';
import { Task, TaskInput, TaskUpdate } from '../types/task';
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
} from '../services/taskService';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Load all tasks from the database on mount
   */
  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  /**
   * Add a new task
   */
  const addTask = async (taskInput: TaskInput): Promise<void> => {
    try {
      setError(null);
      const newTask = await createTask(taskInput);
      setTasks((prev) => [newTask, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task');
      throw err;
    }
  };

  /**
   * Update an existing task
   */
  const editTask = async (id: string, updates: TaskUpdate): Promise<void> => {
    try {
      setError(null);
      const updatedTask = await updateTask(id, updates);
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
      throw err;
    }
  };

  /**
   * Delete a task
   */
  const removeTask = async (id: string): Promise<void> => {
    try {
      setError(null);
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
      throw err;
    }
  };

  /**
   * Toggle task completion status
   */
  const toggleTask = async (id: string, completed: boolean): Promise<void> => {
    try {
      setError(null);
      const updatedTask = await toggleTaskCompletion(id, completed);
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle task');
      throw err;
    }
  };

  return {
    tasks,
    loading,
    error,
    addTask,
    editTask,
    removeTask,
    toggleTask,
    refreshTasks: loadTasks,
  };
};
