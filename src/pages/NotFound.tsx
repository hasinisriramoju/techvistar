import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowLeft, FileQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  useEffect(() => {
    document.title = 'Page not found | TechVistar';
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 md:p-10 shadow-sm text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <FileQuestion className="h-7 w-7" aria-hidden />
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">Error 404</p>
        <h1 className="text-2xl md:text-3xl font-bold font-display text-foreground tracking-tight mb-3">
          This page is not available
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed mb-8">
          The URL you requested does not exist or may have been moved. If you followed a link from elsewhere, please
          return to our home page and use the navigation menu.
        </p>
        <Button variant="hero" className="w-full sm:w-auto" asChild>
          <Link to="/" className="inline-flex items-center justify-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
