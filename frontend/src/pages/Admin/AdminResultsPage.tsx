import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { SEOHead } from '../../components/ui/SEOHead';
import { getAdminResults, updateAdminResult } from '../../services/api';
import { Search, CheckCircle2, AlertCircle, Eye, EyeOff, FileImage, Sparkles } from 'lucide-react';

interface TopperItem {
  id: string;
  slug: string;
  studentName: string;
  examName: string;
  year: number;
  score: string;
  subject?: string;
  photoUrl?: string;
  story?: string;
  isVerified: boolean;
  status: string;
  createdAt: string;
}

export const AdminResultsPage: React.FC = () => {
  const [results, setResults] = useState<TopperItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedResult, setSelectedResult] = useState<TopperItem | null>(null);

  const fetchResults = async () => {
    setIsLoading(true);
    try {
      const res = await getAdminResults({
        search: searchQuery || undefined,
        status: statusFilter || undefined,
      });
      if (res.success && res.data) {
        setResults(res.data);
      }
    } catch (err) {
      console.error('Error fetching admin results:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [searchQuery, statusFilter]);

  const togglePublication = async (topper: TopperItem) => {
    const newStatus = topper.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    try {
      const res = await updateAdminResult(topper.id, {
        status: newStatus,
        isVerified: newStatus === 'PUBLISHED' ? true : topper.isVerified,
      });
      if (res.success) {
        fetchResults();
        if (selectedResult?.id === topper.id) {
          setSelectedResult(res.data);
        }
      }
    } catch (err) {
      console.error('Error updating result status:', err);
    }
  };

  const toggleVerification = async (topper: TopperItem) => {
    try {
      const res = await updateAdminResult(topper.id, {
        isVerified: !topper.isVerified,
      });
      if (res.success) {
        fetchResults();
        if (selectedResult?.id === topper.id) {
          setSelectedResult(res.data);
        }
      }
    } catch (err) {
      console.error('Error updating verification status:', err);
    }
  };

  return (
    <AdminLayout
      title="Results & Toppers CMS"
      subtitle="Manage, review, publish, and verify academic result posters and student achievements."
    >
      <SEOHead title="Results CMS — Admin Control Center" />

      {/* Toolbar & Filters */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200/90 shadow-sm">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by student name, exam, or subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-slate-400"
          />
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-semibold focus:outline-hidden"
          >
            <option value="">All Statuses</option>
            <option value="DRAFT">Draft / Unverified</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-xs font-semibold text-slate-500">Loading result records...</div>
        ) : results.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500 font-medium">
            No result records found matching your filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="px-6 py-3.5">Poster & Record</th>
                  <th className="px-6 py-3.5">Exam / Stream</th>
                  <th className="px-6 py-3.5">Year</th>
                  <th className="px-6 py-3.5">Score / Details</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {results.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-14 bg-slate-100 rounded-lg overflow-hidden shrink-0 border border-slate-200 flex items-center justify-center">
                          {item.photoUrl ? (
                            <img src={item.photoUrl} alt={item.studentName} className="w-full h-full object-cover" />
                          ) : (
                            <FileImage className="w-5 h-5 text-slate-400" />
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{item.studentName}</div>
                          <div className="text-[11px] text-slate-500 truncate max-w-xs">{item.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">{item.examName}</td>
                    <td className="px-6 py-4 font-semibold text-slate-600">{item.year}</td>
                    <td className="px-6 py-4 font-bold text-emerald-700">{item.score}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 items-start">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            item.status === 'PUBLISHED'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}
                        >
                          {item.status}
                        </span>
                        {item.isVerified ? (
                          <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Verified
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold text-amber-600 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> Unverified
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedResult(item)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => toggleVerification(item)}
                          className={`px-2.5 py-1.5 rounded-lg font-semibold text-xs border ${
                            item.isVerified
                              ? 'bg-slate-50 border-slate-200 text-slate-600'
                              : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                          }`}
                        >
                          {item.isVerified ? 'Unverify' : 'Verify'}
                        </button>
                        <button
                          onClick={() => togglePublication(item)}
                          className={`px-2.5 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1 ${
                            item.status === 'PUBLISHED'
                              ? 'bg-amber-50 text-amber-900 border border-amber-200'
                              : 'bg-slate-900 text-white'
                          }`}
                        >
                          {item.status === 'PUBLISHED' ? (
                            <>
                              <EyeOff className="w-3.5 h-3.5" /> Unpublish
                            </>
                          ) : (
                            <>
                              <Eye className="w-3.5 h-3.5" /> Publish
                            </>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Detail View */}
      {selectedResult && (
        <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 border border-slate-200 shadow-2xl flex flex-col gap-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">{selectedResult.studentName}</h3>
                <span className="text-xs text-slate-500 font-medium">{selectedResult.examName} ({selectedResult.year})</span>
              </div>
              <button
                onClick={() => setSelectedResult(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                &times;
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              {selectedResult.photoUrl && (
                <div className="w-full sm:w-48 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 shrink-0">
                  <img src={selectedResult.photoUrl} alt={selectedResult.studentName} className="w-full h-auto object-cover" />
                </div>
              )}
              <div className="flex-1 flex flex-col gap-3 text-xs text-slate-700">
                <div>
                  <span className="font-bold text-slate-900">Score / Percentage:</span>{' '}
                  <span className="font-bold text-emerald-700">{selectedResult.score}</span>
                </div>
                {selectedResult.subject && (
                  <div>
                    <span className="font-bold text-slate-900">Subjects / Stream:</span> {selectedResult.subject}
                  </div>
                )}
                <div>
                  <span className="font-bold text-slate-900">Publication Status:</span> {selectedResult.status}
                </div>
                <div>
                  <span className="font-bold text-slate-900">Verification Status:</span>{' '}
                  {selectedResult.isVerified ? 'Verified' : 'Unverified Draft'}
                </div>
                {selectedResult.story && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                    <span className="font-bold text-slate-900 block mb-1">Details & Variant Notes:</span>
                    <p className="text-slate-600 leading-relaxed">{selectedResult.story}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setSelectedResult(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
