import { create } from 'zustand';
import { Lead, Pagination, LeadFilters, LeadStats } from '../types';

interface LeadsState {
  leads: Lead[];
  pagination: Pagination | null;
  stats: LeadStats | null;
  filters: LeadFilters;
  isLoading: boolean;
  isStatsLoading: boolean;
  error: string | null;

  setLeads: (leads: Lead[], pagination: Pagination) => void;
  setStats: (stats: LeadStats) => void;
  addLead: (lead: Lead) => void;
  updateLead: (id: string, lead: Lead) => void;
  removeLead: (id: string) => void;
  setFilters: (filters: Partial<LeadFilters>) => void;
  resetFilters: () => void;
  setLoading: (loading: boolean) => void;
  setStatsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const defaultFilters: LeadFilters = {
  status: '',
  source: '',
  search: '',
  sort: 'latest',
  page: 1,
};

export const useLeadsStore = create<LeadsState>((set) => ({
  leads: [],
  pagination: null,
  stats: null,
  filters: defaultFilters,
  isLoading: false,
  isStatsLoading: false,
  error: null,

  setLeads: (leads, pagination) => set({ leads, pagination }),
  setStats: (stats) => set({ stats }),
  addLead: (lead) => set((state) => ({ leads: [lead, ...state.leads] })),
  updateLead: (id, updated) =>
    set((state) => ({
      leads: state.leads.map((l) => (l._id === id ? updated : l)),
    })),
  removeLead: (id) =>
    set((state) => ({
      leads: state.leads.filter((l) => l._id !== id),
    })),
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters, page: 1 },
    })),
  resetFilters: () => set({ filters: defaultFilters }),
  setLoading: (isLoading) => set({ isLoading }),
  setStatsLoading: (isStatsLoading) => set({ isStatsLoading }),
  setError: (error) => set({ error }),
}));
