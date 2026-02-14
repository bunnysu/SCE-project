/*
  # Create Tasks Table

  1. New Tables
    - `tasks`
      - `id` (uuid, primary key) - Unique identifier for each task
      - `title` (text, required) - Task title
      - `description` (text, optional) - Task description
      - `completed` (boolean, default false) - Task completion status
      - `priority` (text, default 'medium') - Task priority (low, medium, high)
      - `due_date` (date, optional) - Task due date
      - `created_at` (timestamptz) - Timestamp when task was created
      - `updated_at` (timestamptz) - Timestamp when task was last updated
  
  2. Security
    - Enable RLS on `tasks` table
    - Add policy for anyone to read all tasks (public app)
    - Add policy for anyone to insert tasks
    - Add policy for anyone to update tasks
    - Add policy for anyone to delete tasks
  
  Note: This is a demo app without authentication, so policies allow public access.
  For production with auth, policies should be restricted to authenticated users.
*/

CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  completed boolean DEFAULT false,
  priority text DEFAULT 'medium',
  due_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Policies for public access (demo app)
CREATE POLICY "Anyone can view tasks"
  ON tasks FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert tasks"
  ON tasks FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update tasks"
  ON tasks FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete tasks"
  ON tasks FOR DELETE
  USING (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS tasks_created_at_idx ON tasks(created_at DESC);
CREATE INDEX IF NOT EXISTS tasks_completed_idx ON tasks(completed);