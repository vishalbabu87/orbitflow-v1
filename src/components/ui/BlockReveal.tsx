import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BlockRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Not used with Framer Motion implementation but kept for API compatibility */
  trigger?: string;
}

export const BlockReveal: React.FC<BlockRevealProps> = ({ children, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn('relative inline-block overflow-hidden', className)}
    >
      {children}
    </motion.div>
  );
};
