import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, ChevronDown, ArrowUpRight } from 'lucide-react';
import { NAV_STRUCTURE, SITE } from '@/lib/constants';
import logo from '../../logo.webp';

/* ── Types ── */
type MenuKey = 'services' | 'company' | null;

/* ── Animations ── */
const megaVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0, y: -6, scale: 0.97,
    transition: { duration: 0.15 },
  },
};

const mobileVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1, height: 'auto',
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0, height: 0,
    transition: { duration: 0.2 },
  },
};

/* ── Service item inside mega-menu ── */
function ServiceItem({
  item,
}: {
  item: (typeof NAV_STRUCTURE.services.items)[number];
}) {
  const Icon = item.icon;
  return (
    <Link
      to={item.href}
      className="group flex items-start gap-3 rounded-xl p-3 transition-all duration-150 hover:bg-white/[0.04]"
    >
      <div
        className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 transition-colors duration-150 group-hover:border-white/20"
        style={{ background: `${item.color}18` }}
      >
        <Icon
          className="h-4 w-4"
          style={{ color: item.color }}
          strokeWidth={1.75}
        />
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors leading-snug">
            {item.title}
          </p>
          <ArrowUpRight
            className="h-3.5 w-3.5 text-white/30 opacity-0 transition-all duration-150 group-hover:opacity-100 group-hover:text-white/60 -translate-y-0.5 translate-x-0 group-hover:translate-x-0.5 group-hover:-translate-y-1"
            strokeWidth={2}
          />
        </div>
        <p className="mt-0.5 text-xs text-white/40 leading-snug">{item.description}</p>
      </div>
    </Link>
  );
}

/* ── Main Navbar ── */
export const Navbar = () => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState<MenuKey>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setActiveMenu(null);
    setIsMobileOpen(false);
  }, [location.pathname]);

  /* Keyboard close */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenu(null);
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const openMenu = (key: MenuKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(key);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 120);
  };

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={[
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-ink/90 backdrop-blur-xl border-b border-white/[0.06] shadow-nav'
            : 'bg-transparent',
        ].join(' ')}
      >
        <nav
          className="container-site flex items-center justify-between h-16 md:h-18"
          aria-label="Main navigation"
          ref={menuRef}
        >
          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="h-8 w-8 rounded-lg overflow-hidden ring-1 ring-white/10 group-hover:ring-white/25 transition-all duration-200">
              <img src={logo} alt="TechVistar" className="h-full w-full object-cover" />
            </div>
            <span className="text-sm font-bold tracking-tight text-white group-hover:text-white/90 transition-colors">
              TechVistar
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <div className="hidden md:flex items-center gap-1">
            {/* Services mega-menu trigger */}
            <div
              onMouseEnter={() => openMenu('services')}
              onMouseLeave={scheduleClose}
            >
              <button
                onClick={() => setActiveMenu(activeMenu === 'services' ? null : 'services')}
                aria-expanded={activeMenu === 'services'}
                aria-haspopup="true"
                className={[
                  'relative flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150',
                  activeMenu === 'services'
                    ? 'text-white bg-white/[0.06]'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.04]',
                ].join(' ')}
              >
                Services
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${activeMenu === 'services' ? 'rotate-180' : ''}`}
                  strokeWidth={2}
                />
              </button>

              {/* Services mega-menu */}
              <AnimatePresence>
                {activeMenu === 'services' && (
                  <motion.div
                    variants={megaVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onMouseEnter={cancelClose}
                    onMouseLeave={scheduleClose}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] rounded-2xl border border-white/[0.08] bg-ink-2/95 backdrop-blur-2xl shadow-[0_24px_64px_-12px_rgba(0,0,0,0.9)] p-3"
                    style={{ transformOrigin: 'top center' }}
                  >
                    <div>
                       {/* Services items */}
                       <div>
                        <p className="label-mono text-white/25 px-3 pt-2 pb-2">Solutions</p>
                        <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
                          {NAV_STRUCTURE.services.items.map((item) => (
                            <ServiceItem key={item.href} item={item} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Company dropdown trigger */}
            <div
              onMouseEnter={() => openMenu('company')}
              onMouseLeave={scheduleClose}
            >
              <button
                onClick={() => setActiveMenu(activeMenu === 'company' ? null : 'company')}
                aria-expanded={activeMenu === 'company'}
                aria-haspopup="true"
                className={[
                  'relative flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150',
                  activeMenu === 'company'
                    ? 'text-white bg-white/[0.06]'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.04]',
                ].join(' ')}
              >
                Company
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${activeMenu === 'company' ? 'rotate-180' : ''}`}
                  strokeWidth={2}
                />
              </button>

              {/* Company dropdown */}
              <AnimatePresence>
                {activeMenu === 'company' && (
                  <motion.div
                    variants={megaVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onMouseEnter={cancelClose}
                    onMouseLeave={scheduleClose}
                    className="absolute top-full mt-2 w-52 rounded-xl border border-white/[0.08] bg-ink-2/95 backdrop-blur-2xl shadow-[0_24px_64px_-12px_rgba(0,0,0,0.9)] p-1.5"
                    style={{ transformOrigin: 'top center' }}
                  >
                    {NAV_STRUCTURE.company.items.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        className="flex flex-col rounded-lg px-3 py-2.5 hover:bg-white/[0.04] transition-colors duration-150 group"
                      >
                        <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                          {item.title}
                        </span>
                        <span className="text-[11px] text-white/35 mt-0.5">{item.description}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Direct links */}
            {[
              { label: 'Work', href: '/work' },
            ].map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={[
                  'px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150',
                  isActive(link.href)
                    ? 'text-white bg-white/[0.06]'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.04]',
                ].join(' ')}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ── Desktop CTA ── */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/contact"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-ink text-sm font-semibold tracking-tight hover:opacity-90 active:scale-[0.98] transition-all duration-150"
            >
              Contact us
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
            </Link>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileOpen}
            className="md:hidden flex items-center justify-center h-9 w-9 rounded-lg border border-white/[0.08] bg-white/[0.04] text-white/60 hover:text-white transition-colors duration-150"
          >
            <AnimatePresence mode="wait">
              {isMobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={16} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={16} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>

        {/* ── Mobile menu ── */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              variants={mobileVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden overflow-hidden border-t border-white/[0.06] bg-ink-2/98 backdrop-blur-2xl"
            >
              <div className="container-site py-4 space-y-1">
                {/* Services accordion */}
                <div>
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === 'services' ? null : 'services')}
                    className="flex items-center justify-between w-full px-3 py-3 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/[0.04] transition-colors"
                  >
                    Services
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${mobileExpanded === 'services' ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileExpanded === 'services' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden pl-3 mt-1 space-y-0.5"
                      >
                        {NAV_STRUCTURE.services.items.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.href}
                              to={item.href}
                              onClick={() => setIsMobileOpen(false)}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/[0.04] transition-colors group"
                            >
                              <div
                                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                                style={{ background: `${item.color}18` }}
                              >
                                <Icon className="h-3.5 w-3.5" style={{ color: item.color }} strokeWidth={1.75} />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-white/80 group-hover:text-white">{item.title}</p>
                                <p className="text-xs text-white/35">{item.description}</p>
                              </div>
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Company accordion */}
                <div>
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === 'company' ? null : 'company')}
                    className="flex items-center justify-between w-full px-3 py-3 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/[0.04] transition-colors"
                  >
                    Company
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${mobileExpanded === 'company' ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileExpanded === 'company' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden pl-3 mt-1 space-y-0.5"
                      >
                        {NAV_STRUCTURE.company.items.map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            onClick={() => setIsMobileOpen(false)}
                            className="block px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/[0.04] transition-colors"
                          >
                            {item.title}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Direct mobile links */}
                {[
                  { label: 'Work', href: '/work' },
                ].map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="block px-3 py-3 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/[0.04] transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Mobile CTA */}
                <div className="pt-3 border-t border-white/[0.06]">
                  <Link
                    to="/contact"
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center justify-center gap-2 w-full h-11 rounded-xl bg-white text-ink text-sm font-semibold tracking-tight hover:opacity-90 transition-opacity"
                  >
                    Contact us
                    <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};
