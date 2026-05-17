import { ReactNode } from 'react';
import { Users } from 'lucide-react';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export const EmptyState = ({ icon, title, description, action }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] mb-4">
      {icon || <Users className="h-8 w-8 text-white/20" />}
    </div>
    <h3 className="text-base font-medium text-white/60 mb-1">{title}</h3>
    {description && <p className="text-sm text-white/30 max-w-xs mb-4">{description}</p>}
    {action}
  </div>
);
