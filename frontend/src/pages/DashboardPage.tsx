import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Plus, TrendingUp } from 'lucide-react';
import { leadsApi } from '../api/leads.api';
import { useLeadsStore } from '../store/leads.store';
import { useAuthStore } from '../store/auth.store';
import { Header } from '../components/dashboard/Header';
import { StatsGrid } from '../components/dashboard/StatsGrid';
import { StatusBadge, SourceBadge } from '../components/ui/Badge';
import { formatDateRelative } from '../utils';
import { TableSkeleton } from '../components/ui/Skeleton';

const DashboardPage = () => {
  const { user } = useAuthStore();
  const { leads, stats, isLoading, isStatsLoading, setLeads, setStats, setLoading, setStatsLoading } =
    useLeadsStore();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setStatsLoading(true);
      try {
        const [leadsRes, statsRes] = await Promise.all([
          leadsApi.list({ sort: 'latest', page: 1 }),
          leadsApi.stats(),
        ]);
        if (leadsRes.data) setLeads(leadsRes.data.items, leadsRes.data.pagination);
        if (statsRes.data) setStats(statsRes.data);
      } catch {
        // handled by interceptor
      } finally {
        setLoading(false);
        setStatsLoading(false);
      }
    };
    fetchData();
  }, []);

  const recentLeads = leads.slice(0, 5);

  return (
    <div className="flex flex-col h-full">
      <Header
        title={`Welcome back, ${user?.name?.split(' ')[0]} 👋`}
        subtitle="Here's what's happening with your leads today."
      />

      <div className="flex-1 p-6 space-y-6 animate-fade-in">
        {/* Stats */}
        <StatsGrid stats={stats} isLoading={isStatsLoading} />

        {/* Recent leads */}
        <div className="card space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-brand-400" />
              <h2 className="text-sm font-semibold text-white">Recent Leads</h2>
            </div>
            <Link
              to="/dashboard/leads"
              className="flex items-center gap-1.5 text-xs text-brand-400 hover:text-brand-300 transition-colors"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {isLoading ? (
            <TableSkeleton rows={5} />
          ) : recentLeads.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm text-white/30">No leads yet.</p>
              <Link
                to="/dashboard/leads"
                className="inline-flex items-center gap-1.5 mt-3 text-xs text-brand-400 hover:text-brand-300"
              >
                <Plus className="h-3.5 w-3.5" /> Add your first lead
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    {['Lead', 'Status', 'Source', 'Added'].map((h) => (
                      <th
                        key={h}
                        className="text-left py-2.5 px-3 text-xs font-medium text-white/30 uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {recentLeads.map((lead) => (
                    <tr key={lead._id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-3">
                        <div>
                          <p className="font-medium text-white text-sm">{lead.name}</p>
                          <p className="text-xs text-white/30">{lead.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <StatusBadge status={lead.status} />
                      </td>
                      <td className="py-3 px-3">
                        <SourceBadge source={lead.source} />
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-xs text-white/30 font-mono">
                          {formatDateRelative(lead.createdAt)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
