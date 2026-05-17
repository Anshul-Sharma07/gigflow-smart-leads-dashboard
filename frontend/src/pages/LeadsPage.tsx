import { useEffect, useState, useCallback } from 'react';
import { Plus } from 'lucide-react';
import { leadsApi } from '../api/leads.api';
import { useLeadsStore } from '../store/leads.store';
import { Lead, LeadFilters } from '../types';
import { Header } from '../components/dashboard/Header';
import { FilterBar } from '../components/leads/FilterBar';
import { LeadsTable } from '../components/leads/LeadsTable';
import { LeadFormModal } from '../components/leads/LeadFormModal';
import { DeleteLeadModal } from '../components/leads/DeleteLeadModal';
import { Pagination } from '../components/ui/Pagination';
import { Button } from '../components/ui/Button';
import { useDebounceValue } from '../hooks';
import toast from 'react-hot-toast';

const LeadsPage = () => {
  const {
    leads,
    pagination,
    filters,
    isLoading,
    setLeads,
    setFilters,
    resetFilters,
    setLoading,
    setError,
  } = useLeadsStore();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [deletingLead, setDeletingLead] = useState<Lead | null>(null);
  const [searchInput, setSearchInput] = useState('');

  const debouncedSearch = useDebounceValue(searchInput, 400);

  const fetchLeads = useCallback(async (overrideFilters?: Partial<LeadFilters>) => {
    setLoading(true);
    setError(null);
    try {
      const mergedFilters = { ...filters, ...overrideFilters };
      const res = await leadsApi.list(mergedFilters);
      if (res.data) {
        setLeads(res.data.items, res.data.pagination);
      }
    } catch {
      setError('Failed to load leads');
      toast.error('Failed to load leads');
    } finally {
      setLoading(false);
    }
  }, [filters, setLeads, setLoading, setError]);

  // Fetch on filter change
  useEffect(() => {
    fetchLeads();
  }, [filters]);

  // Debounced search
  useEffect(() => {
    setFilters({ search: debouncedSearch, page: 1 });
  }, [debouncedSearch]);

  const handleFilterChange = (newFilters: Partial<LeadFilters>) => {
    setFilters(newFilters);
  };

  const handleReset = () => {
    setSearchInput('');
    resetFilters();
  };

  const handlePageChange = (page: number) => {
    setFilters({ page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortToggle = () => {
    setFilters({ sort: filters.sort === 'latest' ? 'oldest' : 'latest' });
  };

  const handleExport = () => {
    leadsApi.exportCsv({
      status: filters.status,
      source: filters.source,
      search: filters.search,
      sort: filters.sort,
    });
    toast.success('CSV export started');
  };

  const handleEditClose = () => setEditingLead(null);
  const handleDeleteClose = () => setDeletingLead(null);

  return (
    <div className="flex flex-col h-full">
      <Header title="Leads" subtitle="Manage and track your sales pipeline." />

      <div className="flex-1 p-6 space-y-5 animate-fade-in">
        {/* Filter bar */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-white">
                {pagination ? (
                  <span>
                    {pagination.total}{' '}
                    <span className="text-white/40 font-normal">
                      {pagination.total === 1 ? 'lead' : 'leads'}
                    </span>
                  </span>
                ) : (
                  'Leads'
                )}
              </h2>
            </div>
            <Button onClick={() => setShowAddModal(true)} size="sm">
              <Plus className="h-4 w-4" />
              Add Lead
            </Button>
          </div>

          <FilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
            onExport={handleExport}
            onSearch={setSearchInput}
            searchValue={searchInput}
          />
        </div>

        {/* Table */}
        <div className="card">
          <LeadsTable
            leads={leads}
            isLoading={isLoading}
            onEdit={(lead) => setEditingLead(lead)}
            onDelete={(lead) => setDeletingLead(lead)}
            sortOrder={filters.sort ?? 'latest'}
            onSortChange={handleSortToggle}
          />

          {pagination && (
            <div className="mt-4">
              <Pagination pagination={pagination} onPageChange={handlePageChange} />
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <LeadFormModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={() => fetchLeads()}
      />
      <LeadFormModal
        isOpen={!!editingLead}
        onClose={handleEditClose}
        lead={editingLead}
        onSuccess={() => fetchLeads()}
      />
      <DeleteLeadModal
        isOpen={!!deletingLead}
        onClose={handleDeleteClose}
        lead={deletingLead}
      />
    </div>
  );
};

export default LeadsPage;
