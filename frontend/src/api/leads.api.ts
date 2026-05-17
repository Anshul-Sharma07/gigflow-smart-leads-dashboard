import apiClient from './client';
import {
  ApiResponse,
  PaginatedLeads,
  Lead,
  LeadStats,
  LeadFilters,
  CreateLeadInput,
  UpdateLeadInput,
} from '../types';

export const leadsApi = {
  list: async (filters: LeadFilters) => {
    const params = new URLSearchParams();
    if (filters.status) params.set('status', filters.status);
    if (filters.source) params.set('source', filters.source);
    if (filters.search) params.set('search', filters.search);
    if (filters.sort) params.set('sort', filters.sort);
    if (filters.page) params.set('page', String(filters.page));

    const res = await apiClient.get<ApiResponse<PaginatedLeads>>(`/leads?${params}`);
    return res.data;
  },

  get: async (id: string) => {
    const res = await apiClient.get<ApiResponse<Lead>>(`/leads/${id}`);
    return res.data;
  },

  create: async (data: CreateLeadInput) => {
    const res = await apiClient.post<ApiResponse<Lead>>('/leads', data);
    return res.data;
  },

  update: async (id: string, data: UpdateLeadInput) => {
    const res = await apiClient.put<ApiResponse<Lead>>(`/leads/${id}`, data);
    return res.data;
  },

  delete: async (id: string) => {
    const res = await apiClient.delete<ApiResponse<void>>(`/leads/${id}`);
    return res.data;
  },

  stats: async () => {
    const res = await apiClient.get<ApiResponse<LeadStats>>('/leads/stats');
    return res.data;
  },

  exportCsv: (filters: Omit<LeadFilters, 'page'>) => {
    const params = new URLSearchParams();
    if (filters.status) params.set('status', filters.status);
    if (filters.source) params.set('source', filters.source);
    if (filters.search) params.set('search', filters.search);
    if (filters.sort) params.set('sort', filters.sort);

    const token = localStorage.getItem('gigflow-token');
    const url = `/api/leads/export?${params}`;

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'gigflow-leads.csv');

    // Fetch with auth header
    fetch(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.blob())
      .then((blob) => {
        const objectUrl = URL.createObjectURL(blob);
        link.href = objectUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(objectUrl);
      });
  },
};
