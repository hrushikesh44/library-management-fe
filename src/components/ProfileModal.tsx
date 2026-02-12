import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

interface ProfileModalProps {
 onClose : { onClose: () => void },
 username: string
}

export default function ProfileModal({onClose, username} : ProfileModalProps) {
  const { roles } = useAuth();
  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    navigate('/login');
    window.location.reload();
  }

  return (
    <div
      className="absolute right-0 mt-3 w-48 rounded-md bg-white shadow-xl
                 border border-zinc-900/10 z-50"
    >
      <div className="p-4 border-b border-zinc-900/10">
        <p className='text-md font-medium text-neutral-900'>{username}</p>
        {/* <p className="text-sm font-medium text-neutral-700">Logged in as</p> */}
        <p className="text-xs text-neutral-500 capitalize">
          {roles.join(', ')}
        </p>
      </div>

      <button
        onClick={logout}
        className="w-full text-left px-4 py-2 text-sm
                   text-red-600 hover:bg-red-50"
      >
        Logout
      </button>
    </div>
  );
}
