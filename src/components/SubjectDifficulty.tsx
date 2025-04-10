import React from 'react';
import { BookOpen } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-2xl font-bold text-gray-800">StudyWise</span>
          </div>
          <div className="flex space-x-4">
            <button className="text-gray-600 hover:text-indigo-600">Dashboard</button>
            <button className="text-gray-600 hover:text-indigo-600">Study Plans</button>
            <button className="text-gray-600 hover:text-indigo-600">Resources</button>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar