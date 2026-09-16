import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, CalendarCheck, ArrowRight, ShieldCheck, RefreshCw, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { SEOHead } from '../../components/ui/SEOHead';
import { getAdminDashboardMetrics } from '../../services/api';

interface DashboardData {
  metrics: {
    totalLeads: number;
    newLeads: number;
    totalConsultations: number;
    newConsultations: number;
  };
  recentLeads: Array<{
    id: string;
    name: string;
    phone: string;
    targetClass?: string;
    status: string;
    createdAt: string;
  }>;
  recentConsultations: Array<{
    id: string;
    name: string;
    phone: string;
    persona?: string;
    targetClass?: string;
    status: string;
    createdAt: string;
  }>;
}

export const AdminDashboardPage: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await getAdminDashboardMetrics();
      if (res.success && res.data) {
        setData(res.data);
      } else {
        setError('Failed to load dashboard metrics');
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error connecting to database metrics');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

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
      title="Overview Dashboard"
      subtitle="Real-time admissions leads, student enquiries, and 1-on-1 consultation requests."
    >
      <SEOHead title="Admin Overview Dashboard — Science Academy Ratlam" />

      {/* Database Sync Toolbar Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200/90 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-slate-700">Database Metrics Live Sync &bull; PostgreSQL Connected</span>
        </div>
        <button
          onClick={fetchMetrics}
          disabled={isLoading}
          className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-2 shadow-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Error Alert Box */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center justify-between gap-4 mt-6">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={fetchMetrics} className="underline font-bold text-rose-900">Retry</button>
        </div>
      )}

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
        
        {/* Total Leads Card */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 border-t-4 border-t-slate-800 shadow-sm flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Enquiries</span>
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {isLoading ? <span className="animate-pulse text-slate-300">--</span> : data?.metrics.totalLeads ?? 0}
          </div>
          <span className="text-[11px] text-slate-500 font-medium">General admission & contact leads</span>
        </div>

        {/* New Leads Card */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 border-t-4 border-t-amber-500 shadow-sm flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">New Enquiries</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-amber-800 tracking-tight">
            {isLoading ? <span className="animate-pulse text-slate-300">--</span> : data?.metrics.newLeads ?? 0}
          </div>
          <span className="text-[11px] text-slate-500 font-medium">Awaiting initial phone contact</span>
        </div>

        {/* Total Consultations Card */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 border-t-4 border-t-sky-600 shadow-sm flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Consultations</span>
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {isLoading ? <span className="animate-pulse text-slate-300">--</span> : data?.metrics.totalConsultations ?? 0}
          </div>
          <span className="text-[11px] text-slate-500 font-medium">1-on-1 mentorship bookings</span>
        </div>

        {/* Pending Bookings Card */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 border-t-4 border-t-emerald-600 shadow-sm flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Pending Bookings</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-emerald-800 tracking-tight">
            {isLoading ? <span className="animate-pulse text-slate-300">--</span> : data?.metrics.newConsultations ?? 0}
          </div>
          <span className="text-[11px] text-slate-500 font-medium">Action required by administration</span>
        </div>

      </div>

      {/* Quick Activity Lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        
        {/* Recent Enquiries Box */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col gap-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Recent Admission Enquiries</h3>
            <Link
              to="/admin/leads"
              className="text-xs font-bold text-slate-700 hover:text-slate-900 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-500" />
            </Link>
          </div>

          {isLoading ? (
            <div className="py-8 text-center text-xs text-slate-400 animate-pulse">Loading recent leads...</div>
          ) : !data?.recentLeads || data.recentLeads.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500 font-medium">No admission enquiries in database yet.</div>
          ) : (
            <div className="flex flex-col gap-3">
              {data.recentLeads.map((lead) => (
                <div key={lead.id} className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 flex items-center justify-between gap-4">
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-slate-900 truncate">{lead.name}</span>
                    <span className="text-[11px] text-slate-500 font-medium">{lead.phone} &bull; {lead.targetClass || 'General'}</span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {getStatusBadge(lead.status)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Consultations Box */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col gap-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Recent 1-on-1 Consultations</h3>
            <Link
              to="/admin/consultations"
              className="text-xs font-bold text-slate-700 hover:text-slate-900 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-500" />
            </Link>
          </div>

          {isLoading ? (
            <div className="py-8 text-center text-xs text-slate-400 animate-pulse">Loading recent consultations...</div>
          ) : !data?.recentConsultations || data.recentConsultations.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500 font-medium">No consultation bookings in database yet.</div>
          ) : (
            <div className="flex flex-col gap-3">
              {data.recentConsultations.map((item) => (
                <div key={item.id} className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 flex items-center justify-between gap-4">
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-slate-900 truncate">{item.name}</span>
                    <span className="text-[11px] text-slate-500 font-medium">{item.phone} &bull; {item.persona || 'STUDENT'}</span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {getStatusBadge(item.status)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </AdminLayout>
  );
};

