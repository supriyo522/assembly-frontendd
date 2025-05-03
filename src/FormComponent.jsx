import React, { useState } from 'react';
import axios from 'axios';
import './FormComponent.css'; // Import the CSS file


const questions = [
'পশ্চিমবঙ্গে শিক্ষা, স্বাস্থ্য, খাদ্য ব্যবস্থা ভেঙে পড়েছে',
  'আর জি কর কাণ্ডে পশ্চিমবঙ্গ সরকার তথ্য প্রমাণ লোপাট করেছে',
  'তৃণমূল কংগ্রেস একটি দূর্নীতিগ্রস্ত রাজনৈতিক দল',
  'আসন্ন ২০২৬ এ পশ্চিমবঙ্গ বিধানসভা নির্বাচনে বিজেপিকে একটা সুযোগ দেওয়া উচিত'
];

const FormComponent = () => {
  const [formData, setFormData] = useState({
    assemblyPoll: '',
    wordNo: '',
    boothNo: '',
    responses: [null, null, null, null],
  });


  const [loading, setLoading] = useState(false);

  const handleResponseChange = (index, value) => {
    const updated = [...formData.responses];
    if (value === 'yes') {
      updated[index] = true;
    } else if (value === 'no') {
      updated[index] = false;
    } else {
      updated[index] = null; // "I don't know"
    }
    setFormData({ ...formData, responses: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('https://assembly-backend-7qs4.onrender.com/api/form/submit', formData);
      alert('Form submitted successfully!');
      setFormData({
        assemblyPoll: '',
        wordNo: '',
        responses: [null, null, null, null],
      });
    } catch (error) {
      alert('Error submitting form');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>
      রাজনৈতিক সমীক্ষা</h2>
      <form onSubmit={handleSubmit}>
        <label>Assembly Name:</label>
        <select
          value={formData.assemblyPoll}
          onChange={(e) => setFormData({ ...formData, assemblyPoll: e.target.value })}
          required
        >
          <option value="">Select Assembly Poll</option>
          <option value="Khardah">Khardah-109</option>
          <option value="Panihati">Panihati-111</option>
          <option value="Kamarhati">Kamarhati-112</option>
          <option value="Baranagar">Baranagar-113</option>
          <option value="North Dumdum">North Dumdum-110</option>
          <option value="Dumdum">Dumdum-114</option>
          <option value="Rajarhat Gapalpur">Rajarhat Gapalpur-117</option>
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
                onChange={() => handleResponseChange(idx, 'yes')}
                required
              /> হ্যাঁ
            </label>
            <label>
              <input
                type="radio"
                name={`question-${idx}`}
                value="no"
                checked={formData.responses[idx] === false}
                onChange={() => handleResponseChange(idx, 'no')}
              /> না
            </label>
            <label>
              <input
                type="radio"
                name={`question-${idx}`}
                value="dontknow"
                checked={formData.responses[idx] === null}
                onChange={() => handleResponseChange(idx, 'dontknow')}
              /> জানিনা
            </label>
          </div>
        ))}

        <button type="submit" disabled={loading}>
  {loading ? 'Submitting...' : 'Submit'}
</button>

      </form>
      <div className="signature">শেখর সেনগুপ্ত</div>
    </div>
  );
};

export default FormComponent;
