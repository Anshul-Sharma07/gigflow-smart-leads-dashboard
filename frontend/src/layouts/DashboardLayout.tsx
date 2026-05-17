import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/dashboard/Sidebar';

export const DashboardLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-surface-950">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
