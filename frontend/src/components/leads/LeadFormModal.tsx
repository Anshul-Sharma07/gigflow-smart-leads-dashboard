import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Lead, CreateLeadInput, UpdateLeadInput } from '../../types';
import { leadsApi } from '../../api/leads.api';
import { useLeadsStore } from '../../store/leads.store';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { LEAD_STATUSES, LEAD_SOURCES } from '../../utils';
import { useApiError } from '../../hooks';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  status: z.enum(['New', 'Contacted', 'Qualified', 'Lost']).default('New'),
  source: z.enum(['Website', 'Instagram', 'Referral']),
});

type FormData = z.infer<typeof schema>;

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead?: Lead | null;
  onSuccess?: () => void;
}

export const LeadFormModal = ({ isOpen, onClose, lead, onSuccess }: LeadFormModalProps) => {
  const { addLead, updateLead } = useLeadsStore();
  const { getErrorMessage } = useApiError();
  const isEditing = !!lead;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { status: 'New' },
  });

  useEffect(() => {
    if (lead) {
      reset({
        name: lead.name,
        email: lead.email,
        status: lead.status,
        source: lead.source,
      });
    } else {
      reset({ name: '', email: '', status: 'New', source: undefined });
    }
  }, [lead, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      if (isEditing && lead) {
        const res = await leadsApi.update(lead._id, data as UpdateLeadInput);
        if (res.data) {
          updateLead(lead._id, res.data);
          toast.success('Lead updated');
        }
      } else {
        const res = await leadsApi.create(data as CreateLeadInput);
        if (res.data) {
          addLead(res.data);
          toast.success('Lead created');
        }
      }
      onClose();
      onSuccess?.();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const statusOptions = LEAD_STATUSES.map((s) => ({ value: s, label: s }));
  const sourceOptions = LEAD_SOURCES.map((s) => ({ value: s, label: s }));

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditing ? 'Edit Lead' : 'Add New Lead'}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          {...register('name')}
          id="lead-name"
          label="Full Name"
          placeholder="John Smith"
          error={errors.name?.message}
        />
        <Input
          {...register('email')}
          id="lead-email"
          label="Email Address"
          type="email"
          placeholder="john@company.com"
          error={errors.email?.message}
        />
        <div className="grid grid-cols-2 gap-4">
          <Select
            {...register('source')}
            id="lead-source"
            label="Source"
            options={sourceOptions}
            placeholder="Select source"
            error={errors.source?.message}
          />
          <Select
            {...register('status')}
            id="lead-status"
            label="Status"
            options={statusOptions}
            error={errors.status?.message}
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" loading={isSubmitting}>
            {isEditing ? 'Save changes' : 'Create lead'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
