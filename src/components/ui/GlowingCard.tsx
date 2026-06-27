import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GlowingCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  isInView?: boolean;
}

export const GlowingCard = ({ children, className, delay = 0, isInView = true }: GlowingCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className={cn(
        'group relative p-8 rounded-2xl bg-card border border-border',
        'hover:border-primary/50 transition-all duration-500 hover:-translate-y-2',
        className
      )}
    >
      {/* Hover Gradient Overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
