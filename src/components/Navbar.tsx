import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { useState } from 'react';
import { parseJwt } from '../services/jwtParser';
import { getInitial } from '../services/getInitials';
import ProfileModal from './ProfileModal';

export default function Navbar() {
  const { roles } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const stored = localStorage.getItem("Authorization");
  const token = stored!.replace('Bearer ', '');
  const payload = parseJwt(token);
  const username = payload.username;
  const profile = getInitial(username)


  const isActive = (path: string) =>
    location.pathname === path
      ? 'text-neutral-900 font-semibold'
      : 'text-neutral-500 hover:text-neutral-800';


  return (
        <nav
    className="h-16 px-6 bg-[#f4f4f4] border-b border-zinc-900/10 flex items-center justify-between"
    onClick={() => open && setOpen(false)}   // 👈 SINGLE LINE
    >
    <Link
        to="/"
        className="text-xl font-bold tracking-tight text-neutral-900"
    >
        📚 Library
    </Link>

    <div className="flex gap-6">
        <Link to="/books" className={isActive('/books')}>
        Books
        </Link>

        <Link to="/buy/my" className={isActive('/buy/my')}>
        My Purchases
        </Link>

        <Link to="/rent/my" className={isActive('/rent/my')}>
        My Rentals
        </Link>

        {roles.includes('librarian') && (
        <Link to="/librarian" className={isActive('/librarian')}>
            Librarian
        </Link>
        )}

        {roles.includes('admin') && (
        <Link to="/admin" className={isActive('/admin')}>
            Admin
        </Link>
        )}
    </div>

    <div className="relative">
        <button
        onClick={(e) => {
            e.stopPropagation();     // 👈 prevents instant close
            setOpen(!open);
        }}
        className="w-9 h-9 rounded-full bg-neutral-900 text-neutral-200 flex items-center justify-center font-medium"
        >
        {profile}
        </button>

        {open && (
        <ProfileModal
            onClose={() => setOpen(false)}
            username={username}
        />
        )}
    </div>
    </nav>

  );
}
