import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import SubjectDifficultyPage from './pages/SubjectDifficultyPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/subject-difficulty" element={<SubjectDifficultyPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;