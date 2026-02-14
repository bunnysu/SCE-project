// Task list component displaying filtered tasks

import { Task } from '../types/task';
import { TaskItem } from './TaskItem';
import { ListTodo } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string, completed: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  loading: boolean;
}

export const TaskList = ({
  tasks,
  onToggle,
  onEdit,
  onDelete,
  loading,
}: TaskListProps) => {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading tasks...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <ListTodo className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600" />
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          No tasks found
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          Create a new task to get started
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
