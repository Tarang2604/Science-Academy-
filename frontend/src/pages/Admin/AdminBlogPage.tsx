import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { SEOHead } from '../../components/ui/SEOHead';
import { getAdminBlog, updateAdminBlog } from '../../services/api';
import { FileText, Eye, EyeOff, Calendar } from 'lucide-react';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  status: string;
  publishedAt: string;
}

export const AdminBlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBlog = async () => {
    setIsLoading(true);
    try {
      const res = await getAdminBlog();
      if (res.success && res.data) {
        setPosts(res.data);
      }
    } catch (err) {
      console.error('Error fetching admin blog:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  const togglePublication = async (post: BlogPost) => {
    const newStatus = post.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    try {
      const res = await updateAdminBlog(post.id, {
        status: newStatus,
      });
      if (res.success) {
        fetchBlog();
      }
    } catch (err) {
      console.error('Error updating blog status:', err);
    }
  };

  return (
    <AdminLayout
      title="Academic News & Blog CMS"
      subtitle="Manage exam strategies, academic guidance articles, and institute announcements."
    >
      <SEOHead title="Blog CMS — Admin Control Center" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full p-12 text-center text-xs font-semibold text-slate-500">
            Loading blog posts...
          </div>
        ) : posts.length === 0 ? (
          <div className="col-span-full p-12 text-center text-xs text-slate-500 font-medium">
            No blog posts published yet.
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 flex flex-col justify-between"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-100">
                    {post.category}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      post.status === 'PUBLISHED'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {post.status}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 leading-snug">{post.title}</h4>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{post.excerpt}</p>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                  <span>Author: {post.author}</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-4">
                <button
                  onClick={() => togglePublication(post)}
                  className={`w-full py-1.5 rounded-lg font-bold text-xs flex items-center justify-center gap-1 ${
                    post.status === 'PUBLISHED'
                      ? 'bg-amber-50 text-amber-900 border border-amber-200'
                      : 'bg-slate-900 text-white'
                  }`}
                >
                  {post.status === 'PUBLISHED' ? (
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
          ))
        )}
      </div>
    </AdminLayout>
  );
};
