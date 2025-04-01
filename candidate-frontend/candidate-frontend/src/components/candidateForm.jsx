import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import merge from 'lodash.merge';
import '../styles/main.css';

const initialFormState = {
  personalInfo: {
    name: '',
    dob: new Date(),
    gender: '',
    address: '',
    phone: '',
    email: '',
  },
  academics: {
    masters: {
      institution: '',
      department: '',
      program: '',
      specialization: '',
      semester: '',
      percentage: '',
    },
    underGraduation: {
      institution: '',
      department: '',
      program: '',
      specialization: '',
      semester: '',
      percentage: '',
    },
    puc: {
      institution: '',
      combination: '',
      marks: '',
      percentage: '',
    },
    sslc: {
      institution: '',
      marks: '',
      percentage: '',
    },
  },
  additionalInfo: {
    aadhaar: '',
    pan: '',
    certifications: '',
    projects: '',
    experience: '',
    skills: '',
    languages: '',
    hobbies: '',
  },
};

const CandidateForm = ({ initialData }) => {
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (initialData) {
      const mergedData = merge({}, initialFormState, initialData);
      mergedData.personalInfo.dob = new Date(initialData.personalInfo.dob);
      setFormData(mergedData);
    }
  }, [initialData]);

  const handleChange = useCallback((path, value) => {
    setFormData(prev => {
      const keys = path.split('.');
      const newData = { ...prev };
      let current = newData;

      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          current[key] = value;
        } else {
          current[key] = { ...current[key] };
          current = current[key];
        }
      });

      return newData;
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/candidates', formData);
      if (response.data.message) {
        alert('Profile saved successfully!');
        setFormData(initialFormState);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving profile!');
    }
  };

  const InputField = React.memo(({ label, value, onChange, type = 'text', required = false }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === 'date' ? (
        <DatePicker
          selected={value}
          onChange={onChange}
          className="w-full p-2 border rounded-md"
          dateFormat="dd/MM/yyyy"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-2 border rounded-md"
          required={required}
        />
      )}
    </div>
  ));

  const AcademicSection = React.memo(({ title, path }) => {
    const getValue = useCallback(
      (field) => path.split('.').reduce((obj, key) => obj?.[key], formData)?.[field] || '',
      [formData, path]
    );

    const handleFieldChange = useCallback(
      (field, value) => handleChange(`${path}.${field}`, value),
      [handleChange, path]
    );

    return (
      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Institution"
            value={getValue('institution')}
            onChange={(value) => handleFieldChange('institution', value)}
          />
          {path.includes('puc') && (
            <InputField
              label="Combination"
              value={getValue('combination')}
              onChange={(value) => handleFieldChange('combination', value)}
            />
          )}
          {!path.includes('sslc') && (
            <>
              <InputField
                label="Department"
                value={getValue('department')}
                onChange={(value) => handleFieldChange('department', value)}
              />
              <InputField
                label="Program"
                value={getValue('program')}
                onChange={(value) => handleFieldChange('program', value)}
              />
              <InputField
                label="Semester"
                value={getValue('semester')}
                onChange={(value) => handleFieldChange('semester', value)}
              />
            </>
          )}
          <InputField
            label="Percentage"
            value={getValue('percentage')}
            onChange={(value) => handleFieldChange('percentage', value)}
            type="number"
          />
          {path.includes('sslc') && (
            <InputField
              label="Marks"
              value={getValue('marks')}
              onChange={(value) => handleFieldChange('marks', value)}
              type="number"
            />
          )}
        </div>
      </div>
    );
  });

  const TextareaField = React.memo(({ label, value, onChange }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded-md resize-y"
      />
    </div>
  ));

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Candidate Registration Form</h1>

      <section>
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Full Name"
            value={formData.personalInfo.name}
            onChange={(value) => handleChange('personalInfo.name', value)}
            required
          />
          <InputField
            label="Date of Birth"
            value={formData.personalInfo.dob}
            onChange={(value) => handleChange('personalInfo.dob', value)}
            type="date"
            required
          />
          <InputField
            label="Gender"
            value={formData.personalInfo.gender}
            onChange={(value) => handleChange('personalInfo.gender', value)}
            required
          />
          <InputField
            label="Phone Number"
            value={formData.personalInfo.phone}
            onChange={(value) => handleChange('personalInfo.phone', value)}
            type="tel"
            required
          />
          <InputField
            label="Email Address"
            value={formData.personalInfo.email}
            onChange={(value) => handleChange('personalInfo.email', value)}
            type="email"
            required
          />
          <InputField
            label="Physical Address"
            value={formData.personalInfo.address}
            onChange={(value) => handleChange('personalInfo.address', value)}
            required
          />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Academic Background</h2>
        <AcademicSection title="Post Graduation (Masters)" path="academics.masters" />
        <AcademicSection title="Under Graduation" path="academics.underGraduation" />
        <AcademicSection title="12th Grade (PUC)" path="academics.puc" />
        <AcademicSection title="10th Grade (SSLC)" path="academics.sslc" />
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Aadhaar Number"
            value={formData.additionalInfo.aadhaar}
            onChange={(value) => handleChange('additionalInfo.aadhaar', value)}
          />
          <InputField
            label="PAN Number"
            value={formData.additionalInfo.pan}
            onChange={(value) => handleChange('additionalInfo.pan', value)}
          />
          <InputField
            label="Certifications"
            value={formData.additionalInfo.certifications}
            onChange={(value) => handleChange('additionalInfo.certifications', value)}
          />
          <InputField
            label="Skills"
            value={formData.additionalInfo.skills}
            onChange={(value) => handleChange('additionalInfo.skills', value)}
          />
          <InputField
            label="Languages Known"
            value={formData.additionalInfo.languages}
            onChange={(value) => handleChange('additionalInfo.languages', value)}
          />
          <InputField
            label="Hobbies"
            value={formData.additionalInfo.hobbies}
            onChange={(value) => handleChange('additionalInfo.hobbies', value)}
          />
        </div>
        <div className="mt-4">
          <TextareaField
            label="Describe your major projects"
            value={formData.additionalInfo.projects}
            onChange={(value) => handleChange('additionalInfo.projects', value)}
          />
          <TextareaField
            label="Detail your work experience"
            value={formData.additionalInfo.experience}
            onChange={(value) => handleChange('additionalInfo.experience', value)}
          />
        </div>
      </section>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors mt-8"
      >
        Submit Application
      </button>
    </form>
  );
};

export default CandidateForm;