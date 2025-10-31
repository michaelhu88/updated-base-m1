import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import HR from './pages/HR';
import Accounting from './pages/Accounting';
import RandD from './pages/RandD';
import IT from './pages/IT';
import Finance from './pages/Finance';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/hr" element={<HR />} />
          <Route path="/accounting" element={<Accounting />} />
          <Route path="/rd" element={<RandD />} />
          <Route path="/it" element={<IT />} />
          <Route path="/finance" element={<Finance />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
