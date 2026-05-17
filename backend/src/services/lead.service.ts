import { Lead } from '../models/Lead';
import { LeadFilters, LeadStatus, LeadSource, PaginatedResponse } from '../types/index';
import { ILeadDocument } from '../models/Lead';

export const getLeads = async (
  filters: LeadFilters
): Promise<PaginatedResponse<ILeadDocument>> => {
  const {
    status,
    source,
    search,
    sort = 'latest',
    page = 1,
    limit = 10,
  } = filters;

  const query: Record<string, unknown> = {};

  if (status) query.status = status as LeadStatus;
  if (source) query.source = source as LeadSource;
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }

  const sortOrder = sort === 'latest' ? -1 : 1;
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    Lead.find(query)
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(limit)
      .populate('createdBy', 'name email role'),
    Lead.countDocuments(query),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    items,
    pagination: {
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
};

export const getLeadById = async (id: string) => {
  return Lead.findById(id).populate('createdBy', 'name email role');
};

export const createLead = async (data: {
  name: string;
  email: string;
  status?: LeadStatus;
  source: LeadSource;
  createdBy: string;
}) => {
  return Lead.create(data);
};

export const updateLead = async (
  id: string,
  data: Partial<{ name: string; email: string; status: LeadStatus; source: LeadSource }>
) => {
  return Lead.findByIdAndUpdate(id, data, { new: true, runValidators: true }).populate(
    'createdBy',
    'name email role'
  );
};

export const deleteLead = async (id: string) => {
  return Lead.findByIdAndDelete(id);
};

export const getLeadsForExport = async (filters: Omit<LeadFilters, 'page' | 'limit'>) => {
  const { status, source, search, sort = 'latest' } = filters;
  const query: Record<string, unknown> = {};

  if (status) query.status = status;
  if (source) query.source = source;
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }

  return Lead.find(query)
    .sort({ createdAt: sort === 'latest' ? -1 : 1 })
    .populate('createdBy', 'name email');
};

export const getLeadStats = async () => {
  const [total, byStatus] = await Promise.all([
    Lead.countDocuments(),
    Lead.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]),
  ]);

  const stats: Record<string, number> = { New: 0, Contacted: 0, Qualified: 0, Lost: 0 };
  byStatus.forEach((s: { _id: string; count: number }) => {
    stats[s._id] = s.count;
  });

  return { total, ...stats };
};
