import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Accommodation from './pages/accommodation/accommodation';
import Owner from './pages/owner/owner';
import Resume from './pages/resume/resume';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/accommodation" replace />} />
        <Route path="/accommodation" element={<Accommodation />} />
        <Route path="/owner" element={<Owner />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </Router>
  );
}

export default App;
