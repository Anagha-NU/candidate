import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const ViewCandidate = () => {
  const { id } = useParams();
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

  if (!candidate) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6 max-w-4xl bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">{candidate.personalInfo.name}</h1>
      <p><strong>Email:</strong> {candidate.personalInfo.email}</p>
      <p><strong>DOB:</strong> {candidate.personalInfo.dob}</p>
    </div>
  );
};

export default ViewCandidate;
