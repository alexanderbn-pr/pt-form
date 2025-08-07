import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import MultiStepForm from './components/multiStepForm/multiStepForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/reserve" replace />} />
        <Route path="/reserve" element={<MultiStepForm />} />
      </Routes>
    </Router>
  );
}

export default App;
