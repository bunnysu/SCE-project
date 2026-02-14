// Filter buttons component for task filtering

import { FilterType } from '../types/task';
import { FILTER_OPTIONS } from '../utils/constants';

interface FilterButtonsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  taskCounts: {
    all: number;
    pending: number;
    completed: number;
  };
}

export const FilterButtons = ({
  activeFilter,
  onFilterChange,
  taskCounts,
}: FilterButtonsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTER_OPTIONS.map((filter) => {
        const count = taskCounts[filter.value];
        const isActive = activeFilter === filter.value;

        return (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isActive
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {filter.label}
            <span className="ml-2 text-sm opacity-75">({count})</span>
          </button>
        );
      })}
    </div>
  );
};
