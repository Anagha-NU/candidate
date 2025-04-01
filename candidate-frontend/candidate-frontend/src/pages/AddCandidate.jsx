import { useNavigate } from 'react-router-dom';
import CandidateForm from '../components/candidateForm';
import api from '../services/api';

const AddCandidate = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await api.create(formData);
      navigate('/');
    } catch (error) {
      console.error('Error adding candidate:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Add Candidate</h1>
      <CandidateForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddCandidate;
