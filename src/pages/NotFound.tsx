import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const NotFound = () => {
  useEffect(() => {
    document.title = '404 — Page not found · TechVistar';
  }, []);

  return (
    <div className="min-h-screen bg-ink flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center pt-16">
        <div className="container-site py-24 text-center">
          {/* Background grid */}
          <div className="pointer-events-none absolute inset-0 bg-grid-dots opacity-30" style={{ backgroundSize: '32px 32px' }} />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10"
          >
            <div className="text-[12rem] font-black leading-none text-white/[0.04] select-none mb-8">
              404
            </div>
            <h1 className="text-3xl font-bold text-white mb-4 -mt-24">Page not found</h1>
            <p className="text-white/40 mb-8 max-w-sm mx-auto">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-ink text-sm font-bold hover:opacity-90 transition-opacity"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
