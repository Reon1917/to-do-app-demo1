'use client';

import { useState } from 'react';

interface CreateTodoFormProps {
  onSubmit: (task: string) => Promise<void>;
}

export default function CreateTodoForm({ onSubmit }: CreateTodoFormProps) {
  const [task, setTask] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.trim() || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await onSubmit(task);
      setTask('');
    } catch (error) {
      console.error('Error creating todo:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="task" className="block text-sm font-medium text-gray-700">
          New Todo
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="text"
            name="task"
            id="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="What needs to be done?"
          />
          <button
            type="submit"
            disabled={isSubmitting || !task.trim()}
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Adding...' : 'Add Todo'}
          </button>
        </div>
      </div>
    </form>
  );
} 