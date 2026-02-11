import { Routes, Route } from 'react-router-dom';
import MyPurchase from './pages/MyPurchase';
import Books from './pages/Books';
import './index.css'
import { Signup } from './pages/Signup';
import { Dashboard, LibrarianDashboard, AdminDashboard } from './pages/Dashboard';
import LoginPage from './pages/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import Unauthorized from './pages/Unauthorized';
import RoleRedirect from './components/RoleRedirect';

function App() {
  return (
      <Routes>
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<RoleRedirect />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['librarian']} />}>
        <Route path="/librarian" element={<LibrarianDashboard />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path='/signup' element={<Signup /> } />
      <Route element={<ProtectedRoute />}>
        <Route path="/books" element={<Books />} />
        <Route path="/buy/my" element={<MyPurchase />} />
      </Route>
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
}

export default App;
