import React, { useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import type { Exam } from '../types';

interface ExamFormProps {
  onSubmit: (exam: Omit<Exam, 'id'>) => void;
  onCancel: () => void;
}

const ExamForm: React.FC<ExamFormProps> = ({ onSubmit, onCancel }) => {
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState('');
  const [difficulty, setDifficulty] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      subject,
      date,
      difficulty
    });
  };

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
          Subject Name
        </label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
          Exam Date
        </label>
        <div className="relative">
          <input
            type="date"
            id="date"
            value={date}
            min={minDate}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <CalendarIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div>
        <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
          Expected Difficulty Level
        </label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value={1}>Easy</option>
          <option value={2}>Moderate</option>
          <option value={3}>Hard</option>
          <option value={4}>Very Hard</option>
        </select>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Add Exam
        </button>
      </div>
    </form>
  );
};

export default ExamForm;