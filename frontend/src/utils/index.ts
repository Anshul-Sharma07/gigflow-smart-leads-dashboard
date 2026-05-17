import { clsx, type ClassValue } from 'clsx';
import { LeadStatus, LeadSource } from '../types';

export const cn = (...inputs: ClassValue[]) => clsx(inputs);

export const formatDate = (dateString: string): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateString));
};

export const formatDateRelative = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return formatDate(dateString);
};

export const statusConfig: Record<LeadStatus, { label: string; className: string }> = {
  New: { label: 'New', className: 'bg-blue-500/10 text-blue-400 border border-blue-500/20' },
  Contacted: { label: 'Contacted', className: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' },
  Qualified: { label: 'Qualified', className: 'bg-green-500/10 text-green-400 border border-green-500/20' },
  Lost: { label: 'Lost', className: 'bg-red-500/10 text-red-400 border border-red-500/20' },
};

export const sourceConfig: Record<LeadSource, { label: string; className: string }> = {
  Website: { label: 'Website', className: 'bg-purple-500/10 text-purple-400 border border-purple-500/20' },
  Instagram: { label: 'Instagram', className: 'bg-pink-500/10 text-pink-400 border border-pink-500/20' },
  Referral: { label: 'Referral', className: 'bg-orange-500/10 text-orange-400 border border-orange-500/20' },
};

export const LEAD_STATUSES: LeadStatus[] = ['New', 'Contacted', 'Qualified', 'Lost'];
export const LEAD_SOURCES: LeadSource[] = ['Website', 'Instagram', 'Referral'];
