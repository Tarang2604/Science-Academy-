import React, { useEffect, useState } from 'react';
import { Search, Filter, RefreshCw, X, Check, Eye, CalendarCheck } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { SEOHead } from '../../components/ui/SEOHead';
import { getAdminConsultations, updateAdminLead } from '../../services/api';

interface ConsultationItem {
  id: string;
  type: string;
  status: string;
  name: string;
  phone: string;
  persona?: string;
  targetClass?: string;
  preferredTiming?: string;
  message?: string;
  notes?: string;
  createdAt: string;
}

export const AdminConsultationsPage: React.FC = () => {
  const [items, setItems] = useState<ConsultationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  // Modal State
  const [selectedItem, setSelectedItem] = useState<ConsultationItem | null>(null);
  const [editStatus, setEditStatus] = useState<string>('NEW');
  const [editNotes, setEditNotes] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const fetchConsultations = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await getAdminConsultations({
        search: search.trim(),
        status: statusFilter !== 'ALL' ? statusFilter : undefined,
        sort: sortOrder,
      });
      if (res.success && res.data) {
        setItems(res.data);
      } else {
        setError('Failed to load consultation bookings');
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error fetching consultations from server');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultations();
  }, [statusFilter, sortOrder]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchConsultations();
  };

  const handleOpenModal = (item: ConsultationItem) => {
    setSelectedItem(item);
    setEditStatus(item.status);
    setEditNotes(item.notes || '');
    setToastMsg(null);
  };

  const handleSaveItem = async () => {
    if (!selectedItem) return;
    setIsUpdating(true);
    setToastMsg(null);
    try {
      const res = await updateAdminLead(selectedItem.id, {
        status: editStatus,
        notes: editNotes,
      });
      if (res.success && res.data) {
        setItems((prev) =>
          prev.map((i) => (i.id === selectedItem.id ? { ...i, status: editStatus, notes: editNotes } : i))
        );
        setSelectedItem((prev) => (prev ? { ...prev, status: editStatus, notes: editNotes } : null));
        setToastMsg('Consultation request saved successfully!');
      }
    } catch {
      setToastMsg('Failed to update consultation status');
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'NEW':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">NEW</span>;
      case 'CONTACTED':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">CONTACTED</span>;
      case 'SCHEDULED':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-sky-800 border border-sky-200">SCHEDULED</span>;
      case 'CONVERTED':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-yellow-50 text-yellow-800 border border-yellow-200">CONVERTED</span>;
      case 'CLOSED':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">CLOSED</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">{status}</span>;
    }
  };

  return (
    <AdminLayout
      title="1-on-1 Consultation Requests"
      subtitle="Review mentorship applications, guidance goals, preferred contact times, and schedule counseling sessions."
    >
      <SEOHead title="Admin Consultation Requests — Science Academy Ratlam" />

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
        
        {/* Search Input Form */}
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search applicant name, phone, or goal..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors shrink-0 shadow-xs"
          >
            Search
          </button>
        </form>

        {/* Filter Controls Bar */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Status Select Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-slate-900"
            >
              <option value="ALL">All Statuses</option>
              <option value="NEW">New</option>
              <option value="CONTACTED">Contacted</option>
              <option value="SCHEDULED">Scheduled</option>
              <option value="CONVERTED">Converted</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>

          {/* Sort Order Select */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as any)}
            className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-slate-900"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>

          <button
            onClick={fetchConsultations}
            disabled={isLoading}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs transition-colors border border-slate-200"
            title="Refresh Consultations"
          >
            <RefreshCw className={`w-4 h-4 text-slate-700 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

      </div>

      {/* Error Alert View */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium mt-6 flex items-center justify-between">
          <span>{error}</span>
          <button onClick={fetchConsultations} className="underline font-bold text-rose-900">Retry</button>
        </div>
      )}

      {/* Consultations Data Table Box */}
      <div className="mt-6 rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="py-16 text-center text-xs text-slate-400 animate-pulse font-medium">Loading consultation bookings...</div>
        ) : items.length === 0 ? (
          <div className="py-16 text-center flex flex-col items-center gap-3">
            <CalendarCheck className="w-8 h-8 text-slate-400" />
            <span className="text-slate-700 text-sm font-bold">No consultation bookings found</span>
            <span className="text-slate-500 text-xs">Try adjusting search filters.</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100/90 border-b border-slate-200/90 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-3.5 px-4">Applicant Name</th>
                  <th className="py-3.5 px-4">Contact Phone</th>
                  <th className="py-3.5 px-4">Persona & Class</th>
                  <th className="py-3.5 px-4">Primary Goal</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Date Booked</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900">{item.name}</span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{item.phone}</td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">
                      {item.targetClass || 'General'}
                      <span className="text-[10px] text-slate-500 block font-normal">({item.persona || 'STUDENT'})</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium max-w-xs truncate">
                      {item.message || 'N/A'}
                    </td>
                    <td className="py-3.5 px-4">{getStatusBadge(item.status)}</td>
                    <td className="py-3.5 px-4 text-slate-600 text-[11px]">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleOpenModal(item)}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-[11px] transition-colors inline-flex items-center gap-1.5 shadow-xs"
                      >
                        <Eye className="w-3.5 h-3.5 text-amber-400" />
                        <span>Manage</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Consultation Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white border border-slate-200/90 rounded-2xl max-w-xl w-full p-6 sm:p-8 flex flex-col gap-6 relative shadow-2xl">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold tracking-wider uppercase text-amber-600">1-on-1 Consultation Request</span>
                <h3 className="text-lg font-extrabold text-slate-900">{selectedItem.name}</h3>
              </div>
              <button onClick={() => setSelectedItem(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Toast Feedback Banner */}
            {toastMsg && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{toastMsg}</span>
              </div>
            )}

            {/* Consultation Details Grid */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
              <div>
                <span className="text-slate-500 uppercase text-[10px] font-bold">Contact Phone</span>
                <p className="text-slate-900 font-bold">{selectedItem.phone}</p>
              </div>
              <div>
                <span className="text-slate-500 uppercase text-[10px] font-bold">Persona</span>
                <p className="text-slate-800 font-medium">{selectedItem.persona || 'STUDENT'}</p>
              </div>
              <div>
                <span className="text-slate-500 uppercase text-[10px] font-bold">Target Class / Batch</span>
                <p className="text-slate-800 font-medium">{selectedItem.targetClass || 'General'}</p>
              </div>
              <div>
                <span className="text-slate-500 uppercase text-[10px] font-bold">Preferred Timing</span>
                <p className="text-slate-800 font-medium">{selectedItem.preferredTiming || 'Flexible / Morning'}</p>
              </div>
              {selectedItem.message && (
                <div className="col-span-2 pt-2 border-t border-slate-200">
                  <span className="text-slate-500 uppercase text-[10px] font-bold">Primary Goal / Challenges</span>
                  <p className="text-slate-900 font-semibold mt-0.5">{selectedItem.message}</p>
                </div>
              )}
            </div>

            {/* Status Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">Update Consultation Status</label>
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:bg-white focus:border-slate-900"
              >
                <option value="NEW">NEW — Awaiting counseling callback</option>
                <option value="CONTACTED">CONTACTED — Initial phone call complete</option>
                <option value="SCHEDULED">SCHEDULED — Counseling session scheduled</option>
                <option value="CONVERTED">CONVERTED — Student enrolled in batch</option>
                <option value="CLOSED">CLOSED — Consultation closed</option>
              </select>
            </div>

            {/* Admin Notes */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">Internal Counseling Notes</label>
              <textarea
                rows={3}
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                placeholder="Add notes regarding academic counselor assignment, recommended subjects, or batch timing..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-900"
              />
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold border border-slate-200"
              >
                Close
              </button>
              <button
                onClick={handleSaveItem}
                disabled={isUpdating}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors disabled:opacity-50 shadow-sm"
              >
                {isUpdating ? 'Saving...' : 'Save Consultation Status'}
              </button>
            </div>

          </div>
        </div>
      )}
    </AdminLayout>
  );
};

