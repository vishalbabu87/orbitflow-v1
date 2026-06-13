import React, { forwardRef, useRef } from 'react';
import { cn } from '@/lib/utils';
import { AnimatedBeam } from '@/components/ui/AnimatedBeam';
import { Meteors } from '@/components/ui/Meteors';
import { Cloud, Database, Globe, ShieldAlert, Zap, Server, Lock } from 'lucide-react';

const Circle = forwardRef<HTMLDivElement, { className?: string; children?: React.ReactNode }>(
  ({ className, children }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'glass-3 z-10 flex h-12 w-12 items-center justify-center rounded-full border-white/5 bg-white/5 p-3 shadow-[0_0_20px_rgba(255,255,255,0.02)]',
          className
        )}
      >
        {children}
      </div>
    );
  }
);

Circle.displayName = 'Circle';

export const ThreatRadar = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <section className="relative overflow-hidden bg-[var(--orbit-base)] py-16 md:py-20 lg:py-24">
      {/* Meteor Background Overlay */}
      <div className="pointer-events-none absolute inset-0">
        <Meteors number={20} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <span className="mb-4 block font-mono text-xs font-bold tracking-[0.3em] text-red-500 uppercase">
            THREAT SENTINEL
          </span>
          <h2 className="font-heading text-4xl leading-[1.1] font-black tracking-tighter text-white md:text-5xl">
            Defend Your Infrastructure.
            <br />
            Automatically.
          </h2>
        </div>

        <div
          className="glass-3 relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-3xl border border-white/5 p-10 md:shadow-xl"
          ref={containerRef}
        >
          <div className="flex h-full w-full max-w-4xl flex-row items-stretch justify-between gap-10">
            <div className="flex flex-col justify-center gap-12">
              <Circle ref={div1Ref}>
                <Globe className="h-6 w-6 text-[var(--orbit-accent-cyan)]" />
              </Circle>
              <Circle ref={div2Ref}>
                <Database className="h-6 w-6 text-[var(--orbit-accent-cyan)]" />
              </Circle>
              <Circle ref={div3Ref}>
                <Cloud className="h-6 w-6 text-[var(--orbit-accent-cyan)]" />
              </Circle>
            </div>
            <div className="flex flex-col justify-center">
              <Circle
                ref={div4Ref}
                className="h-20 w-20 border-[var(--orbit-accent-cyan)]/40 bg-[var(--orbit-accent-cyan)]/10 ring-4 ring-[var(--orbit-accent-cyan)]/5"
              >
                <ShieldAlert className="h-10 w-10 animate-pulse text-[var(--orbit-accent-cyan)]" />
              </Circle>
            </div>
            <div className="flex flex-col justify-center gap-12">
              <Circle ref={div5Ref}>
                <Server className="h-6 w-6 text-[var(--orbit-accent-violet)]" />
              </Circle>
              <Circle ref={div6Ref}>
                <Lock className="h-6 w-6 text-[var(--orbit-accent-violet)]" />
              </Circle>
              <Circle ref={div7Ref}>
                <Zap className="h-6 w-6 text-[var(--orbit-accent-violet)]" />
              </Circle>
            </div>
          </div>

          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div1Ref}
            toRef={div4Ref}
            curvature={-70}
            endYOffset={-10}
            gradientStartColor="#00D2FF"
            gradientStopColor="#7B2FFF"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div2Ref}
            toRef={div4Ref}
            gradientStartColor="#00D2FF"
            gradientStopColor="#7B2FFF"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div3Ref}
            toRef={div4Ref}
            curvature={70}
            endYOffset={10}
            gradientStartColor="#00D2FF"
            gradientStopColor="#7B2FFF"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div5Ref}
            toRef={div4Ref}
            curvature={-70}
            endYOffset={-10}
            reverse
            gradientStartColor="#7B2FFF"
            gradientStopColor="#00D2FF"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div6Ref}
            toRef={div4Ref}
            reverse
            gradientStartColor="#7B2FFF"
            gradientStopColor="#00D2FF"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div7Ref}
            toRef={div4Ref}
            curvature={70}
            endYOffset={10}
            reverse
            gradientStartColor="#7B2FFF"
            gradientStopColor="#00D2FF"
          />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              title: 'DDoS Mitigation',
              body: 'Automatic traffic shedding when anomalies exceed safety thresholds.',
            },
            {
              title: 'Zero Trust Auth',
              body: 'Seamlessly integrate with Okta, Clerk, and Entra ID for secure access.',
            },
            {
              title: 'E2E Encryption',
              body: 'Data is encrypted at rest and in transit using military-grade AES-256.',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="glass-3 border-white/5 p-6 transition-all hover:border-white/20"
            >
              <h4 className="mb-2 font-bold text-white">{item.title}</h4>
              <p className="text-sm leading-relaxed text-[var(--orbit-text-secondary)]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
