import { AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Lead } from '../../types';
import { leadsApi } from '../../api/leads.api';
import { useLeadsStore } from '../../store/leads.store';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useApiError } from '../../hooks';

interface DeleteLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
}

export const DeleteLeadModal = ({ isOpen, onClose, lead }: DeleteLeadModalProps) => {
  const { removeLead } = useLeadsStore();
  const { getErrorMessage } = useApiError();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!lead) return;
    setIsDeleting(true);
    try {
      await leadsApi.delete(lead._id);
      removeLead(lead._id);
      toast.success('Lead deleted');
      onClose();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Lead" size="sm">
      <div className="space-y-5">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-red-400" />
          </div>
          <div>
            <p className="text-sm text-white/70">
              Are you sure you want to delete{' '}
              <span className="font-semibold text-white">{lead?.name}</span>? This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} loading={isDeleting}>
            Delete lead
          </Button>
        </div>
      </div>
    </Modal>
  );
};
