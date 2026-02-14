import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { FilterButtons } from './components/FilterButtons';
import { useTasks } from './hooks/useTasks';
import { useDarkMode } from './hooks/useDarkMode';
import { FilterType, Task } from './types/task';

function App() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { tasks, loading, error, addTask, editTask, removeTask, toggleTask } =
    useTasks();

  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  /**
   * Filter tasks based on active filter
   */
  const filteredTasks = useMemo(() => {
    switch (activeFilter) {
      case 'completed':
        return tasks.filter((task) => task.completed);
      case 'pending':
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  }, [tasks, activeFilter]);

  /**
   * Calculate task counts for filter buttons
   */
  const taskCounts = useMemo(
    () => ({
      all: tasks.length,
      pending: tasks.filter((task) => !task.completed).length,
      completed: tasks.filter((task) => task.completed).length,
    }),
    [tasks]
  );

  /**
   * Handle task form submission (add or edit)
   */
  const handleTaskSubmit = async (taskData: {
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    due_date: string | null;
  }) => {
    if (editingTask) {
      await editTask(editingTask.id, taskData);
      setEditingTask(null);
    } else {
      await addTask(taskData);
    }
  };

  /**
   * Handle edit button click
   */
  const handleEdit = (task: Task) => {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Cancel editing mode
   */
  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <TaskForm
          onSubmit={handleTaskSubmit}
          editingTask={editingTask}
          onCancel={handleCancelEdit}
        />

        {error && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg">
            <p className="font-medium">Error:</p>
            <p>{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <FilterButtons
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            taskCounts={taskCounts}
          />

          <TaskList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onEdit={handleEdit}
            onDelete={removeTask}
            loading={loading}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
