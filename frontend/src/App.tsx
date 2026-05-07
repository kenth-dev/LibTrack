import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Student from './pages/Student';
import Librarian from './pages/Librarian';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/student" element={<Student />} />
      <Route path="/librarian" element={<Librarian />} />
    </Routes>
  );
}

export default App;