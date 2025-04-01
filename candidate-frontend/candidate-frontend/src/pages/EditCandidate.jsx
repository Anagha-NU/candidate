import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CandidateForm from '../components/candidateForm';
import api from '../services/api';

const EditCandidate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const response = await api.getById(id);
        setCandidate(response.data);
      } catch (error) {
        console.error('Error fetching candidate:', error);
      }
    };
    fetchCandidate();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      await api.update(id, formData);
      navigate('/');
    } catch (error) {
      console.error('Error updating candidate:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Edit Candidate</h1>
      {candidate ? <CandidateForm initialData={candidate} onSubmit={handleSubmit} /> : <p>Loading...</p>}
    </div>
  );
};

export default EditCandidate;
