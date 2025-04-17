import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FormComponent from './FormComponent';
import Register from './Register';
import AdminPanel from './AdminPanel';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Admin panel</Link> | <Link to="/form">Form</Link> 
      </nav>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/form" element={<FormComponent />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
