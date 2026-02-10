import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import MyPurchase from './pages/MyPurchase';
import Books from './pages/Books';
import './index.css'
import { Signup } from './pages/Signup';
import LibraryDashboard from './pages/Dashboard';

function App() {
  return (
    <Routes>
      <Route path='/dashboard' element={<LibraryDashboard />}/>
      <Route path="/login" element={<Login />} />
      <Route path='/signup' element={<Signup /> } />
      <Route path="/books" element={<Books />} />
      <Route path="/buy/my" element={<MyPurchase />} />
    </Routes>
  );
}

export default App;
