import React from 'react';
import { Lock, Clock, ExternalLink, Heart, Eye, MessageCircle } from 'lucide-react';

interface ScheduledPostCardProps {
  platform?: string;
  scheduledAt?: string;
  content?: string;
  compact?: boolean;
}

export const ScheduledPostCard: React.FC<ScheduledPostCardProps> = ({
  platform = 'Twitter / X',
  scheduledAt = '5 Apr Â· 19:00',
  content = `Finished compiling the product design assets and layout rules for the upcoming launch! The Figma tokens look pixel perfect. Ready to push to production tomorrow. ðŸš€ #designsystem #orbitflow`,
  compact = false,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-5 text-left shadow-[0_2px_8px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.03)] dark:border-[var(--orbit-border-mid)] dark:bg-[var(--orbit-surface)] dark:shadow-none">
      {/* Subtle gradient blob */}
      <div className="pointer-events-none absolute top-0 right-0 h-24 w-32 bg-gradient-to-bl from-purple-500/5 to-transparent" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-500/10">
            <Lock size={15} className="text-purple-500" />
          </div>
          <div>
            <span className="block font-mono text-xs font-bold tracking-widest text-gray-400 uppercase dark:text-gray-500">
              Scheduled Preview
            </span>
            <h3 className="text-sm font-extrabold text-gray-900 dark:text-white">
              {platform} Post
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-1.5 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1.5">
          <Clock size={10} className="text-purple-500" />
          <span className="font-mono text-xs font-bold text-purple-600 dark:text-purple-400">
            Scheduled Â· {scheduledAt}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="my-4">
        <p
          className={`leading-relaxed text-gray-700 dark:text-gray-300 ${
            compact ? 'line-clamp-3 text-xs' : 'text-sm'
          } font-medium`}
        >
          "{content}"
        </p>
      </div>

      {/* Footer: Engagement stats */}
      <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
        <div className="flex gap-5 font-mono text-xs text-gray-400 dark:text-gray-500">
          <div className="flex items-center gap-1">
            <Heart size={11} />
            <span className="font-bold text-gray-700 dark:text-gray-300">â€”</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye size={11} />
            <span className="font-bold text-gray-700 dark:text-gray-300">â€”</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle size={11} />
            <span className="font-bold text-gray-700 dark:text-gray-300">â€”</span>
          </div>
        </div>
        <button
          type="button"
          className="flex cursor-pointer items-center gap-1 text-xs font-bold text-purple-500 transition hover:text-purple-400"
        >
          Edit post <ExternalLink size={11} />
        </button>
      </div>
    </div>
  );
};

export default ScheduledPostCard;
