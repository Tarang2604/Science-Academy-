import React, { useState, useEffect } from 'react';
import { Camera, ZoomIn } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Lightbox } from '../ui/Lightbox';
import { getPublicGallery } from '../../services/api';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  caption?: string;
  isVerified: boolean;
}

export const GalleryPreviewSection: React.FC = () => {
  const [activeImage, setActiveImage] = useState<{ url: string; title: string; caption?: string } | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await getPublicGallery();
        if (res.success && res.data) {
          setGalleryItems(res.data);
        }
      } catch (err) {
        console.error('Error loading public gallery:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <section className="px-6 md:px-12 py-16 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        
        {/* Header */}
        <div className="flex flex-col gap-2 max-w-xl">
          <Badge variant="violet" icon={<Camera className="w-3.5 h-3.5" />}>
            Academic Environment
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight">
            Classroom Life & Learning Space
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Take a look inside the learning environment and classroom infrastructure at Science Academy Ratlam.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full p-12 text-center text-xs font-semibold text-slate-500">
              Loading gallery items...
            </div>
          ) : galleryItems.length === 0 ? (
            <div className="col-span-full p-12 text-center bg-slate-50 rounded-2xl border border-slate-200/80">
              <p className="text-sm font-semibold text-slate-700">No Verified Gallery Content Published</p>
              <p className="text-xs text-slate-500 mt-1">
                All client media items are currently staged in <span className="font-mono text-amber-700">DRAFT + UNVERIFIED</span> status pending administrator review.
              </p>
            </div>
          ) : (
            galleryItems.map((item) => (
              <Card key={item.id} className="p-3 overflow-hidden group cursor-pointer border-slate-200/90" hoverEffect={true}>
                <div
                  className="relative w-full h-56 rounded-xl overflow-hidden bg-slate-100"
                  onClick={() => setActiveImage({ url: item.imageUrl, title: item.title, caption: item.caption })}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  
                  <div className="absolute inset-0 bg-navy-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/90 text-navy-900 flex items-center justify-center shadow-lg">
                      <ZoomIn className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="absolute top-3 left-3">
                    <Badge variant="navy" className="bg-navy-900/80 backdrop-blur-sm text-[10px]">
                      {item.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-3 flex flex-col gap-1">
                  <h4 className="text-sm font-bold text-navy-900">{item.title}</h4>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>Science Academy Ratlam</span>
                    <Badge variant="verify">VERIFIED</Badge>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

      </div>

      {/* Lightbox Overlay */}
      <Lightbox
        isOpen={!!activeImage}
        onClose={() => setActiveImage(null)}
        imageUrl={activeImage?.url || ''}
        title={activeImage?.title}
        caption={activeImage?.caption}
      />
    </section>
  );
};
