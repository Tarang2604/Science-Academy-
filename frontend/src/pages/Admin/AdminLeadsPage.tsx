import React, { useEffect, useState } from 'react';
import { Search, Filter, RefreshCw, X, Check, Eye } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { SEOHead } from '../../components/ui/SEOHead';
import { getAdminLeads, updateAdminLead } from '../../services/api';

interface LeadItem {
  id: string;
  type: string;
  status: string;
  name: string;
  phone: string;
  email?: string;
  targetClass?: string;
  subjects?: string;
  persona?: string;
  preferredTiming?: string;
  message?: string;
  notes?: string;
  createdAt: string;
}

export const AdminLeadsPage: React.FC = () => {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  // Modal State
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [editStatus, setEditStatus] = useState<string>('NEW');
  const [editNotes, setEditNotes] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const fetchLeads = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await getAdminLeads({
        search: search.trim(),
        status: statusFilter !== 'ALL' ? statusFilter : undefined,
        type: typeFilter !== 'ALL' ? typeFilter : undefined,
        sort: sortOrder,
      });
      if (res.success && res.data) {
        setLeads(res.data);
      } else {
        setError('Failed to load enquiries');
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error fetching lead entries from server');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [statusFilter, typeFilter, sortOrder]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLeads();
  };

  const handleOpenLeadModal = (lead: LeadItem) => {
    setSelectedLead(lead);
    setEditStatus(lead.status);
    setEditNotes(lead.notes || '');
    setToastMsg(null);
  };

  const handleSaveLead = async () => {
    if (!selectedLead) return;
    setIsUpdating(true);
    setToastMsg(null);
    try {
      const res = await updateAdminLead(selectedLead.id, {
        status: editStatus,
        notes: editNotes,
      });
      if (res.success && res.data) {
        setLeads((prev) =>
          prev.map((item) => (item.id === selectedLead.id ? { ...item, status: editStatus, notes: editNotes } : item))
        );
        setSelectedLead((prev) => (prev ? { ...prev, status: editStatus, notes: editNotes } : null));
        setToastMsg('Lead status and notes saved successfully!');
      }
    } catch {
      setToastMsg('Failed to update lead');
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
      title="Enquiries & Leads Management"
      subtitle="Review, filter, update status, and manage administrative notes for student enquiries."
    >
      <SEOHead title="Admin Enquiries & Leads — Science Academy Ratlam" />

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
              placeholder="Search name, phone, email, or class..."
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

          {/* Type Select Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold">
            <span>Type:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-slate-900"
            >
              <option value="ALL">All Types</option>
              <option value="ADMISSION">Admission</option>
              <option value="DEMO">Demo</option>
              <option value="CONTACT">Contact</option>
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
            onClick={fetchLeads}
            disabled={isLoading}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs transition-colors border border-slate-200"
            title="Refresh Leads"
          >
            <RefreshCw className={`w-4 h-4 text-slate-700 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

      </div>

      {/* Error Alert View */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium mt-6 flex items-center justify-between">
          <span>{error}</span>
          <button onClick={fetchLeads} className="underline font-bold text-rose-900">Retry</button>
        </div>
      )}

      {/* Leads Data Table Box */}
      <div className="mt-6 rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="py-16 text-center text-xs text-slate-400 animate-pulse font-medium">Loading leads from database...</div>
        ) : leads.length === 0 ? (
          <div className="py-16 text-center flex flex-col items-center gap-3">
            <span className="text-slate-700 text-sm font-bold">No enquiries found</span>
            <span className="text-slate-500 text-xs">Try adjusting your search terms or filter options.</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100/90 border-b border-slate-200/90 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-3.5 px-4">Student / Parent</th>
                  <th className="py-3.5 px-4">Contact Phone</th>
                  <th className="py-3.5 px-4">Class / Target</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Date Submitted</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900">{lead.name}</span>
                        {lead.email && <span className="text-[11px] text-slate-500">{lead.email}</span>}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{lead.phone}</td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">
                      {lead.targetClass || 'General'}
                      {lead.persona && <span className="text-[10px] text-slate-500 block">({lead.persona})</span>}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-semibold">
                        {lead.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">{getStatusBadge(lead.status)}</td>
                    <td className="py-3.5 px-4 text-slate-600 text-[11px]">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleOpenLeadModal(lead)}
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

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white border border-slate-200/90 rounded-2xl max-w-xl w-full p-6 sm:p-8 flex flex-col gap-6 relative shadow-2xl">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold tracking-wider uppercase text-amber-600">Enquiry Management</span>
                <h3 className="text-lg font-extrabold text-slate-900">{selectedLead.name}</h3>
              </div>
              <button onClick={() => setSelectedLead(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Toast Feedback */}
            {toastMsg && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{toastMsg}</span>
              </div>
            )}

            {/* Readonly Lead Info Grid */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
              <div>
                <span className="text-slate-500 uppercase text-[10px] font-bold">Contact Phone</span>
                <p className="text-slate-900 font-bold">{selectedLead.phone}</p>
              </div>
              <div>
                <span className="text-slate-500 uppercase text-[10px] font-bold">Email Address</span>
                <p className="text-slate-800 font-medium">{selectedLead.email || 'N/A'}</p>
              </div>
              <div>
                <span className="text-slate-500 uppercase text-[10px] font-bold">Target Class / Batch</span>
                <p className="text-slate-800 font-medium">{selectedLead.targetClass || 'General'}</p>
              </div>
              <div>
                <span className="text-slate-500 uppercase text-[10px] font-bold">Persona</span>
                <p className="text-slate-800 font-medium">{selectedLead.persona || 'N/A'}</p>
              </div>
              {selectedLead.message && (
                <div className="col-span-2 pt-2 border-t border-slate-200">
                  <span className="text-slate-500 uppercase text-[10px] font-bold">Student Message</span>
                  <p className="text-slate-700 italic mt-0.5">{selectedLead.message}</p>
                </div>
              )}
            </div>

            {/* Editable Status */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">Update Status</label>
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:bg-white focus:border-slate-900"
              >
                <option value="NEW">NEW — Awaiting contact</option>
                <option value="CONTACTED">CONTACTED — Spoken with guardian</option>
                <option value="SCHEDULED">SCHEDULED — Counseling session booked</option>
                <option value="CONVERTED">CONVERTED — Student enrolled</option>
                <option value="CLOSED">CLOSED — Closed/Not interested</option>
              </select>
            </div>

            {/* Editable Notes */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">Internal Admin Notes</label>
              <textarea
                rows={3}
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                placeholder="Add private office notes regarding follow-ups, calls, or student preferences..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-900"
              />
            </div>

            {/* Modal Action Buttons */}
            <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold border border-slate-200"
              >
                Close
              </button>
              <button
                onClick={handleSaveLead}
                disabled={isUpdating}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors disabled:opacity-50 shadow-sm"
              >
                {isUpdating ? 'Saving...' : 'Save Lead Changes'}
              </button>
            </div>

          </div>
        </div>
      )}
    </AdminLayout>
  );
};

