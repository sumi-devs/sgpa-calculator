import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SGPA from './components/SGPA';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SGPA />} />
      </Routes>
    </Router>
  );
}

export default App;
