import { useState, useEffect } from 'react';
import { Github, Twitter, Linkedin, Youtube, ArrowUpRight, ArrowUp, Mail, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { OrbitLogo } from '../ui/OrbitLogo';
import { AnimatePresence, motion } from 'framer-motion';

/* ---------------------------------------------
   FIN - Corrugated panels (same as Hero to keep visual harmony)
 -----------------------------------------------*/
// FINS count is managed dynamically inside the Footer component.

interface FinProps {
  index: number;
  total: number;
  customLeft?: number;
  customWidth?: number;
}

function Fin({ index, total, customLeft, customWidth }: FinProps) {
  const actualLeft = customLeft !== undefined ? customLeft : (index / (total - 1)) * 100;
  // Increase width slightly to prevent any potential sub-pixel gaps
  const actualWidth = customWidth !== undefined ? customWidth + 1.5 : 100 / total + 1.5;
  const t =
    customLeft !== undefined
      ? Math.max(0, Math.min(1, ((customLeft ?? 0) + 12.5) / 112.5))
      : index / (total - 1); // 0 -> left edge, 1 -> right edge

  const lightSource = 0.62;
  const rawGlow = 1 - Math.abs(t - lightSource) / Math.max(lightSource, 1 - lightSource);
  const glow = Math.pow(Math.max(0, rawGlow), 1.4); // sharpen the falloff
  const edgeFade = Math.pow(Math.sin(t * Math.PI), 0.65);

  // -- HIGHLIGHT FACE (left edge of each fin - catches the "light") --
  // Dark slate-blue
  const hlR = Math.round((12 + glow * 16) * edgeFade);
  const hlG = Math.round((20 + glow * 54) * edgeFade);
  const hlB = Math.round((30 + glow * 82) * edgeFade);
  const highlightColor = `rgb(${Math.round(hlR)},${Math.round(hlG)},${Math.round(hlB)})`;

  // -- SHADOW FACE (right edge of each fin - falls into shadow) --
  // Deep navy
  const shR = Math.round((4 + glow * 8) * edgeFade);
  const shG = Math.round((6 + glow * 16) * edgeFade);
  const shB = Math.round((10 + glow * 28) * edgeFade);
  const shadowColor = `rgb(${Math.round(shR)},${Math.round(shG)},${Math.round(shB)})`;

  // Border opacity - subtle white highlight on left edge only
  const borderHighlightOpacity = (0.02 + glow * 0.1) * edgeFade;
  const borderHighlight = `rgba(255,255,255,${borderHighlightOpacity})`;

  return (
    <div
      className="absolute top-0 h-full"
      style={{
        left: `${actualLeft}%`,
        width: `${actualWidth}%`,
        borderLeft: `1px solid ${borderHighlight}`,
        zIndex: 10,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, ${highlightColor} 0%, ${shadowColor} 100%)`,
        }}
      />
    </div>
  );
}

export const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [finCount, setFinCount] = useState(12);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  useEffect(() => {
    const handleResize = () => {
      setFinCount(window.innerWidth < 640 ? 4 : 12);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const checkScroll = () => {
      if (!showScrollTop && window.scrollY > 400) {
        setShowScrollTop(true);
      } else if (showScrollTop && window.scrollY <= 400) {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, [showScrollTop]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0B0F19] px-6 pt-[clamp(4rem,8vw,8rem)] pb-[clamp(3rem,6vw,5rem)] font-sans shadow-[0_-12px_40px_rgba(0,0,0,0.15)]">
      {/* -- BACKGROUND LAYER: panels + lights (matching Hero) -- */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        {/* Mobile view: 3 full, 2 half panels */}
        <div className="absolute inset-0 block sm:hidden" style={{ zIndex: 10 }}>
          {[
            { left: -12.5, width: 25 },
            { left: 12.5, width: 25 },
            { left: 37.5, width: 25 },
            { left: 62.5, width: 25 },
            { left: 87.5, width: 25 },
          ].map((cfg, i) => (
            <Fin key={i} index={i} total={5} customLeft={cfg.left} customWidth={cfg.width} />
          ))}
        </div>
        {/* Desktop/tablet view */}
        <div className="absolute inset-0 hidden sm:block" style={{ zIndex: 10 }}>
          {[...Array(finCount)].map((_, i) => (
            <Fin key={i} index={i} total={finCount} />
          ))}
        </div>

        {/* Ambient Aurora glow */}
        <div
          className="pointer-events-none absolute"
          style={{
            bottom: '-20%',
            left: '20%',
            width: '60%',
            height: '80%',
            background:
              'radial-gradient(ellipse at 50% 60%, rgba(6,182,212,0.2) 0%, rgba(79,70,229,0.1) 45%, transparent 75%)',
            filter: 'blur(55px)',
            borderRadius: '50%',
            zIndex: 20,
            mixBlendMode: 'screen',
          }}
        />
      </div>

      {/* Content wrapper */}
      <div className="relative z-30 mx-auto max-w-7xl">
        <div className="mb-16 grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-8 lg:gap-8">
          {/* Brand Info */}
          <div className="col-span-2 text-left md:col-span-1 lg:col-span-2">
            <div className="footer-logo-container mb-6">
              <OrbitLogo showText={true} size={30} textClass="text-white" />
            </div>
            <p className="mb-6 max-w-sm text-sm leading-relaxed font-normal text-gray-500 sm:text-base">
              AI-powered platform that helps teams automate workflows, generate content, and make
              data-driven decisions.
            </p>
            <div className="flex items-center justify-center gap-4 sm:justify-start">
              {[
                { icon: Twitter, href: 'https://twitter.com', name: 'Twitter' },
                { icon: Linkedin, href: 'https://linkedin.com', name: 'LinkedIn' },
                { icon: Github, href: 'https://github.com', name: 'GitHub' },
                { icon: Youtube, href: 'https://youtube.com', name: 'YouTube' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  aria-label={social.name}
                  className="flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-3 text-gray-400 shadow-sm transition-all duration-300 hover:border-white/25 hover:bg-white/10 hover:text-white min-h-[44px] min-w-[44px]"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links 1 - Product */}
          <div className="text-left lg:col-span-1">
            <h4 className="mb-6 text-xs font-black tracking-[0.2em] text-gray-500 uppercase sm:text-sm sm:tracking-[0.3em]">
              Product
            </h4>
            <ul className="space-y-1 text-sm font-bold sm:text-base">
              {[
                { name: 'Features', href: '/#features' },
                { name: 'Pricing', href: '/pricing' },
                { name: 'Integrations', href: '/#showcase' },
                { name: 'Changelog', href: '/blog' },
                { name: 'API Docs', href: '/developers' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="group flex items-center gap-2 py-2 text-gray-400 transition-colors hover:text-white"
                  >
                    {link.name}{' '}
                    <ArrowUpRight
                      size={12}
                      className="translate-x-0.5 -translate-y-0.5 opacity-0 transition-all group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links 2 - Company */}
          <div className="text-left lg:col-span-1">
            <h4 className="mb-6 text-xs font-black tracking-[0.2em] text-gray-500 uppercase sm:text-sm sm:tracking-[0.3em]">
              Company
            </h4>
            <ul className="space-y-1 text-sm font-bold sm:text-base">
              {[
                { name: 'About', href: '/about' },
                { name: 'Careers', href: '/careers' },
                { name: 'Blog', href: '/blog' },
                { name: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="group flex items-center gap-2 py-2 text-gray-400 transition-colors hover:text-white"
                  >
                    {link.name}{' '}
                    <ArrowUpRight
                      size={12}
                      className="translate-x-0.5 -translate-y-0.5 opacity-0 transition-all group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links 3 - Resources */}
          <div className="text-left lg:col-span-1">
            <h4 className="mb-6 text-xs font-black tracking-[0.2em] text-gray-500 uppercase sm:text-sm sm:tracking-[0.3em]">
              Resources
            </h4>
            <ul className="space-y-1 text-sm font-bold sm:text-base">
              {[
                { name: 'Documentation', href: '/developers' },
                { name: 'Help Center', href: '/faq' },
                { name: 'Community', href: '/about' },
                { name: 'Status', href: '/executions' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="group flex items-center gap-2 py-2 text-gray-400 transition-colors hover:text-white"
                  >
                    {link.name}{' '}
                    <ArrowUpRight
                      size={12}
                      className="translate-x-0.5 -translate-y-0.5 opacity-0 transition-all group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links 4 - Legal */}
          <div className="text-left lg:col-span-1">
            <h4 className="mb-6 text-xs font-black tracking-[0.2em] text-gray-500 uppercase sm:text-sm sm:tracking-[0.3em]">
              Legal
            </h4>
            <ul className="space-y-1 text-sm font-bold sm:text-base">
              {[
                { name: 'Privacy Policy', href: '/privacy-policy' },
                { name: 'Terms of Service', href: '/terms-of-service' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="group flex items-center gap-2 py-2 text-gray-400 transition-colors hover:text-white"
                  >
                    {link.name}{' '}
                    <ArrowUpRight
                      size={12}
                      className="translate-x-0.5 -translate-y-0.5 opacity-0 transition-all group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="footer-newsletter-card col-span-2 mt-8 text-left md:col-span-1 md:mt-0 lg:col-span-2">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 shadow-lg backdrop-blur-xl">
              <div className="pointer-events-none absolute top-0 right-0 p-4 opacity-[0.03]">
                <Mail size={56} className="text-white" />
              </div>

              <h4 className="mb-2 text-sm font-extrabold text-white sm:text-lg">
                Stay updated
              </h4>
              <p className="mb-4 text-xs leading-relaxed font-normal text-gray-500 sm:text-sm">
                Join 20k+ teams receiving our weekly AI updates.
              </p>
              <div className="mt-4 flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="you@company.com"
                  aria-label="Email address for newsletter subscription"
                  autoComplete="email"
                  className="min-h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs text-white transition-all placeholder:text-gray-500 focus:border-[var(--orbit-accent-primary)]/50 focus:bg-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => showToast("Thanks for subscribing!")}
                  className="flex min-h-11 w-full cursor-pointer items-center justify-center rounded-xl bg-[var(--orbit-accent-primary)] py-2.5 text-xs font-bold tracking-wider text-white uppercase transition-all duration-300 hover:bg-[#0c9594] active:scale-[0.96] sm:text-sm"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Footer */}
        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 md:flex-row">
          <p className="leading-relaxed font-mono text-xs tracking-[0.1em] text-gray-500 uppercase">
            &copy; 2026 OrbitFlow. All rights reserved.
          </p>
          <div className="flex flex-col items-center gap-1 font-mono text-xs tracking-[0.1em] text-gray-500 uppercase sm:flex-row sm:gap-4">
            <Link to="/privacy-policy" className="py-2.5 px-2 transition-colors hover:text-white sm:py-2">
              Privacy
            </Link>
            <Link to="/terms-of-service" className="py-2.5 px-2 transition-colors hover:text-white sm:py-2">
              Terms
            </Link>
            <Link to="/faq" className="py-2.5 px-2 transition-colors hover:text-white sm:py-2">
              Sitemap
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Scroll to Top Arrow */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed right-6 bottom-6 z-50 mb-[env(safe-area-inset-bottom)] flex cursor-pointer items-center justify-center rounded-full border-2 border-teal-400 bg-teal-500 p-3 text-white shadow-[0_8px_30px_rgba(14,165,164,0.3)] transition-all hover:scale-110 hover:bg-teal-600"
            aria-label="Back to Top"
          >
            <ArrowUp size={16} strokeWidth={3} />
          </motion.button>
        )}
      </AnimatePresence>
      {toastMsg && (
        <div className="animate-in slide-in-from-bottom-4 fixed right-4 bottom-4 z-[999] flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-600 shadow-lg dark:border-emerald-900/30 dark:bg-emerald-950/90 dark:text-emerald-400">
          <Check size={16} />
          {toastMsg}
        </div>
      )}
    </footer>
  );
};

export default Footer;
