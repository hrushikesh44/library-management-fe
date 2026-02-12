import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      <Navbar />
      <main className="pt-6 px-6">
        <Outlet />
      </main>
    </div>
  );
}
