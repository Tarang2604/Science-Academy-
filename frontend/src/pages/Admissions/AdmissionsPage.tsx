import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle2, AlertCircle, Phone, MessageCircle, ShieldCheck } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { SEOHead } from '../../components/ui/SEOHead';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ACADEMY_CONFIG } from '../../config/academy';
import { submitLead } from '../../services/api';

const schema = z.object({
  name: z.string().min(2, 'Full name must be at least 2 characters'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  targetClass: z.string().min(1, 'Target class selection is required'),
  subject: z.string().optional(),
  preferredTiming: z.string().optional(),
  message: z.string().optional(),
});

type AdmissionFormData = z.infer<typeof schema>;

export const AdmissionsPage: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdmissionFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: AdmissionFormData) => {
    setStatus('submitting');
    setErrorMessage('');
    try {
      await submitLead({
        name: data.name,
        phone: data.phone,
        email: data.email || undefined,
        targetClass: data.targetClass,
        subjects: data.subject || undefined,
        preferredTiming: data.preferredTiming || undefined,
        message: data.message || undefined,
        type: 'ADMISSION',
      });
      setStatus('success');
      reset();
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(
        err.response?.data?.message || 'Unable to submit admission enquiry. Please call +91 78281 21320 directly.'
      );
    }
  };

  return (
    <div className="flex flex-col gap-12 pb-16">
      <SEOHead
        title="Admissions & Course Enrolment — Science Academy Ratlam"
        description="Enquire for Class 11, Class 12, and Target batch admissions at Science Academy Ratlam across Physics, Chem, Math, Bio, Commerce, and IP."
      />

      <PageHeader
        category="Admission Guidance"
        title="Course Enrolment & Batch Registration"
        subtitle="Submit an admission query or connect with our academic team to reserve your batch seat at Science Academy Ratlam."
        badgeVariant="royal"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Admissions' }]}
      />

      <section className="px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Form Column */}
          <div className="lg:col-span-7">
            <Card hoverEffect={false} className="p-6 sm:p-8 flex flex-col gap-6">
              
              <div className="flex flex-col gap-1 border-b border-slate-100 pb-4">
                <h2 className="text-2xl font-bold text-navy-900">Admission Enquiry Form</h2>
                <p className="text-xs text-slate-600">Enter your contact details and course preference to receive batch schedule details.</p>
              </div>

              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center text-center py-8 gap-4 bg-emerald-50/50 rounded-2xl border border-emerald-200 p-6">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-navy-900">Admission Enquiry Submitted!</h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md">
                    Thank you for contacting Science Academy, Ratlam. Our academic counseling team will contact you shortly on your registered phone number.
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                    <a
                      href={ACADEMY_CONFIG.verifiedContact.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex justify-center items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-semibold transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Chat on WhatsApp
                    </a>
                    <Button variant="outline" size="md" onClick={() => setStatus('idle')} className="w-full">
                      Submit Another Query
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                  {status === 'error' && (
                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                        Student Full Name *
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
                        10-Digit Mobile Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. 9826012345"
                        {...register('phone')}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-royal-600"
                      />
                      {errors.phone && <p className="text-xs text-rose-600 mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                        Target Class / Batch *
                      </label>
                      <select
                        {...register('targetClass')}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-royal-600"
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
                        Primary Subject Focus
                      </label>
                      <select
                        {...register('subject')}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-royal-600"
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
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. student@email.com"
                      {...register('email')}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-royal-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Additional Message or Specific Questions
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your target goals or preferred batch timing..."
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
                    className="w-full mt-2 font-bold"
                  >
                    {status === 'submitting' ? 'Submitting Enquiry...' : 'Submit Admission Enquiry'}
                  </Button>
                </form>
              )}
            </Card>
          </div>

          {/* Right Sidebar Information */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Card hoverEffect={false} className="bg-navy-900 text-white border-navy-800 p-6 flex flex-col gap-5">
              <div className="flex items-center justify-between border-b border-navy-700 pb-3">
                <span className="text-xs uppercase tracking-widest text-slate-400 font-mono">DIRECT CONTACT</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <div className="flex flex-col gap-2">
                <h4 className="text-xl font-bold text-white">Prefer to Call Directly?</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  You can contact our academic admissions office directly on our verified institute phone.
                </p>
              </div>

              <a
                href={`tel:${ACADEMY_CONFIG.verifiedContact.phoneRaw}`}
                className="flex items-center gap-3 p-4 rounded-2xl bg-navy-800 border border-navy-700 hover:border-royal-500 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-royal-600 text-white flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 font-medium">Verified Phone</span>
                  <span className="text-lg font-bold text-white">{ACADEMY_CONFIG.verifiedContact.phoneDisplay}</span>
                </div>
              </a>

              <a
                href={ACADEMY_CONFIG.verifiedContact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 hover:bg-emerald-600/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-emerald-300 font-medium">WhatsApp Support</span>
                  <span className="text-sm font-bold text-white">Chat Directly on WhatsApp</span>
                </div>
              </a>

              <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verified Institute in Ratlam, MP</span>
              </div>
            </Card>
          </div>

        </div>
      </section>
    </div>
  );
};
