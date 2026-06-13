import React, { useId } from 'react';
import { cn } from '@/lib/utils';

interface OrbitLogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  showText?: boolean;
  textClass?: string;
}

export const OrbitLogo: React.FC<OrbitLogoProps> = ({
  size = 32,
  showText = true,
  textClass = 'text-xl text-[var(--orbit-text-primary)]',
  className,
  ...props
}) => {
  const gradientId = useId();

  return (
    <div className={`flex items-center gap-3 ${showText ? '' : 'inline-block'}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        {...props}
      >
        <circle
          cx="50"
          cy="50"
          r="38"
          stroke={`url(#${gradientId})`}
          strokeWidth="6"
          strokeDasharray="160 40"
          strokeLinecap="round"
        />
        <circle
          cx="50"
          cy="50"
          r="24"
          stroke={`url(#${gradientId})`}
          strokeWidth="4"
          strokeDasharray="80 30"
          strokeLinecap="round"
          transform="rotate(45 50 50)"
        />
        <circle cx="50" cy="50" r="8" fill="var(--orbit-accent-primary)" />
        <circle cx="82" cy="32" r="5" fill="#4F46E5" />
        <circle cx="26" cy="68" r="4" fill="var(--orbit-accent-primary)" />
        <defs>
          <linearGradient
            id={gradientId}
            x1="0"
            y1="0"
            x2="100"
            y2="100"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="var(--orbit-accent-primary)" />
            <stop offset="100%" stopColor="#4F46E5" />
          </linearGradient>
        </defs>
      </svg>
      <span className={cn(
        "font-sans font-extrabold tracking-tight transition-all duration-300 ease-in-out origin-left inline-block overflow-hidden",
        textClass,
        showText ? "opacity-100 max-w-[150px] ml-0" : "opacity-0 max-w-0 ml-0 pointer-events-none"
      )}>
        Orbit<span className="text-[var(--orbit-accent-primary)]">Flow</span>
      </span>
    </div>
  );
};
