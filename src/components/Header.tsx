// Application header component

import { CheckSquare } from 'lucide-react';
import { DarkModeToggle } from './DarkModeToggle';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header = ({ darkMode, onToggleDarkMode }: HeaderProps) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CheckSquare className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Task Manager
          </h1>
        </div>
        <DarkModeToggle darkMode={darkMode} onToggle={onToggleDarkMode} />
      </div>
    </header>
  );
};
