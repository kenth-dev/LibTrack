import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Student from './pages/Student';
import Librarian from './pages/Librarian';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/student" element={<Student />} />
      <Route path="/librarian" element={<Librarian />} />
    </Routes>
  );
}

export default App;