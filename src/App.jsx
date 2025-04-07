import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FormComponent from './FormComponent';
import AdminPanel from './AdminPanel';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Form</Link> | <Link to="/admin">Admin Panel</Link>
      </nav>
      <Routes>
        <Route path="/" element={<FormComponent />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
