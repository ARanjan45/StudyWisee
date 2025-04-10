import React from 'react';
import { Clock } from 'lucide-react';

interface ExamCountdownProps {
  date: string;
  subject: string;
}

const ExamCountdown: React.FC<ExamCountdownProps> = ({ date, subject }) => {
  const calculateDaysLeft = (examDate: string) => {
    const today = new Date();
    const exam = new Date(examDate);
    const diffTime = exam.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = calculateDaysLeft(date);
  const examDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="flex items-center justify-between bg-white rounded-lg shadow-sm p-4 border-l-4 border-indigo-500">
      <div>
        <h3 className="font-semibold text-lg text-gray-900">{subject}</h3>
        <p className="text-sm text-gray-600">{examDate}</p>
      </div>
      <div className="flex items-center space-x-2 bg-indigo-50 px-4 py-2 rounded-full">
        <Clock className="h-5 w-5 text-indigo-600" />
        <span className="font-medium text-indigo-600">
          {daysLeft} {daysLeft === 1 ? 'day' : 'days'} left
        </span>
      </div>
    </div>
  );
};

export default ExamCountdown;