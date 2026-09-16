import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { SEOHead } from '../../components/ui/SEOHead';
import { getAdminStories, updateAdminStory } from '../../services/api';
import { Video, CheckCircle2, AlertCircle, Eye, EyeOff } from 'lucide-react';

interface Story {
  id: string;
  title: string;
  studentName: string;
  videoUrl: string;
  thumbnailUrl?: string;
  category: string;
  isVerified: boolean;
  status: string;
  createdAt: string;
}

export const AdminStoriesPage: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStories = async () => {
    setIsLoading(true);
    try {
      const res = await getAdminStories();
      if (res.success && res.data) {
        setStories(res.data);
      }
    } catch (err) {
      console.error('Error fetching admin stories:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const togglePublication = async (story: Story) => {
    const newStatus = story.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    try {
      const res = await updateAdminStory(story.id, {
        status: newStatus,
        isVerified: newStatus === 'PUBLISHED' ? true : story.isVerified,
      });
      if (res.success) {
        fetchStories();
      }
    } catch (err) {
      console.error('Error updating story status:', err);
    }
  };

  const toggleVerification = async (story: Story) => {
    try {
      const res = await updateAdminStory(story.id, {
        isVerified: !story.isVerified,
      });
      if (res.success) {
        fetchStories();
      }
    } catch (err) {
      console.error('Error updating story verification:', err);
    }
  };

  return (
    <AdminLayout
      title="Student Stories & Interviews CMS"
      subtitle="Manage video interviews, topper stories, and parent success featurettes."
    >
      <SEOHead title="Stories CMS — Admin Control Center" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full p-12 text-center text-xs font-semibold text-slate-500">
            Loading stories & interviews...
          </div>
        ) : stories.length === 0 ? (
          <div className="col-span-full p-12 text-center text-xs text-slate-500 font-medium">
            No student stories recorded yet.
          </div>
        ) : (
          stories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between"
            >
              <div className="relative aspect-video bg-slate-900 flex items-center justify-center text-white">
                {story.thumbnailUrl ? (
                  <img src={story.thumbnailUrl} alt={story.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Video className="w-8 h-8 opacity-60" />
                    <span className="text-[10px] uppercase font-bold text-slate-400">Video Content</span>
                  </div>
                )}
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-xs">
                  {story.category}
                </span>
              </div>

              <div className="p-5 flex flex-col gap-3">
                <h4 className="text-sm font-bold text-slate-900 leading-snug">{story.title}</h4>
                <p className="text-xs text-slate-500 font-medium">Student: {story.studentName}</p>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      story.status === 'PUBLISHED'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {story.status}
                  </span>
                  {story.isVerified ? (
                    <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Verified
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-amber-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Unverified
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => toggleVerification(story)}
                    className={`flex-1 py-1.5 rounded-lg font-semibold text-xs border ${
                      story.isVerified
                        ? 'bg-slate-50 border-slate-200 text-slate-600'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    }`}
                  >
                    {story.isVerified ? 'Unverify' : 'Verify'}
                  </button>
                  <button
                    onClick={() => togglePublication(story)}
                    className={`flex-1 py-1.5 rounded-lg font-bold text-xs flex items-center justify-center gap-1 ${
                      story.status === 'PUBLISHED'
                        ? 'bg-amber-50 text-amber-900 border border-amber-200'
                        : 'bg-slate-900 text-white'
                    }`}
                  >
                    {story.status === 'PUBLISHED' ? (
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
              </div>
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  );
};
