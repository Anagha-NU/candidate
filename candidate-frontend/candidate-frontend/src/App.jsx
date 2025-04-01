import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from './services/api';
import CandidateList from './components/candidateForm';
import AddCandidate from './pages/AddCandidate';
import ViewCandidate from './pages/ViewCandidate';
import EditCandidate from './pages/EditCandidate';

function App() {
  const [candidates, setCandidates] = useState([]);

  const refreshCandidates = async () => {
    try {
      const response = await api.getAll();
      setCandidates(response.data);
    } catch (error) {
      console.error('Error loading candidates:', error);
    }
  };

  useEffect(() => {
    refreshCandidates();
  }, []);

  return (
    
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold">Candidate profile</h1>
              <div className="space-x-4">
                <a href="/" className="text-blue-600 hover:text-blue-800">Home</a>
                <a href="/add" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Add profile
                </a>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<CandidateList candidates={candidates} />} />
            <Route path="/add" element={<AddCandidate refresh={refreshCandidates} />} />
            <Route path="/view/:id" element={<ViewCandidate />} />
            <Route path="/edit/:id" element={<EditCandidate refresh={refreshCandidates} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;