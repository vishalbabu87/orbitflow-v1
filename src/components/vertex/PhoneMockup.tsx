import React, { useRef } from 'react';

interface PhoneMockupProps {
  children: React.ReactNode;
  /** Width of the phone frame in px (default 320) */
  width?: number;
  /** Height of the phone frame in px (default 660) */
  height?: number;
}

/**
 * Premium CSS-drawn iPhone-style phone frame for landing page mockups.
 * The inner screen area is scrollable, so the full MobileDashboard content
 * is accessible by the visitor without any clipping.
 */
export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  children,
  width = 320,
  height = 660,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Derived sizing constants relative to phone width
  const borderW = Math.round(width * 0.04); // ~4% border thickness
  const cornerR = Math.round(width * 0.12); // corner radius
  const dynamicIslandW = Math.round(width * 0.3);
  const dynamicIslandH = Math.round(width * 0.075);

  return (
    <div className="relative mx-auto flex-shrink-0 select-none" style={{ width, height }}>
      {/* â”€â”€ Outer phone shell â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div
        className="absolute inset-0"
        style={{
          borderRadius: cornerR,
          background: 'linear-gradient(145deg, #1c2333 0%, #0d1117 50%, #1a2235 100%)',
          boxShadow: [
            `0 0 0 ${borderW}px #1e2d47`,
            `0 0 0 ${borderW + 1}px #2a3f5f`,
            '0 40px 80px -20px rgba(0,0,0,0.7)',
            '0 20px 40px -10px rgba(0,0,0,0.5)',
            'inset 0 1px 1px rgba(255,255,255,0.08)',
          ].join(', '),
        }}
      />

      {/* â”€â”€ Gloss highlight on the left edge â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: cornerR,
          left: borderW,
          width: 2,
          bottom: cornerR,
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.01) 100%)',
          borderRadius: 2,
        }}
      />

      {/* â”€â”€ Physical side buttons (left) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {/* Volume Up */}
      <div
        className="pointer-events-none absolute"
        style={{
          left: -borderW - 3,
          top: '22%',
          width: 4,
          height: 38,
          borderRadius: '2px 0 0 2px',
          background: 'linear-gradient(90deg, #1a2844 0%, #243455 100%)',
          boxShadow: '-1px 0 2px rgba(0,0,0,0.4)',
        }}
      />
      {/* Volume Down */}
      <div
        className="pointer-events-none absolute"
        style={{
          left: -borderW - 3,
          top: '32%',
          width: 4,
          height: 38,
          borderRadius: '2px 0 0 2px',
          background: 'linear-gradient(90deg, #1a2844 0%, #243455 100%)',
          boxShadow: '-1px 0 2px rgba(0,0,0,0.4)',
        }}
      />
      {/* Mute toggle */}
      <div
        className="pointer-events-none absolute"
        style={{
          left: -borderW - 3,
          top: '14%',
          width: 4,
          height: 22,
          borderRadius: '2px 0 0 2px',
          background: 'linear-gradient(90deg, #1a2844 0%, #243455 100%)',
          boxShadow: '-1px 0 2px rgba(0,0,0,0.4)',
        }}
      />

      {/* â”€â”€ Power button (right) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div
        className="pointer-events-none absolute"
        style={{
          right: -borderW - 3,
          top: '25%',
          width: 4,
          height: 56,
          borderRadius: '0 2px 2px 0',
          background: 'linear-gradient(270deg, #1a2844 0%, #243455 100%)',
          boxShadow: '1px 0 2px rgba(0,0,0,0.4)',
        }}
      />

      {/* â”€â”€ Screen bezel (inner black area) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div
        className="absolute"
        style={{
          inset: borderW,
          borderRadius: cornerR - borderW,
          background: '#090D12',
          overflow: 'hidden',
        }}
      >
        {/* Top status bar teal glow */}
        <div
          className="pointer-events-none absolute top-0 right-0 left-0 z-20"
          style={{
            height: 60,
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(14,165,164,0.18) 0%, transparent 70%)',
          }}
        />

        {/* â”€â”€ Dynamic Island â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div
          className="absolute z-30 flex items-center justify-center"
          style={{
            top: 12,
            left: '50%',
            transform: 'translateX(-50%)',
            width: dynamicIslandW,
            height: dynamicIslandH,
            borderRadius: dynamicIslandH / 2,
            background: '#000',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.06), 0 2px 8px rgba(0,0,0,0.6)',
          }}
        >
          {/* Camera dot */}
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#0a1a1a',
              boxShadow: 'inset 0 0 0 1.5px rgba(14,165,164,0.3)',
            }}
          />
        </div>

        {/* â”€â”€ Scrollable screen content â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div
          ref={scrollRef}
          className="absolute inset-0 overflow-x-hidden overflow-y-auto"
          style={{
            /* Custom minimal scrollbar */
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(14,165,164,0.3) transparent',
          }}
        >
          {/* Extra top padding so content starts below Dynamic Island */}
          <div style={{ paddingTop: dynamicIslandH + 16 }}>{children}</div>
        </div>

        {/* â”€â”€ Bottom home indicator â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div
          className="pointer-events-none absolute bottom-2 z-30 flex justify-center"
          style={{ left: 0, right: 0 }}
        >
          <div
            style={{
              width: 100,
              height: 4,
              borderRadius: 2,
              background: 'rgba(255,255,255,0.25)',
            }}
          />
        </div>

        {/* â”€â”€ Screen edge gloss â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            borderRadius: cornerR - borderW,
            boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.07), inset 0 -1px 1px rgba(0,0,0,0.3)',
          }}
        />
      </div>

      {/* â”€â”€ Teal accent glow beneath the phone â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div
        className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2"
        style={{
          width: width * 0.8,
          height: 40,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(14,165,164,0.25) 0%, transparent 70%)',
          filter: 'blur(12px)',
        }}
      />
    </div>
  );
};

export default PhoneMockup;
