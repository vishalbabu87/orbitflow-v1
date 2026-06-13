import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  count?: number;
}

export const Skeleton = ({ className, count = 1 }: SkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={cn('animate-pulse rounded-xl bg-[var(--orbit-border-subtle)]', className)}
        />
      ))}
    </>
  );
};

export const CardSkeleton = () => {
  return (
    <div className="elite-card flex h-[160px] flex-col justify-between p-6">
      <div className="flex items-start justify-between">
        <Skeleton className="h-10 w-10 rounded-xl" />
        <Skeleton className="h-5 w-16 rounded-md" />
      </div>
      <div>
        <Skeleton className="mb-3 h-3 w-32" />
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  );
};
