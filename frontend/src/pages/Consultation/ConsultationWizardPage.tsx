import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2, ArrowRight, ArrowLeft, Send, Sparkles, AlertCircle, MessageCircle } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { SEOHead } from '../../components/ui/SEOHead';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ACADEMY_CONFIG } from '../../config/academy';
import { submitConsultation } from '../../services/api';

const wizardSchema = z.object({
  persona: z.enum(['STUDENT', 'PARENT']),
  targetClass: z.string().min(1, 'Please select your target class'),
  primaryGoal: z.string().min(1, 'Please select your primary goal'),
  name: z.string().min(2, 'Full name is required'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
});

type WizardFormData = z.infer<typeof wizardSchema>;

export const ConsultationWizardPage: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<WizardFormData>({
    resolver: zodResolver(wizardSchema),
    defaultValues: {
      persona: 'STUDENT',
      targetClass: '',
      primaryGoal: '',
      name: '',
      phone: '',
    },
  });

  const selectedPersona = watch('persona');
  const selectedClass = watch('targetClass');
  const selectedGoal = watch('primaryGoal');

  const onSubmit = async (data: WizardFormData) => {
    setStatus('submitting');
    setErrorMessage('');
    try {
      await submitConsultation({
        persona: data.persona,
        targetClass: data.targetClass,
        primaryGoal: data.primaryGoal,
        name: data.name,
        phone: data.phone,
      });
      setStatus('success');
      setStep(5);
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(
        err.response?.data?.message || 'Unable to submit consultation request. Please call +91 78281 21320 directly.'
      );
    }
  };

  return (
    <div className="flex flex-col gap-12 pb-16">
      <SEOHead
        title="1-on-1 Academic Consultation Wizard — Science Academy Ratlam"
        description="Book a 1-on-1 personalized academic guidance session with faculty mentors at Science Academy Ratlam."
      />

      <PageHeader
        category="Interactive Mentorship Wizard"
        title="1-on-1 Academic Consultation"
        subtitle="Complete our 4-step micro-interaction wizard to book a personalized guidance session with faculty advisors."
        badgeVariant="gold"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Consultation' }]}
      />

      <section className="px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <Card hoverEffect={false} className="p-6 sm:p-10 flex flex-col gap-8 shadow-xl border-slate-200/90">
            
            {/* Progress Stepper Bar */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-6">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-colors ${
                      step === s
                        ? 'bg-royal-600 text-white shadow-md'
                        : step > s
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
                  </div>
                  <span className="hidden sm:inline text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {s === 1 ? 'Persona' : s === 2 ? 'Grade' : s === 3 ? 'Goal' : 'Contact'}
                  </span>
                </div>
              ))}
            </div>

            {/* Error Notice */}
            {status === 'error' && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Wizard Steps */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                
                {/* Step 1: Persona */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col gap-6"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-mono uppercase tracking-widest text-royal-600 font-semibold">Step 01 / 04</span>
                      <h3 className="text-2xl font-bold text-navy-900">Are you a Student or a Parent?</h3>
                      <p className="text-xs text-slate-600">This helps us tailor our guidance consultation appropriately.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div
                        onClick={() => setValue('persona', 'STUDENT')}
                        className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex flex-col gap-2 ${
                          selectedPersona === 'STUDENT'
                            ? 'border-royal-600 bg-royal-50/50 shadow-sm'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <span className="text-lg font-bold text-navy-900">Student</span>
                        <p className="text-xs text-slate-600">I am preparing for Class 11, Class 12, or competitive board exams.</p>
                      </div>

                      <div
                        onClick={() => setValue('persona', 'PARENT')}
                        className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex flex-col gap-2 ${
                          selectedPersona === 'PARENT'
                            ? 'border-royal-600 bg-royal-50/50 shadow-sm'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <span className="text-lg font-bold text-navy-900">Parent</span>
                        <p className="text-xs text-slate-600">I am seeking academic coaching guidance for my child.</p>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button variant="primary" size="md" onClick={() => setStep(2)} icon={<ArrowRight className="w-4 h-4" />}>
                        Next Step
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Target Grade */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col gap-6"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-mono uppercase tracking-widest text-royal-600 font-semibold">Step 02 / 04</span>
                      <h3 className="text-2xl font-bold text-navy-900">Select Target Class / Batch</h3>
                      <p className="text-xs text-slate-600">Which academic batch are you interested in?</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {[
                        'Class 11 Science',
                        'Class 12 Science',
                        'Class 11 Commerce',
                        'Class 12 Commerce',
                        'Target Batch',
                      ].map((cls) => (
                        <div
                          key={cls}
                          onClick={() => setValue('targetClass', cls)}
                          className={`p-4 rounded-xl border-2 cursor-pointer text-sm font-semibold transition-all ${
                            selectedClass === cls
                              ? 'border-royal-600 bg-royal-50/50 text-navy-900'
                              : 'border-slate-200 hover:border-slate-300 text-slate-700'
                          }`}
                        >
                          {cls}
                        </div>
                      ))}
                    </div>
                    {errors.targetClass && <p className="text-xs text-rose-600">{errors.targetClass.message}</p>}

                    <div className="flex justify-between pt-4">
                      <Button variant="outline" size="md" onClick={() => setStep(1)} icon={<ArrowLeft className="w-4 h-4" />}>
                        Back
                      </Button>
                      <Button
                        variant="primary"
                        size="md"
                        onClick={() => selectedClass && setStep(3)}
                        disabled={!selectedClass}
                        icon={<ArrowRight className="w-4 h-4" />}
                      >
                        Next Step
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Primary Goal */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col gap-6"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-mono uppercase tracking-widest text-royal-600 font-semibold">Step 03 / 04</span>
                      <h3 className="text-2xl font-bold text-navy-900">What is your primary academic goal?</h3>
                      <p className="text-xs text-slate-600">Select the main area where you want mentorship.</p>
                    </div>

                    <div className="flex flex-col gap-3 pt-2">
                      {[
                        'Building Deep Concept Clarity',
                        'Board Exam Preparation Strategy',
                        'Personal 1:1 Doubt Solving',
                        'New Admission & Batch Timing Query',
                      ].map((goal) => (
                        <div
                          key={goal}
                          onClick={() => setValue('primaryGoal', goal)}
                          className={`p-4 rounded-xl border-2 cursor-pointer text-sm font-semibold transition-all ${
                            selectedGoal === goal
                              ? 'border-royal-600 bg-royal-50/50 text-navy-900'
                              : 'border-slate-200 hover:border-slate-300 text-slate-700'
                          }`}
                        >
                          {goal}
                        </div>
                      ))}
                    </div>
                    {errors.primaryGoal && <p className="text-xs text-rose-600">{errors.primaryGoal.message}</p>}

                    <div className="flex justify-between pt-4">
                      <Button variant="outline" size="md" onClick={() => setStep(2)} icon={<ArrowLeft className="w-4 h-4" />}>
                        Back
                      </Button>
                      <Button
                        variant="primary"
                        size="md"
                        onClick={() => selectedGoal && setStep(4)}
                        disabled={!selectedGoal}
                        icon={<ArrowRight className="w-4 h-4" />}
                      >
                        Next Step
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Contact Details & Submit */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col gap-6"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-mono uppercase tracking-widest text-royal-600 font-semibold">Step 04 / 04</span>
                      <h3 className="text-2xl font-bold text-navy-900">Enter Your Contact Information</h3>
                      <p className="text-xs text-slate-600">Our faculty team will call you to confirm your consultation schedule.</p>
                    </div>

                    <div className="flex flex-col gap-4 pt-2">
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

                    <div className="flex justify-between pt-4">
                      <Button variant="outline" size="md" onClick={() => setStep(3)} icon={<ArrowLeft className="w-4 h-4" />}>
                        Back
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={status === 'submitting'}
                        icon={<Send className="w-4 h-4" />}
                        className="font-bold"
                      >
                        {status === 'submitting' ? 'Submitting Request...' : 'Confirm Consultation Booking'}
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 5: Success Confirmation */}
                {step === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-6 gap-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <h3 className="text-2xl font-bold text-navy-900">Consultation Request Confirmed!</h3>
                    
                    <p className="text-sm text-slate-600 max-w-md leading-relaxed">
                      Thank you for booking a 1-on-1 Academic Guidance session with Science Academy Ratlam. Our team will contact you shortly on your provided phone number.
                    </p>

                    <div className="pt-4 flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                      <a
                        href={ACADEMY_CONFIG.verifiedContact.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex justify-center items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-semibold transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Chat on WhatsApp Directly
                      </a>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </form>

          </Card>
        </div>
      </section>
    </div>
  );
};
