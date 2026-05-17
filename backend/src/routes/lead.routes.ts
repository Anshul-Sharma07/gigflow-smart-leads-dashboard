import { Router } from 'express';
import {
  listLeads,
  getLead,
  addLead,
  editLead,
  removeLead,
  exportLeads,
  statsLeads,
} from '../controllers/lead.controller';
import { authenticate, authorize } from '../middleware/auth';
import { createLeadValidator, updateLeadValidator, leadQueryValidator } from '../validators/index';
import { validate } from '../middleware/validate';

const router = Router();

router.use(authenticate);

router.get('/stats', statsLeads);
router.get('/export', exportLeads);
router.get('/', leadQueryValidator, validate, listLeads);
router.get('/:id', getLead);
router.post('/', createLeadValidator, validate, addLead);
router.put('/:id', updateLeadValidator, validate, editLead);
router.delete('/:id', authorize('admin'), removeLead);

export default router;
