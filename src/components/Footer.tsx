import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { FOOTER_DESCRIPTION, FOOTER_LINKS } from '@/lib/constants';
import logo from '../logo.webp';

export const Footer = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbxBjqGscTRlKH9XHiT022xxGJ4BKYRj9p3c0aiKP30mj_11ZVRExsQfL114Y7DOVwwE/exec',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        toast({
          title: 'Subscribed',
          description: 'Thank you for subscribing.',
        });
        setEmail('');
      } else {
        throw new Error('Failed');
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to subscribe. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <footer
      className="bg-background border-t border-border-subtle text-muted-foreground"
    >
      <div className="container-custom py-14 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3 mb-4">
              <img src={logo} alt="TechVistar" className="w-9 h-9 rounded-full object-cover ring-2 ring-white/10" />
              <span className="text-lg font-bold font-display text-white tracking-tight">TechVistar</span>
            </Link>
            <p className="text-xs leading-relaxed mb-6 max-w-sm text-muted-foreground/80">
              {FOOTER_DESCRIPTION}
            </p>
            <div className="flex gap-2">
              {FOOTER_LINKS.social.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-surface-charcoal border border-border-subtle flex items-center justify-center text-muted-foreground hover:text-white hover:border-primary transition-colors"
                >  
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold font-mono text-xs uppercase tracking-wider text-white mb-4">Services</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-xs hover:text-white transition-colors inline-flex items-center gap-1 group text-muted-foreground/90"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold font-mono text-xs uppercase tracking-wider text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-xs hover:text-white transition-colors inline-flex items-center gap-1 group text-muted-foreground/90"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold font-mono text-xs uppercase tracking-wider text-white mb-4">Updates</h4>
            <p className="text-xs mb-4 text-muted-foreground/80">Occasional notes on product delivery and tech tips.</p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background border-border-subtle text-white placeholder:text-muted-foreground/30 text-xs"
                required
              />
              <Button type="submit" size="default" className="shrink-0 bg-primary text-background font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-[0_0_15px_-3px_rgba(171,199,255,0.3)] border-none">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground/50">© {new Date().getFullYear()} TechVistar. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="text-xs text-muted-foreground/50 hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="text-xs text-muted-foreground/50 hover:text-white transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};