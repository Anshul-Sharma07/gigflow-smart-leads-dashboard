import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Mail, Lock, Zap } from 'lucide-react';
import { authApi } from '../../api/auth.api';
import { useAuthStore } from '../../store/auth.store';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useApiError } from '../../hooks';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password required'),
});

type FormData = z.infer<typeof schema>;

export const LoginForm = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const { getErrorMessage } = useApiError();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await authApi.login(data);
      if (res.data) {
        setAuth(res.data.user, res.data.token);
        toast.success('Welcome back!');
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-surface-950">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-600/10 via-transparent to-accent-500/5" />

      <div className="relative w-full max-w-md animate-slide-up">
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-8 justify-center">
          <div className="p-2 rounded-xl bg-brand-500/20 border border-brand-500/30">
            <Zap className="h-5 w-5 text-brand-400" />
          </div>
          <span className="text-xl font-bold tracking-tight">GigFlow</span>
        </div>

        <div className="card space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Sign in</h1>
            <p className="text-sm text-white/40 mt-1">Access your leads dashboard</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              {...register('email')}
              id="email"
              label="Email"
              type="email"
              placeholder="you@company.com"
              icon={<Mail className="h-4 w-4" />}
              error={errors.email?.message}
              autoComplete="email"
            />
            <Input
              {...register('password')}
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              icon={<Lock className="h-4 w-4" />}
              error={errors.password?.message}
              autoComplete="current-password"
            />

            <Button type="submit" className="w-full mt-2" loading={isSubmitting}>
              Sign in
            </Button>
          </form>

          <p className="text-sm text-center text-white/30">
            No account?{' '}
            <Link to="/register" className="text-brand-400 hover:text-brand-300 transition-colors">
              Create one
            </Link>
          </p>
        </div>

        {/* Demo credentials */}
        <div className="mt-4 p-3.5 rounded-lg border border-white/[0.06] bg-white/[0.02] text-center">
          <p className="text-xs text-white/30">
            Demo: <span className="text-white/50 font-mono">admin@gigflow.com</span> / <span className="text-white/50 font-mono">password123</span>
          </p>
        </div>
      </div>
    </div>
  );
};
