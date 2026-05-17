import { LeadStatus, LeadSource } from '../../types';
import { statusConfig, sourceConfig } from '../../utils';
import { cn } from '../../utils';

interface StatusBadgeProps {
  status: LeadStatus;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];
  return (
    <span className={cn('badge', config.className, className)}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-80" />
      {config.label}
    </span>
  );
};

interface SourceBadgeProps {
  source: LeadSource;
  className?: string;
}

export const SourceBadge = ({ source, className }: SourceBadgeProps) => {
  const config = sourceConfig[source];
  return (
    <span className={cn('badge', config.className, className)}>
      {config.label}
    </span>
  );
};
