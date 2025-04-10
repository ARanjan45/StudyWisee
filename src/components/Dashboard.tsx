import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, FileText, Upload, BarChart, BookOpen } from 'lucide-react';
import type { Exam } from '../types';
import ExamForm from './ExamForm';
import ExamCountdown from './ExamCountdown';

const Dashboard = () => {
  const [showExamForm, setShowExamForm] = useState(false);
  const [exams, setExams] = useState<Exam[]>([]);
  const navigate = useNavigate();

  const handleAddExam = (examData: Omit<Exam, 'id'>) => {
    const newExam: Exam = {
      ...examData,
      id: crypto.randomUUID()
    };
    setExams([...exams, newExam]);
    setShowExamForm(false);
  };

  const sortedExams = [...exams].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const features = [
    {
      icon: Calendar,
      title: 'Exam Tracking',
      description: 'Stay on top of your upcoming exams with smart reminders',
      onClick: () => setShowExamForm(true),
    },
    {
      icon: BarChart,
      title: 'Subject Difficulty',
      description: 'Track your performance and identify areas for improvement',
      onClick: () => navigate('/subject-difficulty'),
    },
    {
      icon: Clock,
      title: 'Study Plans',
      description: 'Get personalized study schedules based on your availability',
      onClick: () => {},
    },
    {
      icon: BookOpen,
      title: 'Learning Resources',
      description: 'Access curated study materials and video tutorials',
      onClick: () => {},
    },
    {
      icon: FileText,
      title: 'Practice Papers',
      description: 'Solve past year papers with integrated timer',
      onClick: () => {},
    },
    {
      icon: Upload,
      title: 'Share Notes',
      description: 'Upload and share study materials with peers',
      onClick: () => {},
    },
  ];

  return (
    <div className="space-y-8">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to StudyWise
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your personal study companion that helps you stay organized, focused, and prepared for your exams.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div
            key={feature.title}
            onClick={feature.onClick}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <feature.icon className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </section>

      {showExamForm && (
        <section className="bg-white rounded-lg shadow-md p-6 mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Schedule New Exam</h2>
            <button
              onClick={() => setShowExamForm(false)}
              className="text-gray-600 hover:text-gray-800"
            >
              Close
            </button>
          </div>
          <ExamForm
            onSubmit={handleAddExam}
            onCancel={() => setShowExamForm(false)}
          />
        </section>
      )}

      <section className="bg-white rounded-lg shadow-md p-6 mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Upcoming Exams</h2>
          {!showExamForm && (
            <button
              onClick={() => setShowExamForm(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Add Exam
            </button>
          )}
        </div>

        {exams.length === 0 ? (
          <div className="text-gray-600">
            No exams scheduled. Click "Add Exam" to get started.
          </div>
        ) : (
          <div className="space-y-4">
            {sortedExams.map((exam) => (
              <ExamCountdown
                key={exam.id}
                date={exam.date}
                subject={exam.subject}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;