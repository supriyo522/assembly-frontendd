import React, { useState } from 'react';
import axios from 'axios';
import './FormComponent.css'; // Import the CSS file

const questions = [
  'Do you like coding?',
  'Do you use Git?',
  'Do you enjoy React?',
  'Have you used Node.js?',
  'Do you prefer dark mode?'
];

const FormComponent = () => {
  const [formData, setFormData] = useState({
    assemblyPoll: '',
    wordNo: '',
    boothNo: '',
    responses: [null, null, null, null, null],
  });

  const handleResponseChange = (index, value) => {
    const updated = [...formData.responses];
    updated[index] = value === 'yes';
    setFormData({ ...formData, responses: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://assembly-backend-7qs4.onrender.com/api/form/submit', formData);
      alert('Form submitted successfully!');
      setFormData({
        assemblyPoll: '',
        wordNo: '',
        boothNo: '',
        responses: [null, null, null, null, null],
      });
    } catch (error) {
      alert('Error submitting form');
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h2>Survey Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Assembly Name:</label>
        <select
          value={formData.assemblyPoll}
          onChange={(e) => setFormData({ ...formData, assemblyPoll: e.target.value })}
          required
        >
          <option value="">Select Assembly Poll</option>
          <option value="Khardah">Khardah</option>
          <option value="Panihati">Panihati</option>
          <option value="Kamarhati">Kamarhati</option>
          <option value="North Dumdum">North Dumdum</option>
          <option value="Rajarhat Gapalpur">Rajarhat Gapalpur</option>
        </select>

        <label>Word No:</label>
        <input
          type="text"
          value={formData.wordNo}
          onChange={(e) => setFormData({ ...formData, wordNo: e.target.value })}
          required
        />

        <label>Booth No:</label>
        <input
          type="text"
          value={formData.boothNo}
          onChange={(e) => setFormData({ ...formData, boothNo: e.target.value })}
          required
        />

        {questions.map((question, idx) => (
          <div key={idx} className="radio-group">
            <label className="question-label">{question}</label>
            <label>
              <input
                type="radio"
                name={`question-${idx}`}
                value="yes"
                checked={formData.responses[idx] === true}
                onChange={(e) => handleResponseChange(idx, e.target.value)}
                required
              /> Yes
            </label>
            <label>
              <input
                type="radio"
                name={`question-${idx}`}
                value="no"
                checked={formData.responses[idx] === false}
                onChange={(e) => handleResponseChange(idx, e.target.value)}
              /> No
            </label>
          </div>
        ))}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormComponent;
