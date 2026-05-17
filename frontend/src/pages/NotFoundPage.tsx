import { Link } from 'react-router-dom';
import { Zap, Home } from 'lucide-react';

const NotFoundPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-surface-950 text-center p-6">
    <div className="p-3 rounded-2xl bg-brand-500/10 border border-brand-500/20 mb-6">
      <Zap className="h-8 w-8 text-brand-400" />
    </div>
    <h1 className="text-6xl font-bold text-white mb-2">404</h1>
    <p className="text-lg text-white/40 mb-8">Page not found</p>
    <Link
      to="/dashboard"
      className="btn-primary"
    >
      <Home className="h-4 w-4" />
      Back to dashboard
    </Link>
  </div>
);

export default NotFoundPage;
