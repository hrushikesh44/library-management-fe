import { useAuth } from '../auth/AuthContext';

export function Dashboard() {
  const { roles } = useAuth();

  return (
    <div className="p-6 text-neutral-700">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      {roles.includes('admin') && (
        <AdminDashboard/>
      )}

      {roles.includes('librarian') && (
        <LibrarianDashboard/>
      )}

      {/* {roles.includes('user') && (
        <div className="p-4 bg-neutral-900 rounded-md text-neutral-200 w-fit">
          Browse & Rent Books
        </div>
      )} */}
    </div>
  );
}

export function AdminDashboard(){

  return(
    <div className="p-4 m-3 bg-neutral-900 rounded-md text-neutral-200">
        <p>
          Admin Panel
        </p>
    </div>
  )
}

export function LibrarianDashboard(){

  return(
    <div className=" p-4 m-3 bg-neutral-900 rounded-md text-neutral-200">
        <p>Librarian Panel</p>
    </div>
  )
}