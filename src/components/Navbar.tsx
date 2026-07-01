import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";
import logo from "../logo.webp";

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  
  const scrollToSection = (hash: string) => {
    const sectionId = hash.replace("#", "");
    const target = document.getElementById(sectionId);
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", hash);
  };

  const handleNavClick =
    (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!href.startsWith("/#")) {
        closeMobileMenu();
        return;
      }

      e.preventDefault();
      closeMobileMenu();
      const hash = href.replace("/", "");

      if (isHome) {
        scrollToSection(hash);
        return;
      }

      navigate(`/${hash}`);
    };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 md:py-4",
          isScrolled
            ? "bg-background/80 border-b border-border-subtle/40 backdrop-blur-xl shadow-lg shadow-black/20"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <nav className="container-custom max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative h-10 w-10 overflow-hidden rounded-lg ring-1 ring-border-subtle group-hover:ring-primary/50 transition-all duration-300">
              <img
                src={logo}
                alt="TechVistar"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-base font-bold font-display tracking-tight text-white group-hover:text-primary transition-colors">
              TechVistar
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1.5 px-1.5 py-1 rounded-full border border-border-subtle/30 bg-surface-charcoal/40 backdrop-blur-md">
            {NAV_LINKS.filter(link => link.href !== "/#register").map((link) => {
              const isActive = location.hash === link.href.replace("/", "") || 
                (location.pathname === link.href && !location.hash);
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className="relative px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-white transition-colors duration-200"
                  onClick={handleNavClick(link.href)}
                  onMouseEnter={() => setHoveredLink(link.label)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {/* Hover background slide */}
                  {hoveredLink === link.label && (
                    <motion.span
                      layoutId="navHover"
                      className="absolute inset-0 z-0 rounded-full bg-white/[0.06] border border-white/[0.03]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {/* Active Indicator line */}
                  {isActive && (
                    <motion.span
                      layoutId="navActiveLine"
                      className="absolute bottom-0.5 left-4 right-4 h-[2px] bg-primary rounded-full z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Action Button */}
          <div className="hidden md:block">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
              className="relative inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider overflow-hidden group transition-all duration-300"
            >
              {/* Background gradient */}
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-secondary bg-size-200 animate-shimmer z-0 animate-[shimmer_8s_infinite_linear]" />
              {/* Overlay for hover scale */}
              <span className="absolute inset-[1px] bg-background rounded-[7px] z-10 group-hover:bg-transparent transition-colors duration-300" />
              <span className="relative z-20 flex items-center gap-1.5 text-white group-hover:text-background transition-colors duration-300">
                Get in Touch
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
              </span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center justify-center p-2 rounded-lg border border-border-subtle bg-surface-charcoal/80 text-muted-foreground hover:text-white transition-colors md:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-[68px] left-4 right-4 z-40 p-5 rounded-2xl border border-border-subtle bg-surface-charcoal/95 backdrop-blur-xl shadow-2xl md:hidden"
            >
              <div className="flex flex-col gap-1.5">
                {NAV_LINKS.filter(link => link.href !== "/#register").map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="block px-3 py-3 rounded-xl text-sm font-semibold tracking-wide text-muted-foreground hover:bg-white/[0.04] hover:text-white transition-all"
                    onClick={handleNavClick(link.href)}
                  >
                    {link.label}
                  </Link>
                ))}
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    closeMobileMenu();
                    scrollToSection("contact");
                  }}
                  className="mt-4 w-full h-11 rounded-xl bg-primary text-background text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:opacity-90 active:scale-[0.98] transition-all"
                >
                  Get in Touch
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
