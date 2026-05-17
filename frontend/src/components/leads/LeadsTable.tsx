import { Pencil, Trash2, ChevronUp, ChevronDown, User2 } from 'lucide-react';
import { Lead } from '../../types';
import { StatusBadge, SourceBadge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { TableSkeleton } from '../ui/Skeleton';
import { EmptyState } from '../ui/EmptyState';
import { formatDateRelative } from '../../utils';
import { useAuthStore } from '../../store/auth.store';

interface LeadsTableProps {
  leads: Lead[];
  isLoading: boolean;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
  sortOrder: 'latest' | 'oldest';
  onSortChange: () => void;
}

export const LeadsTable = ({
  leads,
  isLoading,
  onEdit,
  onDelete,
  sortOrder,
  onSortChange,
}: LeadsTableProps) => {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'admin';

  if (isLoading) return <TableSkeleton rows={6} />;

  if (!leads.length) {
    return (
      <EmptyState
        title="No leads found"
        description="Try adjusting your filters or add a new lead to get started."
      />
    );
  }

  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/[0.06]">
            <th className="text-left py-3 px-4 text-xs font-medium text-white/30 uppercase tracking-wider">
              Lead
            </th>
            <th className="text-left py-3 px-4 text-xs font-medium text-white/30 uppercase tracking-wider">
              Status
            </th>
            <th className="text-left py-3 px-4 text-xs font-medium text-white/30 uppercase tracking-wider">
              Source
            </th>
            <th className="text-left py-3 px-4 text-xs font-medium text-white/30 uppercase tracking-wider">
              Created by
            </th>
            <th className="text-left py-3 px-4 text-xs font-medium text-white/30 uppercase tracking-wider">
              <button
                onClick={onSortChange}
                className="flex items-center gap-1 hover:text-white/60 transition-colors"
              >
                Date
                {sortOrder === 'latest' ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronUp className="h-3 w-3" />
                )}
              </button>
            </th>
            <th className="py-3 px-4 w-24" />
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.04]">
          {leads.map((lead) => {
            const creator =
              typeof lead.createdBy === 'object' && lead.createdBy !== null
                ? lead.createdBy.name
                : 'Unknown';

            return (
              <tr
                key={lead._id}
                className="group hover:bg-white/[0.02] transition-colors duration-150"
              >
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-white/50">
                        {lead.name[0]?.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-white">{lead.name}</p>
                      <p className="text-xs text-white/30">{lead.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <StatusBadge status={lead.status} />
                </td>
                <td className="py-3.5 px-4">
                  <SourceBadge source={lead.source} />
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-1.5">
                    <User2 className="h-3 w-3 text-white/20" />
                    <span className="text-white/40 text-xs">{creator}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="text-white/30 text-xs font-mono">
                    {formatDateRelative(lead.createdAt)}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(lead)}
                      className="p-1.5 !px-1.5 text-white/40 hover:text-white"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    {isAdmin && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(lead)}
                        className="p-1.5 !px-1.5 text-white/40 hover:text-red-400"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
