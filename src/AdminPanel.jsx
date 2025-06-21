// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './AdminPanel.css';

// const API_URL = 'https://assembly-backend-7qs4.onrender.com/api/form';

// const AdminPanel = () => {
//   const [data, setData] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [filter, setFilter] = useState({ assemblyPoll: '', wordNo: '' });
//   const [wordNoOptions, setWordNoOptions] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [editForm, setEditForm] = useState({
//     assemblyPoll: '',
//     wordNo: '',
//     boothNo: '',
//     responses: []
//   });

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/all`);
//       setData(res.data);
//       setFiltered(res.data);

//       // Extract unique wordNo values and sort
//       const uniqueWordNos = [...new Set(res.data.map(item => item.wordNo))].filter(Boolean);
//       setWordNoOptions(uniqueWordNos.sort());
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleFilterChange = (e) => {
//     const updated = { ...filter, [e.target.name]: e.target.value };
//     setFilter(updated);

//     const filteredData = data.filter((item) =>
//       (!updated.assemblyPoll || item.assemblyPoll === updated.assemblyPoll) &&
//       (!updated.wordNo || item.wordNo === updated.wordNo)
//     );
//     setFiltered(filteredData);
//   };

//   const handleEditClick = (item) => {
//     setEditingId(item._id);
//     setEditForm({
//       assemblyPoll: item.assemblyPoll,
//       wordNo: item.wordNo,
//       boothNo: item.boothNo || '',
//       responses: item.responses
//     });
//   };

//   const handleEditChange = (e, index = null) => {
//     if (e.target.name === 'responses' && index !== null) {
//       const updatedResponses = [...editForm.responses];
//       updatedResponses[index] = e.target.value === 'true' ? true : e.target.value === 'false' ? false : null;
//       setEditForm({ ...editForm, responses: updatedResponses });
//     } else {
//       setEditForm({ ...editForm, [e.target.name]: e.target.value });
//     }
//   };

//   const handleUpdate = async () => {
//     try {
//       await axios.put(`${API_URL}/update/${editingId}`, editForm);
//       setEditingId(null);
//       fetchData();
//     } catch (err) {
//       console.error('Update failed:', err);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this entry?')) {
//       try {
//         await axios.delete(`${API_URL}/delete/${id}`);
//         fetchData();
//       } catch (err) {
//         console.error('Delete failed:', err);
//       }
//     }
//   };

//   const handleDeleteAll = async () => {
//     if (window.confirm('Are you sure you want to delete ALL entries? This action cannot be undone.')) {
//       try {
//         await axios.delete(`${API_URL}/delete-all`);
//         fetchData();
//       } catch (err) {
//         console.error('Delete All failed:', err);
//       }
//     }
//   };

//   return (
//     <div className="admin-panel">
//       <h2>Admin Panel - Submitted Responses</h2>

//       <div className="filters">
//         <select name="assemblyPoll" value={filter.assemblyPoll} onChange={handleFilterChange}>
//           <option value="">All Assemblies</option>
//           <option value="Khardah">Khardah-109</option>
//           <option value="Panihati">Panihati-111</option>
//           <option value="Kamarhati">Kamarhati-112</option>
//           <option value="Baranagar">Baranagar-113</option>
//           <option value="North Dumdum">North Dumdum-110</option>
//           <option value="Dumdum">Dumdum-114</option>
//           <option value="Rajarhat Gapalpur">Rajarhat Gapalpur-117</option>
//         </select>

//         <select name="wordNo" value={filter.wordNo} onChange={handleFilterChange}>
//           <option value="">All Word Numbers</option>
//           {wordNoOptions.map((word, index) => (
//             <option key={index} value={word}>{word}</option>
//           ))}
//         </select>
//       </div>

//       <button className="delete-all-btn" onClick={handleDeleteAll}>
//         Delete All Entries
//       </button>

//       <table className="admin-table">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Assembly</th>
//             <th>Word No</th>
//             <th>Responses</th>
//             <th>Time</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filtered.map((item, idx) => (
//             <tr key={item._id}>
//               <td>{idx + 1}</td>
//               <td>{item.assemblyPoll}</td>
//               <td>{item.wordNo}</td>
//               <td>
//                 {item.responses.map((r, i) =>
//                   r === true ? `Q${i + 1}: হ্যাঁ | ` :
//                   r === false ? `Q${i + 1}: না | ` :
//                   `Q${i + 1}: জানিনা | `
//                 )}
//               </td>
//               <td>{new Date(item.createdAt).toLocaleString()}</td>
//               <td>
//                 <button onClick={() => handleEditClick(item)}>Edit</button>
//                 <button onClick={() => handleDelete(item._id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {editingId && (
//         <div className="edit-form">
//           <h3>Edit Entry</h3>
//           <input
//             type="text"
//             name="assemblyPoll"
//             value={editForm.assemblyPoll}
//             onChange={handleEditChange}
//             placeholder="Assembly"
//           />
//           <input
//             type="text"
//             name="wordNo"
//             value={editForm.wordNo}
//             onChange={handleEditChange}
//             placeholder="Word No"
//           />
//           <input
//             type="text"
//             name="boothNo"
//             value={editForm.boothNo}
//             onChange={handleEditChange}
//             placeholder="Booth No"
//           />
//           <div>
//             {editForm.responses.map((resp, i) => (
//               <div key={i}>
//                 <label>Q{i + 1}:</label>
//                 <select
//                   name="responses"
//                   value={resp === true ? 'true' : resp === false ? 'false' : 'null'}
//                   onChange={(e) => handleEditChange(e, i)}
//                 >
//                   <option value="true">হ্যাঁ</option>
//                   <option value="false">না</option>
//                   <option value="null">জানিনা</option>
//                 </select>
//               </div>
//             ))}
//           </div>
//           <button onClick={handleUpdate}>Update</button>
//           <button onClick={() => setEditingId(null)}>Cancel</button>
//         </div>
//       )}

//       {filter.assemblyPoll && (
//         <div className="summary-table-container">
//           <h3>Response Summary for: {filter.assemblyPoll}</h3>
//           <table className="admin-table">
//             <thead>
//               <tr>
//                 <th>Question</th>
//                 <th>হ্যাঁ %</th>
//                 <th>না %</th>
//                 <th>জানিনা %</th>
//               </tr>
//             </thead>
//             <tbody>
//               {[0, 1, 2, 3].map((qIndex) => {
//                 const total = filtered.length;
//                 let yes = 0, no = 0, dontKnow = 0;

//                 filtered.forEach((entry) => {
//                   const val = entry.responses[qIndex];
//                   if (val === true) yes++;
//                   else if (val === false) no++;
//                   else dontKnow++;
//                 });

//                 const yesPercent = total ? ((yes / total) * 100).toFixed(1) : 0;
//                 const noPercent = total ? ((no / total) * 100).toFixed(1) : 0;
//                 const dontKnowPercent = total ? ((dontKnow / total) * 100).toFixed(1) : 0;

//                 return (
//                   <tr key={qIndex}>
//                     <td>Q{qIndex + 1}</td>
//                     <td>{yesPercent}%</td>
//                     <td>{noPercent}%</td>
//                     <td>{dontKnowPercent}%</td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPanel.css';

const API_URL = 'http://localhost:5000/api/form';

const AdminPanel = () => {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState({ assemblyPoll: '', wordNo: '', boothNo: '' });
  const [wordNoOptions, setWordNoOptions] = useState([]);
  const [boothNoOptions, setBoothNoOptions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    assemblyPoll: '',
    wordNo: '',
    boothNo: '',
    phoneNumber: '',
    responses: []
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_URL}/all`);
      setData(res.data);
      setFiltered(res.data);

      const uniqueWordNos = [...new Set(res.data.map(item => item.wordNo))].filter(Boolean);
      setWordNoOptions(uniqueWordNos.sort());

      const uniqueBoothNos = [...new Set(res.data.map(item => item.boothNo))].filter(Boolean);
      setBoothNoOptions(uniqueBoothNos.sort());
    } catch (err) {
      console.error(err);
    }
  };

  const handleFilterChange = (e) => {
    const updated = { ...filter, [e.target.name]: e.target.value };
    setFilter(updated);

    const filteredData = data.filter((item) =>
      (!updated.assemblyPoll || item.assemblyPoll === updated.assemblyPoll) &&
      (!updated.wordNo || item.wordNo === updated.wordNo) &&
      (!updated.boothNo || item.boothNo === updated.boothNo)
    );
    setFiltered(filteredData);
  };

  const handleEditClick = (item) => {
    setEditingId(item._id);
    setEditForm({
      assemblyPoll: item.assemblyPoll,
      wordNo: item.wordNo,
      boothNo: item.boothNo || '',
      phoneNumber:item.phoneNumber || '',
      responses: item.responses
    });
  };

  const handleEditChange = (e, index = null) => {
    if (e.target.name === 'responses' && index !== null) {
      const updatedResponses = [...editForm.responses];
      updatedResponses[index] = e.target.value === 'true' ? true : e.target.value === 'false' ? false : null;
      setEditForm({ ...editForm, responses: updatedResponses });
    } else {
      setEditForm({ ...editForm, [e.target.name]: e.target.value });
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}/update/${editingId}`, editForm);
      setEditingId(null);
      fetchData();
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await axios.delete(`${API_URL}/delete/${id}`);
        fetchData();
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
  };

  const handleDeleteAll = async () => {
    if (window.confirm('Are you sure you want to delete ALL entries? This action cannot be undone.')) {
      try {
        await axios.delete(`${API_URL}/delete-all`);
        fetchData();
      } catch (err) {
        console.error('Delete All failed:', err);
      }
    }
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel - Submitted Responses</h2>

      <div className="filters">
        <select name="assemblyPoll" value={filter.assemblyPoll} onChange={handleFilterChange}>
          <option value="">All Assemblies</option>
          <option value="Khardah">Khardah-109</option>
          <option value="Panihati">Panihati-111</option>
          <option value="Kamarhati">Kamarhati-112</option>
          <option value="Baranagar">Baranagar-113</option>
          <option value="North Dumdum">North Dumdum-110</option>
          <option value="Dumdum">Dumdum-114</option>
          <option value="Rajarhat Gapalpur">Rajarhat Gapalpur-117</option>
        </select>

        <select name="wordNo" value={filter.wordNo} onChange={handleFilterChange}>
          <option value="">All Word Numbers</option>
          {wordNoOptions.map((word, index) => (
            <option key={index} value={word}>{word}</option>
          ))}
        </select>

        <select name="boothNo" value={filter.boothNo} onChange={handleFilterChange}>
          <option value="">All Booth Numbers</option>
          {boothNoOptions.map((booth, index) => (
            <option key={index} value={booth}>{booth}</option>
          ))}
        </select>
      </div>

      <button className="delete-all-btn" onClick={handleDeleteAll}>
        Delete All Entries
      </button>

      <table className="admin-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Assembly</th>
            <th>Word No</th>
            <th>Booth No</th>
            <th>Responses</th>
            <th>Time</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((item, idx) => (
            <tr key={item._id}>
              <td>{idx + 1}</td>
              <td>{item.assemblyPoll}</td>
              <td>{item.wordNo}</td>
              <td>{item.boothNo}</td>
              <td>
                {item.responses.map((r, i) =>
                  r === true ? `Q${i + 1}: হ্যাঁ | ` :
                  r === false ? `Q${i + 1}: না | ` :
                  `Q${i + 1}: জানিনা | `
                )}
              </td>
              <td>{new Date(item.createdAt).toLocaleString()}</td>
              <td>{item.phoneNumber || '-'}</td> {/* ✅ New column */}
              <td>
                <button onClick={() => handleEditClick(item)}>Edit</button>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingId && (
        <div className="edit-form">
          <h3>Edit Entry</h3>
          <input
            type="text"
            name="assemblyPoll"
            value={editForm.assemblyPoll}
            onChange={handleEditChange}
            placeholder="Assembly"
          />
          <input
            type="text"
            name="wordNo"
            value={editForm.wordNo}
            onChange={handleEditChange}
            placeholder="Word No"
          />
          <input
            type="text"
            name="boothNo"
            value={editForm.boothNo}
            onChange={handleEditChange}
            placeholder="Booth No"
          />
          <div>
            {editForm.responses.map((resp, i) => (
              <div key={i}>
                <label>Q{i + 1}:</label>
                <select
                  name="responses"
                  value={resp === true ? 'true' : resp === false ? 'false' : 'null'}
                  onChange={(e) => handleEditChange(e, i)}
                >
                  <option value="true">হ্যাঁ</option>
                  <option value="false">না</option>
                  <option value="null">জানিনা</option>
                </select>
              </div>
            ))}
          </div>
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setEditingId(null)}>Cancel</button>
        </div>
      )}

      {filter.assemblyPoll && (
        <div className="summary-table-container">
          <h3>Response Summary for: {filter.assemblyPoll}</h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Question</th>
                <th>হ্যাঁ %</th>
                <th>না %</th>
                <th>জানিনা %</th>
              </tr>
            </thead>
            <tbody>
              {[0, 1, 2, 3].map((qIndex) => {
                const total = filtered.length;
                let yes = 0, no = 0, dontKnow = 0;

                filtered.forEach((entry) => {
                  const val = entry.responses[qIndex];
                  if (val === true) yes++;
                  else if (val === false) no++;
                  else dontKnow++;
                });

                const yesPercent = total ? ((yes / total) * 100).toFixed(1) : 0;
                const noPercent = total ? ((no / total) * 100).toFixed(1) : 0;
                const dontKnowPercent = total ? ((dontKnow / total) * 100).toFixed(1) : 0;

                return (
                  <tr key={qIndex}>
                    <td>Q{qIndex + 1}</td>
                    <td>{yesPercent}%</td>
                    <td>{noPercent}%</td>
                    <td>{dontKnowPercent}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;


// export default AdminPanel;
