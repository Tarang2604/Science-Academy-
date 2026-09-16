import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { ACADEMY_CONFIG } from '../../config/academy';
import { submitLead } from '../../services/api';
import { CheckCircle2, AlertCircle, Send } from 'lucide-react';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
  targetClass: z.string().min(1, 'Target class is required'),
  subject: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface QuickEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickEnquiryModal: React.FC<QuickEnquiryModalProps> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus('submitting');
    setErrorMessage('');
    try {
      await submitLead({
        name: data.name,
        phone: data.phone,
        targetClass: data.targetClass,
        subjects: data.subject || undefined,
        message: data.message || undefined,
        type: 'ADMISSION',
      });
      setStatus('success');
      reset();
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(
        err.response?.data?.message || 'Unable to submit enquiry right now. Please call +91 78281 21320 directly.'
      );
    }
  };

  const handleClose = () => {
    setStatus('idle');
    setErrorMessage('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Enquire with Science Academy">
      {status === 'success' ? (
        <div className="flex flex-col items-center justify-center text-center py-6 gap-3">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-xl font-bold text-navy-900">Enquiry Received!</h4>
          <p className="text-sm text-slate-600 max-w-sm">
            Thank you for connecting with Science Academy, Ratlam. Our academic team will contact you shortly on your provided phone number.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-2 w-full">
            <a
              href={ACADEMY_CONFIG.verifiedContact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex justify-center items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-sm font-semibold transition-colors"
            >
              Chat on WhatsApp Directly
            </a>
            <Button variant="outline" onClick={handleClose} className="w-full">
              Close Window
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {status === 'error' && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Aarav Sharma"
              {...register('name')}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-royal-600"
            />
            {errors.name && <p className="text-xs text-rose-600 mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Mobile Number (10 Digits) *
            </label>
            <input
              type="tel"
              placeholder="e.g. 9826012345"
              {...register('phone')}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-royal-600"
            />
            {errors.phone && <p className="text-xs text-rose-600 mt-1">{errors.phone.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Target Class *
              </label>
              <select
                {...register('targetClass')}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-royal-600"
              >
                <option value="">Select Class</option>
                <option value="Class 11 Science">Class 11 Science</option>
                <option value="Class 12 Science">Class 12 Science</option>
                <option value="Class 11 Commerce">Class 11 Commerce</option>
                <option value="Class 12 Commerce">Class 12 Commerce</option>
                <option value="Target Batch">Target Batch</option>
              </select>
              {errors.targetClass && (
                <p className="text-xs text-rose-600 mt-1">{errors.targetClass.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Subject Focus
              </label>
              <select
                {...register('subject')}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-royal-600"
              >
                <option value="">All Subjects</option>
                {ACADEMY_CONFIG.subjects.map((s) => (
                  <option key={s.slug} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Additional Question / Message (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="Tell us what you are looking for..."
              {...register('message')}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-royal-600"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={status === 'submitting'}
            icon={<Send className="w-4 h-4" />}
            className="w-full mt-2"
          >
            {status === 'submitting' ? 'Submitting Enquiry...' : 'Submit Admission Enquiry'}
          </Button>
        </form>
      )}
    </Modal>
  );
};
