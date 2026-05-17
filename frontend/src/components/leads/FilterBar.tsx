import { Search, SlidersHorizontal, Download, RotateCcw } from 'lucide-react';
import { LeadFilters, LeadSource, LeadStatus } from '../../types';
import { LEAD_STATUSES, LEAD_SOURCES } from '../../utils';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface FilterBarProps {
  filters: LeadFilters;
  onFilterChange: (filters: Partial<LeadFilters>) => void;
  onReset: () => void;
  onExport: () => void;
  onSearch: (search: string) => void;
  searchValue: string;
}

export const FilterBar = ({
  filters,
  onFilterChange,
  onReset,
  onExport,
  onSearch,
  searchValue,
}: FilterBarProps) => {
  const hasActiveFilters = filters.status || filters.source || filters.search;

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="flex-1">
          <Input
            value={searchValue}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search by name or email..."
            icon={<Search className="h-4 w-4" />}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={onReset}>
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={onExport}>
            <Download className="h-3.5 w-3.5" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1.5 text-white/30">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          <span className="text-xs font-medium">Filter:</span>
        </div>

        {/* Status filter */}
        <div className="flex gap-1.5">
          <button
            onClick={() => onFilterChange({ status: '' })}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              !filters.status
                ? 'bg-white/10 text-white'
                : 'text-white/40 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            All status
          </button>
          {LEAD_STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => onFilterChange({ status: filters.status === s ? '' : s as LeadStatus })}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                filters.status === s
                  ? 'bg-brand-500/20 text-brand-400 border border-brand-500/30'
                  : 'text-white/40 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="w-px h-4 bg-white/10" />

        {/* Source filter */}
        <div className="flex gap-1.5">
          <button
            onClick={() => onFilterChange({ source: '' })}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              !filters.source
                ? 'bg-white/10 text-white'
                : 'text-white/40 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            All sources
          </button>
          {LEAD_SOURCES.map((s) => (
            <button
              key={s}
              onClick={() => onFilterChange({ source: filters.source === s ? '' : s as LeadSource })}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                filters.source === s
                  ? 'bg-brand-500/20 text-brand-400 border border-brand-500/30'
                  : 'text-white/40 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="w-px h-4 bg-white/10" />

        {/* Sort */}
        <div className="flex gap-1.5">
          {(['latest', 'oldest'] as const).map((s) => (
            <button
              key={s}
              onClick={() => onFilterChange({ sort: s })}
              className={`px-2.5 py-1 rounded-md text-xs font-medium capitalize transition-all ${
                filters.sort === s
                  ? 'bg-white/10 text-white'
                  : 'text-white/40 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
