import { Routes, Route } from 'react-router-dom';
import MyPurchase from './pages/MyPurchase';
import Books from './pages/Books';
import './index.css';
import { Signup } from './pages/Signup';
import { Dashboard, LibrarianDashboard, AdminDashboard } from './pages/Dashboard';
import LoginPage from './pages/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import Unauthorized from './pages/Unauthorized';
import RoleRedirect from './components/RoleRedirect';
import AppLayout from './components/AppLayout';
import MyRentals from './pages/MyRentals';

function App() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* PROTECTED + NAVBAR */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          
          <Route path="/" element={<RoleRedirect />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['librarian']} />}>
            <Route path="/librarian" element={<LibrarianDashboard />} />
          </Route>

          <Route path="/books" element={<Books />} />
          <Route path="/buy/my" element={<MyPurchase />} />
          <Route path="/rent/my" element={<MyRentals />} />

        </Route>
      </Route>
    </Routes>
  );
}

export default App;
