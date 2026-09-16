import React, { useState } from 'react';
import { Calendar, Clock, Filter, ArrowRight, ShieldCheck } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ACADEMY_CONFIG } from '../../config/academy';

interface BatchFinderSectionProps {
  onOpenEnquiryModal: () => void;
}

export const BatchFinderSection: React.FC<BatchFinderSectionProps> = ({ onOpenEnquiryModal }) => {
  const [selectedClass, setSelectedClass] = useState<string>('ALL');

  const batchList = [
    {
      id: '1',
      classGroup: 'Class 11 Science',
      subjects: 'Physics, Chemistry, Mathematics & Biology',
      timing: 'Morning Batch (08:00 AM - 11:30 AM)',
      status: 'OPEN',
      statusColor: 'emerald',
    },
    {
      id: '2',
      classGroup: 'Class 12 Science',
      subjects: 'Physics, Chemistry, Mathematics & Biology',
      timing: 'Evening Batch (03:30 PM - 07:00 PM)',
      status: 'FILLING_FAST',
      statusColor: 'amber',
    },
    {
      id: '3',
      classGroup: 'Class 11 & 12 Commerce',
      subjects: 'Accountancy, Business Studies & Economics',
      timing: 'Afternoon Batch (01:30 PM - 04:30 PM)',
      status: 'OPEN',
      statusColor: 'emerald',
    },
    {
      id: '4',
      classGroup: 'Informatics Practices',
      subjects: 'Python & SQL Databases',
      timing: 'Special Weekend Batch',
      status: 'OPEN',
      statusColor: 'emerald',
    },
  ];

  const filteredBatches =
    selectedClass === 'ALL'
      ? batchList
      : batchList.filter((b) => b.classGroup.toLowerCase().includes(selectedClass.toLowerCase()));

  return (
    <section className="px-6 md:px-12 py-16 bg-slate-50/70 border-y border-slate-200/60">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-2 max-w-xl">
            <Badge variant="emerald" icon={<Calendar className="w-3.5 h-3.5" />}>
              Batch Schedules
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight">
              Interactive Batch Finder
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Find upcoming batch timings for Class 11, Class 12, and Target batches at Science Academy Ratlam.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-white p-1 rounded-full border border-slate-200">
            {['ALL', 'Class 11', 'Class 12', 'Commerce'].map((cls) => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-colors ${
                  selectedClass === cls
                    ? 'bg-navy-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-navy-900'
                }`}
              >
                {cls}
              </button>
            ))}
          </div>
        </div>

        {/* Batch List Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBatches.map((batch) => (
            <Card key={batch.id} className="flex flex-col justify-between gap-4 border-slate-200/90">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <Badge variant="royal">{batch.classGroup}</Badge>
                  <Badge variant={batch.statusColor as any}>
                    {batch.status === 'FILLING_FAST' ? 'Filling Fast' : 'Seats Open'}
                  </Badge>
                </div>

                <h3 className="text-lg font-bold text-navy-900">{batch.subjects}</h3>

                <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <Clock className="w-4 h-4 text-royal-600 shrink-0" />
                  <span className="font-medium">{batch.timing}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Verified Schedule
                </span>
                <Button variant="primary" size="sm" onClick={onOpenEnquiryModal} icon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Reserve Seat
                </Button>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};
