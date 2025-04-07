import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPanel.css'; // Optional: Create a CSS file for styling

const AdminPanel = () => {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState({ assemblyPoll: '', wordNo: '', boothNo: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://assembly-backend-7qs4.onrender.com/api/form/all');
        setData(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

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
        <input type="text" name="wordNo" placeholder="Word No" value={filter.wordNo} onChange={handleFilterChange} />
        <input type="text" name="boothNo" placeholder="Booth No" value={filter.boothNo} onChange={handleFilterChange} />
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Assembly</th>
            <th>Word No</th>
            <th>Booth No</th>
            <th>Responses</th>
            <th>Time</th>
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
                  r === true ? `Q${i + 1}: Yes | ` :
                  r === false ? `Q${i + 1}: No | ` :
                  `Q${i + 1}: I don't know | `
                )}
              </td>
              <td>{new Date(item.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
