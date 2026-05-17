import { Users, Sparkles, Phone, Trophy, XCircle } from 'lucide-react';
import { LeadStats } from '../../types';
import { StatsSkeleton } from '../ui/Skeleton';
import { cn } from '../../utils';

interface StatsCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  colorClass: string;
  percentage?: number;
}

const StatsCard = ({ label, value, icon, colorClass, percentage }: StatsCardProps) => (
  <div className="card group hover:bg-white/[0.06] transition-all duration-200 cursor-default">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs text-white/40 font-medium uppercase tracking-wider mb-3">{label}</p>
        <p className="text-3xl font-bold text-white tabular-nums">{value}</p>
        {percentage !== undefined && (
          <p className="text-xs text-white/30 mt-1.5">
            <span className={cn('font-medium', colorClass)}>{percentage}%</span> of total
          </p>
        )}
      </div>
      <div className={cn('p-2.5 rounded-xl border', colorClass.replace('text-', 'bg-').replace('400', '500/10') + ' border-' + colorClass.split('-')[1] + '-500/20')}>
        {icon}
      </div>
    </div>
  </div>
);

interface StatsGridProps {
  stats: LeadStats | null;
  isLoading: boolean;
}

export const StatsGrid = ({ stats, isLoading }: StatsGridProps) => {
  if (isLoading) return <StatsSkeleton />;

  const total = stats?.total ?? 0;
  const pct = (n: number) => total > 0 ? Math.round((n / total) * 100) : 0;

  const cards = [
    {
      label: 'Total Leads',
      value: stats?.total ?? 0,
      icon: <Users className="h-5 w-5 text-white/50" />,
      colorClass: 'text-white',
    },
    {
      label: 'New',
      value: stats?.New ?? 0,
      icon: <Sparkles className="h-5 w-5 text-blue-400" />,
      colorClass: 'text-blue-400',
      percentage: pct(stats?.New ?? 0),
    },
    {
      label: 'Contacted',
      value: stats?.Contacted ?? 0,
      icon: <Phone className="h-5 w-5 text-yellow-400" />,
      colorClass: 'text-yellow-400',
      percentage: pct(stats?.Contacted ?? 0),
    },
    {
      label: 'Qualified',
      value: stats?.Qualified ?? 0,
      icon: <Trophy className="h-5 w-5 text-green-400" />,
      colorClass: 'text-green-400',
      percentage: pct(stats?.Qualified ?? 0),
    },
    {
      label: 'Lost',
      value: stats?.Lost ?? 0,
      icon: <XCircle className="h-5 w-5 text-red-400" />,
      colorClass: 'text-red-400',
      percentage: pct(stats?.Lost ?? 0),
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card) => (
        <StatsCard key={card.label} {...card} />
      ))}
    </div>
  );
};
