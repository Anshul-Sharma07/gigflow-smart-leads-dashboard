import { Response } from 'express';
import { AuthRequest, LeadFilters } from '../types/index';
import {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
  getLeadsForExport,
  getLeadStats,
} from '../services/lead.service';
import { sendSuccess, sendError, parseIntSafe } from '../utils/helpers';

export const listLeads = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const filters: LeadFilters = {
      status: req.query.status as LeadFilters['status'],
      source: req.query.source as LeadFilters['source'],
      search: req.query.search as string,
      sort: (req.query.sort as LeadFilters['sort']) || 'latest',
      page: parseIntSafe(req.query.page, 1),
      limit: parseIntSafe(req.query.limit, 10),
    };

    const result = await getLeads(filters);
    sendSuccess(res, 'Leads fetched', result);
  } catch (error) {
    sendError(res, 'Failed to fetch leads', 500, String(error));
  }
};

export const getLead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const lead = await getLeadById(req.params.id);
    if (!lead) {
      sendError(res, 'Lead not found', 404);
      return;
    }
    sendSuccess(res, 'Lead fetched', lead);
  } catch (error) {
    sendError(res, 'Failed to fetch lead', 500, String(error));
  }
};

export const addLead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const lead = await createLead({ ...req.body, createdBy: req.user?.id });
    sendSuccess(res, 'Lead created', lead, 201);
  } catch (error) {
    sendError(res, 'Failed to create lead', 500, String(error));
  }
};

export const editLead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const lead = await updateLead(req.params.id, req.body);
    if (!lead) {
      sendError(res, 'Lead not found', 404);
      return;
    }
    sendSuccess(res, 'Lead updated', lead);
  } catch (error) {
    sendError(res, 'Failed to update lead', 500, String(error));
  }
};

export const removeLead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const lead = await deleteLead(req.params.id);
    if (!lead) {
      sendError(res, 'Lead not found', 404);
      return;
    }
    sendSuccess(res, 'Lead deleted');
  } catch (error) {
    sendError(res, 'Failed to delete lead', 500, String(error));
  }
};

export const exportLeads = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const filters = {
      status: req.query.status as LeadFilters['status'],
      source: req.query.source as LeadFilters['source'],
      search: req.query.search as string,
      sort: (req.query.sort as LeadFilters['sort']) || 'latest',
    };

    const leads = await getLeadsForExport(filters);

    const headers = 'Name,Email,Status,Source,Created By,Created At\n';
    const rows = leads.map((l) => {
      const createdByObj = l.createdBy as unknown;
      const creator =
        typeof createdByObj === 'object' &&
        createdByObj !== null &&
        'name' in createdByObj
          ? (createdByObj as { name: string }).name
          : 'Unknown';
      return `"${l.name}","${l.email}","${l.status}","${l.source}","${creator}","${l.createdAt.toISOString()}"`;
    });

    const csv = headers + rows.join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="gigflow-leads.csv"');
    res.send(csv);
  } catch (error) {
    sendError(res, 'Export failed', 500, String(error));
  }
};

export const statsLeads = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const stats = await getLeadStats();
    sendSuccess(res, 'Stats fetched', stats);
  } catch (error) {
    sendError(res, 'Failed to fetch stats', 500, String(error));
  }
};
