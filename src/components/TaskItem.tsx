// Individual task item component

import { useState } from 'react';
import { Calendar, Edit2, Trash2, Flag } from 'lucide-react';
import { Task } from '../types/task';
import { PRIORITY_OPTIONS } from '../utils/constants';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string, completed: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskItem = ({ task, onToggle, onEdit, onDelete }: TaskItemProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  /**
   * Handle task deletion with confirmation
   */
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setIsDeleting(true);
      try {
        await onDelete(task.id);
      } catch (error) {
        console.error('Failed to delete task:', error);
        setIsDeleting(false);
      }
    }
  };

  /**
   * Format date for display
   */
  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  /**
   * Check if task is overdue
   */
  const isOverdue = () => {
    if (!task.due_date || task.completed) return false;
    return new Date(task.due_date) < new Date();
  };

  const priorityInfo = PRIORITY_OPTIONS.find((p) => p.value === task.priority);
  const overdue = isOverdue();

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-all hover:shadow-lg ${
        isDeleting ? 'opacity-50' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={(e) => onToggle(task.id, e.target.checked)}
          className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={`text-lg font-semibold ${
                task.completed
                  ? 'line-through text-gray-500 dark:text-gray-500'
                  : 'text-gray-900 dark:text-white'
              }`}
            >
              {task.title}
            </h3>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => onEdit(task)}
                className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                aria-label="Edit task"
              >
                <Edit2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                aria-label="Delete task"
              >
                <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
              </button>
            </div>
          </div>

          {task.description && (
            <p
              className={`mt-1 text-sm ${
                task.completed
                  ? 'text-gray-400 dark:text-gray-500'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {task.description}
            </p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
            <div className={`flex items-center gap-1 ${priorityInfo?.color}`}>
              <Flag className="w-4 h-4" />
              <span className="font-medium">{priorityInfo?.label}</span>
            </div>

            {task.due_date && (
              <div
                className={`flex items-center gap-1 ${
                  overdue
                    ? 'text-red-600 dark:text-red-400 font-semibold'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>
                  {formatDate(task.due_date)}
                  {overdue && ' (Overdue)'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
