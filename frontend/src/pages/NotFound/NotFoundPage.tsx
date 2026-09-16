import React from 'react';
import { Link } from 'react-router-dom';
import { Home, BookOpen, Phone, Compass } from 'lucide-react';
import { SEOHead } from '../../components/ui/SEOHead';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ACADEMY_CONFIG } from '../../config/academy';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 md:px-12 py-16">
      <SEOHead
        title="404 — Page Not Found"
        description="The requested page could not be found on Science Academy Ratlam."
      />

      <Card hoverEffect={false} className="p-8 sm:p-12 text-center flex flex-col items-center justify-center gap-6 max-w-xl mx-auto shadow-xl border-slate-200">
        
        <div className="flex flex-col items-center gap-2">
          <Badge variant="royal" icon={<Compass className="w-4 h-4" />}>
            Error 404
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-navy-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mt-1">
            The page you are looking for might have been moved, renamed, or is currently undergoing verified content updates.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link to="/">
            <Button variant="primary" size="md" icon={<Home className="w-4 h-4" />}>
              Back to Home
            </Button>
          </Link>

          <Link to="/courses">
            <Button variant="outline" size="md" icon={<BookOpen className="w-4 h-4 text-royal-600" />}>
              Explore Courses
            </Button>
          </Link>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between w-full text-xs text-slate-500">
          <span>Need help finding a course?</span>
          <a href={`tel:${ACADEMY_CONFIG.verifiedContact.phoneRaw}`} className="font-bold text-royal-600 hover:underline">
            Call {ACADEMY_CONFIG.verifiedContact.phoneDisplay}
          </a>
        </div>

      </Card>
    </div>
  );
};
