import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { FOOTER_DESCRIPTION, FOOTER_LINKS, SITE } from '@/lib/constants';
import logo from '../../logo.webp';

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] bg-ink" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>

      {/* Top gradient line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#6E7FEF]/40 to-transparent" />

      <div className="container-site pt-16 pb-10">
        {/* Main grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 group w-fit mb-5">
              <div className="h-8 w-8 rounded-lg overflow-hidden ring-1 ring-white/10 group-hover:ring-white/20 transition-all">
                <img src={logo} alt="TechVistar" className="h-full w-full object-cover" />
              </div>
              <span className="text-sm font-bold tracking-tight text-white">TechVistar</span>
            </Link>
            <p className="text-sm leading-relaxed text-white/40 max-w-xs">
              {FOOTER_DESCRIPTION}
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-6">
              {FOOTER_LINKS.social.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] text-white/40 hover:text-white hover:border-white/20 hover:bg-white/[0.04] transition-all duration-150"
                  >
                    <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="label-mono text-white/30 mb-4">Services</h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/45 hover:text-white/80 transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="label-mono text-white/30 mb-4">Company</h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/45 hover:text-white/80 transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact CTA */}
          <div>
            <h3 className="label-mono text-white/30 mb-4">Get in touch</h3>
            <p className="text-sm text-white/40 mb-4 leading-relaxed">
              Based in Hyderabad, India. Remote delivery worldwide.
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="block text-sm text-white/60 hover:text-white transition-colors mb-2"
            >
              {SITE.email}
            </a>
            <a
              href={`tel:${SITE.phoneTel}`}
              className="block text-sm text-white/60 hover:text-white transition-colors mb-6"
            >
              {SITE.phone}
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#8B9CF4] hover:text-[#A5B4FC] transition-colors group"
            >
              Start a project
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/[0.05] flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/25">
            © {year} TechVistar. All rights reserved.
          </p>
          <p className="text-xs text-white/20">
            Hyderabad, Telangana, India · Remote delivery worldwide
          </p>
        </div>
      </div>
    </footer>
  );
};
