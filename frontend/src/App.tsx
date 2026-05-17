import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ProtectedRoute, GuestRoute } from './routes/ProtectedRoute';
import { DashboardLayout } from './layouts/DashboardLayout';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const LeadsPage = lazy(() => import('./pages/LeadsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-surface-950">
    <div className="flex items-center gap-3 text-white/30">
      <div className="w-5 h-5 border-2 border-brand-500/50 border-t-brand-400 rounded-full animate-spin" />
      <span className="text-sm">Loading...</span>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1a1b1e',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.08)',
            fontSize: '13px',
            borderRadius: '10px',
          },
          success: {
            iconTheme: { primary: '#10b981', secondary: '#1a1b1e' },
          },
          error: {
            iconTheme: { primary: '#f87171', secondary: '#1a1b1e' },
          },
        }}
      />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Redirect root */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Guest only */}
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/dashboard/leads" element={<LeadsPage />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
