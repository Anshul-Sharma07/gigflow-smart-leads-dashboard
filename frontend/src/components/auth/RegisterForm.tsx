import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { User, Mail, Lock, Shield, Zap } from 'lucide-react';
import { authApi } from '../../api/auth.api';
import { useAuthStore } from '../../store/auth.store';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { useApiError } from '../../hooks';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['admin', 'sales']).default('sales'),
});

type FormData = z.infer<typeof schema>;

export const RegisterForm = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const { getErrorMessage } = useApiError();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { role: 'sales' },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await authApi.register(data);
      if (res.data) {
        setAuth(res.data.user, res.data.token);
        toast.success('Account created!');
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-surface-950">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-600/10 via-transparent to-accent-500/5" />

      <div className="relative w-full max-w-md animate-slide-up">
        <div className="flex items-center gap-2.5 mb-8 justify-center">
          <div className="p-2 rounded-xl bg-brand-500/20 border border-brand-500/30">
            <Zap className="h-5 w-5 text-brand-400" />
          </div>
          <span className="text-xl font-bold tracking-tight">GigFlow</span>
        </div>

        <div className="card space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Create account</h1>
            <p className="text-sm text-white/40 mt-1">Start managing your leads today</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              {...register('name')}
              id="name"
              label="Full Name"
              placeholder="John Doe"
              icon={<User className="h-4 w-4" />}
              error={errors.name?.message}
            />
            <Input
              {...register('email')}
              id="email"
              label="Email"
              type="email"
              placeholder="you@company.com"
              icon={<Mail className="h-4 w-4" />}
              error={errors.email?.message}
            />
            <Input
              {...register('password')}
              id="password"
              label="Password"
              type="password"
              placeholder="Min. 6 characters"
              icon={<Lock className="h-4 w-4" />}
              error={errors.password?.message}
            />
            <Select
              {...register('role')}
              id="role"
              label="Role"
              options={[
                { value: 'sales', label: 'Sales' },
                { value: 'admin', label: 'Admin' },
              ]}
              error={errors.role?.message}
            />

            <Button type="submit" className="w-full mt-2" loading={isSubmitting}>
              <Shield className="h-4 w-4" />
              Create account
            </Button>
          </form>

          <p className="text-sm text-center text-white/30">
            Have an account?{' '}
            <Link to="/login" className="text-brand-400 hover:text-brand-300 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
