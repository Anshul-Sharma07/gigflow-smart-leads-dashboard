import { NavLink, useNavigate } from 'react-router-dom';
import { Zap, LayoutDashboard, Users, LogOut, Shield, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../../store/auth.store';
import { cn } from '../../utils';
import toast from 'react-hot-toast';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/dashboard/leads', icon: Users, label: 'Leads' },
];

interface SidebarProps {
  collapsed?: boolean;
}

export const Sidebar = ({ collapsed }: SidebarProps) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Signed out');
    navigate('/login');
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-5 border-b border-white/[0.06]">
        <div className="p-1.5 rounded-lg bg-brand-500/20 border border-brand-500/30 flex-shrink-0">
          <Zap className="h-4 w-4 text-brand-400" />
        </div>
        {!collapsed && <span className="text-base font-bold tracking-tight">GigFlow</span>}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-2 space-y-0.5 mt-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/dashboard'}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20'
                  : 'text-white/40 hover:text-white hover:bg-white/[0.05]'
              )
            }
          >
            <Icon className="h-4 w-4 flex-shrink-0" />
            {!collapsed && label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-white/[0.06]">
        {/* User card */}
        {!collapsed && (
          <div className="flex items-center gap-2.5 px-3 py-2.5 mb-1 rounded-lg bg-white/[0.03]">
            <div className="w-7 h-7 rounded-full bg-brand-500/20 border border-brand-500/30 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-semibold text-brand-400">
                {user?.name?.[0]?.toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">{user?.name}</p>
              <div className="flex items-center gap-1">
                <Shield className="h-2.5 w-2.5 text-white/30" />
                <p className="text-xs text-white/30 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          {!collapsed && 'Sign out'}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className={cn(
        'hidden md:flex flex-col h-screen sticky top-0 glass border-r border-white/[0.06] transition-all duration-300',
        collapsed ? 'w-16' : 'w-56'
      )}>
        <SidebarContent />
      </aside>

      {/* Mobile toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg glass"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setMobileOpen(false)} />
          <aside className="fixed left-0 top-0 h-screen w-56 z-50 flex flex-col glass border-r border-white/[0.06] md:hidden animate-slide-up">
            <SidebarContent />
          </aside>
        </>
      )}
    </>
  );
};
