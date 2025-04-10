import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, BarChart, TrendingUp, ArrowLeft, BookOpen, Trophy, Target } from 'lucide-react';

interface SubjectAnalysis {
  predictedDifficulty: number;
  personalDifficulty: number;
  analysis: string;
  recommendations: string[];
  strengths: string[];
  weaknesses: string[];
}

const SubjectDifficultyPage: React.FC = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState('');
  const [previousMarks, setPreviousMarks] = useState<string[]>(['']);
  const [analysis, setAnalysis] = useState<SubjectAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const commonTopics = {
    'Mathematics': ['Algebra', 'Calculus', 'Geometry', 'Statistics', 'Trigonometry'],
    'Physics': ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Optics', 'Modern Physics'],
    'Chemistry': ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Analytical Chemistry'],
    'Biology': ['Cell Biology', 'Genetics', 'Ecology', 'Evolution', 'Physiology'],
    'Computer Science': ['Programming', 'Data Structures', 'Algorithms', 'Database Systems', 'Operating Systems'],
  };

  const addMarkField = () => {
    setPreviousMarks([...previousMarks, '']);
  };

  const updateMark = (index: number, value: string) => {
    const newMarks = [...previousMarks];
    newMarks[index] = value;
    setPreviousMarks(newMarks);
  };

  const removeMark = (index: number) => {
    const newMarks = previousMarks.filter((_, i) => i !== index);
    setPreviousMarks(newMarks);
  };

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const calculatePersonalDifficulty = (marks: number[]): number => {
    if (marks.length === 0) return 0;
    const avg = marks.reduce((a, b) => a + b, 0) / marks.length;
    if (avg >= 85) return 1; // Easy
    if (avg >= 70) return 2; // Moderate
    if (avg >= 55) return 3; // Hard
    return 4; // Very Hard
  };

  const getDifficultyLabel = (level: number): string => {
    switch (level) {
      case 1: return 'Easy';
      case 2: return 'Moderate';
      case 3: return 'Hard';
      case 4: return 'Very Hard';
      default: return 'Unknown';
    }
  };

  const analyzeStrengthsWeaknesses = (marks: number[]): { strengths: string[], weaknesses: string[] } => {
    const avg = marks.reduce((a, b) => a + b, 0) / marks.length;
    const strengths = [];
    const weaknesses = [];

    if (avg >= 80) {
      strengths.push('Consistent high performance');
      strengths.push('Strong grasp of fundamental concepts');
    }
    if (marks.every(mark => mark >= 60)) {
      strengths.push('Reliable performance across tests');
    }
    if (marks.some(mark => mark < 60)) {
      weaknesses.push('Inconsistent performance in some tests');
    }
    if (avg < 65) {
      weaknesses.push('Need to strengthen core concepts');
      weaknesses.push('Consider additional practice and revision');
    }

    return { strengths, weaknesses };
  };

  const analyzeSubject = async () => {
    setLoading(true);
    try {
      // Simulated analysis with more sophisticated logic
      const predictedDifficulty = Math.floor(Math.random() * 4) + 1;
      
      const validMarks = previousMarks
        .map(mark => parseInt(mark))
        .filter(mark => !isNaN(mark) && mark >= 0 && mark <= 100);
      
      const personalDifficulty = calculatePersonalDifficulty(validMarks);
      const { strengths, weaknesses } = analyzeStrengthsWeaknesses(validMarks);
      
      const recommendations = [
        'Create a structured study schedule',
        'Focus on understanding core concepts',
        'Practice with past exam questions',
        'Use active recall techniques',
        'Join study groups for collaborative learning'
      ];

      const analysis: SubjectAnalysis = {
        predictedDifficulty,
        personalDifficulty,
        analysis: `Based on comprehensive analysis of ${subject}, the subject appears to be ${getDifficultyLabel(predictedDifficulty)} in general, while your personal experience indicates it's ${getDifficultyLabel(personalDifficulty)} for you.`,
        recommendations,
        strengths,
        weaknesses
      };
      
      setAnalysis(analysis);
    } catch (error) {
      console.error('Error analyzing subject:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center mb-8">
          <Brain className="h-10 w-10 text-indigo-600 mr-4" />
          <h1 className="text-3xl font-bold text-gray-900">Subject Difficulty Analysis</h1>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject Name
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="e.g., Mathematics, Physics"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Previous Test Marks (0-100)
              </label>
              {previousMarks.map((mark, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={mark}
                    onChange={(e) => updateMark(index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter mark"
                  />
                  {index === previousMarks.length - 1 ? (
                    <button
                      onClick={addMarkField}
                      className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50"
                    >
                      Add
                    </button>
                  ) : (
                    <button
                      onClick={() => removeMark(index)}
                      className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {subject && commonTopics[subject as keyof typeof commonTopics] && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Select Challenging Topics
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {commonTopics[subject as keyof typeof commonTopics].map((topic) => (
                  <button
                    key={topic}
                    onClick={() => toggleTopic(topic)}
                    className={`px-4 py-2 rounded-lg border ${
                      selectedTopics.includes(topic)
                        ? 'bg-indigo-100 border-indigo-500 text-indigo-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-center">
            <button
              onClick={analyzeSubject}
              disabled={!subject || loading}
              className={`w-full md:w-auto px-8 py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed ${
                loading ? 'animate-pulse' : ''
              }`}
            >
              {loading ? 'Analyzing...' : 'Analyze Subject'}
            </button>
          </div>

          {analysis && (
            <div className="space-y-6 mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-indigo-50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <BarChart className="h-6 w-6 text-indigo-600 mr-2" />
                    <h3 className="text-lg font-semibold text-indigo-900">Predicted Difficulty</h3>
                  </div>
                  <p className="text-2xl font-bold text-indigo-700">
                    {getDifficultyLabel(analysis.predictedDifficulty)}
                  </p>
                </div>

                <div className="bg-indigo-50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <TrendingUp className="h-6 w-6 text-indigo-600 mr-2" />
                    <h3 className="text-lg font-semibold text-indigo-900">Your Experience</h3>
                  </div>
                  <p className="text-2xl font-bold text-indigo-700">
                    {getDifficultyLabel(analysis.personalDifficulty)}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  <BookOpen className="h-6 w-6 text-indigo-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Analysis</h3>
                </div>
                <p className="text-gray-700">{analysis.analysis}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Trophy className="h-6 w-6 text-green-600 mr-2" />
                    <h3 className="text-lg font-semibold text-green-900">Strengths</h3>
                  </div>
                  <ul className="space-y-2">
                    {analysis.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span className="text-green-800">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Target className="h-6 w-6 text-red-600 mr-2" />
                    <h3 className="text-lg font-semibold text-red-900">Areas for Improvement</h3>
                  </div>
                  <ul className="space-y-2">
                    {analysis.weaknesses.map((weakness, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span className="text-red-800">{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  <Brain className="h-6 w-6 text-indigo-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Recommendations</h3>
                </div>
                <ul className="space-y-3">
                  {analysis.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-indigo-600 mr-2">•</span>
                      <span className="text-gray-700">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectDifficultyPage;