// Application constants

import { Priority } from '../types/task';

export const PRIORITY_OPTIONS: { value: Priority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: 'text-green-600 dark:text-green-400' },
  { value: 'medium', label: 'Medium', color: 'text-yellow-600 dark:text-yellow-400' },
  { value: 'high', label: 'High', color: 'text-red-600 dark:text-red-400' },
];

export const FILTER_OPTIONS = [
  { value: 'all', label: 'All Tasks' },
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
] as const;
