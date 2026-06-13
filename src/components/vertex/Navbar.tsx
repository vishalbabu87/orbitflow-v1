import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ChevronRight, Sun, Moon } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { OrbitLogo } from '../ui/OrbitLogo';
import { useTheme } from '../../hooks/useTheme';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Showcase', href: '/#showcase' },
  { name: 'Features', href: '/#features' },
  { name: 'Pricing', href: '/#pricing' },
];

const solutionPages = [
  { name: 'AI Chatbot & Waitlist', href: '/home-chatbot' },
  { name: 'Marketing Automation', href: '/home-workflow' },
  { name: 'Startup Mobile App', href: '/home-mobile-app' },
  { name: 'CRM & Sales Platform', href: '/home-crm' },
  { name: 'Data Analytics Platform', href: '/home-analytics-platform' },
  { name: 'Digital Creative Agency', href: '/home-agency' },
  { name: 'Project Management', href: '/home-project-management' },
];

const innerPages = [
  { name: 'About Us', href: '/about' },
  { name: 'Our Team', href: '/team' },
  { name: 'Careers', href: '/careers' },
  { name: 'Blog', href: '/blog' },
  { name: 'Detailed Pricing', href: '/pricing-detailed' },
  { name: 'Contact Page', href: '/contact' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Schedule Demo', href: '/schedule-demo' },
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms of Service', href: '/terms-of-service' },
  { name: '404 Page', href: '/404' },
  { name: 'Coming Soon', href: '/coming-soon' },
  { name: 'Thank You', href: '/thank-you' },
];

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  // Only the homepage has a dark hero, so we use white text on it when unscrolled
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    // Initialize on mount based on current scroll
    setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    navigate(href);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={cn(
          'fixed top-0 left-0 z-[1000] h-[92px] w-full transition-all duration-500',
          isScrolled || !isHome
            ? 'border-b border-[var(--orbit-border-subtle)] bg-[var(--orbit-base)]/90 backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        )}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:justify-center lg:gap-4 lg:px-8">
          {/* LEFT: Rebranded Logo */}
          <div className="flex items-center">
            <Link to="/" aria-label="OrbitFlow Home" className="cursor-pointer">
              <OrbitLogo
                showText={true}
                className="w-7 h-7 sm:w-[32px] sm:h-[32px] lg:w-[37px] lg:h-[37px]"
                textClass={cn(
                  'text-base sm:text-lg lg:text-xl',
                  isScrolled || !isHome
                    ? 'text-[var(--orbit-text-primary)]'
                    : 'text-white'
                )}
              />
            </Link>
          </div>

          {/* CENTER: Desktop Links */}
          <div className="hidden items-center lg:flex">
            <div
              className={cn(
                'relative flex items-center gap-4 rounded-2xl border px-6 py-2 backdrop-blur-md transition-all duration-300',
                isScrolled || !isHome
                  ? 'border-[var(--orbit-border-subtle)] bg-[var(--orbit-surface)]/45'
                  : 'border-white/10 bg-white/5'
              )}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={(e) => {
                    if (link.href.startsWith('/#')) {
                      const id = link.href.substring(2);
                      if (location.pathname === '/') {
                        e.preventDefault();
                        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                  className={cn(
                    'font-mono text-sm font-bold tracking-[0.2em] uppercase transition-colors duration-300 xl:text-sm',
                    isScrolled || !isHome
                      ? location.pathname === link.href
                        ? 'text-[var(--orbit-accent-primary)]'
                        : 'text-[var(--orbit-text-primary)] hover:text-[var(--orbit-accent-primary)]'
                      : location.pathname === link.href
                        ? 'text-white'
                        : 'text-white/80 hover:text-white'
                  )}
                >
                  {link.name}
                </Link>
              ))}

              {/* Custom Dropdown for Solutions */}
              <div
                className="relative"
                onMouseEnter={() => setSolutionsOpen(true)}
                onMouseLeave={() => setSolutionsOpen(false)}
                onFocus={() => setSolutionsOpen(true)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget)) {
                    setSolutionsOpen(false);
                  }
                }}
              >
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={solutionsOpen}
                  aria-label="Toggle solutions drop-down menu"
                  className={cn(
                    'flex cursor-pointer items-center gap-1.5 font-mono text-sm font-bold tracking-[0.2em] uppercase transition-colors duration-300 xl:text-sm',
                    isScrolled || !isHome
                      ? solutionsOpen
                        ? 'text-[var(--orbit-accent-primary)]'
                        : 'text-[var(--orbit-text-primary)] hover:text-[var(--orbit-accent-primary)]'
                      : solutionsOpen
                        ? 'text-white'
                        : 'text-white/80 hover:text-white'
                  )}
                >
                  Solutions{' '}
                  <ChevronDown
                    size={11}
                    className={cn(
                      'transition-transform duration-300',
                      solutionsOpen ? 'rotate-180' : ''
                    )}
                  />
                </button>

                <AnimatePresence>
                  {solutionsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      data-lenis-prevent="true"
                      className="absolute top-full left-1/2 z-[1100] mt-3 max-h-[360px] w-56 -translate-x-1/2 custom-scrollbar overflow-y-auto overscroll-contain rounded-2xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] p-2 shadow-xl backdrop-blur-2xl before:absolute before:-top-3 before:left-0 before:h-3 before:w-full"
                    >
                      <div className="grid grid-cols-1 gap-0.5">
                        {solutionPages.map((page) => (
                          <Link
                            key={page.name}
                            to={page.href}
                            onClick={() => setSolutionsOpen(false)}
                            className="group flex items-center justify-between rounded-xl px-[18px] py-[11px] text-left text-sm font-semibold text-[var(--orbit-text-secondary)] transition-all hover:bg-[var(--orbit-base)] hover:text-[var(--orbit-text-primary)]"
                          >
                            {page.name}
                            <ChevronRight
                              size={10}
                              className="opacity-0 transition-opacity group-hover:opacity-100"
                            />
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Custom Dropdown for Pages */}
              <div
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
                onFocus={() => setDropdownOpen(true)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget)) {
                    setDropdownOpen(false);
                  }
                }}
              >
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                  aria-label="Toggle pages drop-down menu"
                  className={cn(
                    'flex cursor-pointer items-center gap-1.5 font-mono text-sm font-bold tracking-[0.2em] uppercase transition-colors duration-300 xl:text-sm',
                    isScrolled || !isHome
                      ? dropdownOpen
                        ? 'text-[var(--orbit-accent-primary)]'
                        : 'text-[var(--orbit-text-primary)] hover:text-[var(--orbit-accent-primary)]'
                      : dropdownOpen
                        ? 'text-white'
                        : 'text-white/80 hover:text-white'
                  )}
                >
                  Pages{' '}
                  <ChevronDown
                    size={11}
                    className={cn(
                      'transition-transform duration-300',
                      dropdownOpen ? 'rotate-180' : ''
                    )}
                  />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      data-lenis-prevent="true"
                      className="absolute top-full left-1/2 z-[1100] mt-3 max-h-[360px] w-56 -translate-x-1/2 custom-scrollbar overflow-y-auto overscroll-contain rounded-2xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] p-2 shadow-xl backdrop-blur-2xl before:absolute before:-top-3 before:left-0 before:h-3 before:w-full"
                    >
                      <div className="grid grid-cols-1 gap-0.5">
                        {innerPages.map((page) => (
                          <Link
                            key={page.name}
                            to={page.href}
                            onClick={() => setDropdownOpen(false)}
                            className="group flex items-center justify-between rounded-xl px-[18px] py-[11px] text-left text-sm font-semibold text-[var(--orbit-text-secondary)] transition-all hover:bg-[var(--orbit-base)] hover:text-[var(--orbit-text-primary)]"
                          >
                            {page.name}
                            <ChevronRight
                              size={10}
                              className="opacity-0 transition-opacity group-hover:opacity-100"
                            />
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to="/#contact"
                onClick={(e) => {
                  if (location.pathname === '/') {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={cn(
                  'font-mono text-sm font-bold tracking-[0.2em] uppercase transition-colors duration-300 xl:text-sm',
                  isScrolled || !isHome
                    ? location.pathname === '/contact'
                      ? 'text-[var(--orbit-accent-primary)]'
                      : 'text-[var(--orbit-text-primary)] hover:text-[var(--orbit-accent-primary)]'
                    : location.pathname === '/contact'
                      ? 'text-white'
                      : 'text-white/80 hover:text-white'
                )}
              >
                Contact
              </Link>
            </div>
          </div>

          {/* RIGHT: CTAs */}
          <div className="hidden items-center gap-4 lg:flex">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className={cn(
                'flex-shrink-0 cursor-pointer rounded-xl border p-2.5 transition-all xl:p-[11px]',
                isScrolled || !isHome
                  ? 'border-black/10 bg-white/50 text-[var(--orbit-text-primary)] hover:bg-white/80 dark:border-white/12 dark:bg-white/[0.06] dark:hover:bg-white/[0.12]'
                  : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
              )}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <Link
              to="/auth/login"
              className={cn(
                'flex-shrink-0 rounded-xl border px-4 py-2 text-sm font-black tracking-widest whitespace-nowrap uppercase transition-all xl:px-[18px] xl:py-[9px] xl:text-sm',
                isScrolled || !isHome
                  ? 'border-black/10 bg-white/50 text-[var(--orbit-text-primary)] backdrop-blur-sm hover:border-black/18 hover:bg-white/80 dark:border-white/12 dark:bg-white/[0.06] dark:hover:bg-white/20 dark:hover:bg-white/[0.12]'
                  : 'border-white/10 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10'
              )}
            >
              Sign In
            </Link>
            <Link
              to="/auth/register"
              className="group relative flex flex-shrink-0 items-center gap-1.5 overflow-hidden rounded-xl bg-[var(--orbit-accent-primary)] px-5 py-2 text-sm font-black tracking-widest whitespace-nowrap text-white uppercase transition-all hover:shadow-[0_0_20px_rgba(14,165,164,0.4)] xl:gap-2 xl:px-[26px] xl:py-[11px] xl:text-sm"
            >
              <div className="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-300 group-hover:translate-y-0"></div>
              <span className="relative z-10">Get Started</span>
              <ChevronRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* MOBILE: Toggle */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className={cn(
                'flex cursor-pointer items-center justify-center p-1.5 sm:p-2 transition-colors',
                isScrolled || !isHome
                  ? 'text-[var(--orbit-text-primary)] hover:text-[var(--orbit-accent-primary)]'
                  : 'text-white hover:text-[var(--orbit-accent-primary)]'
              )}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
              ) : (
                <Moon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
              )}
            </button>
            <button
              type="button"
              aria-label="Toggle mobile menu drawer navigation"
              className={cn(
                'flex h-10 w-10 sm:h-12 sm:w-12 cursor-pointer items-center justify-center rounded-lg transition-colors',
                isScrolled || !isHome
                  ? 'text-[var(--orbit-text-primary)] hover:text-[var(--orbit-accent-primary)]'
                  : 'text-white hover:text-[var(--orbit-accent-primary)]'
              )}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
              ) : (
                <Menu className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[2000] flex lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/35 backdrop-blur-xs"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="mobile-drawer relative flex h-full w-72 flex-col bg-[var(--orbit-base)] shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="mobile-drawer-header flex h-[56px] sm:h-[64px] shrink-0 items-center justify-between border-b border-[var(--orbit-border-subtle)] px-6">
                <OrbitLogo
                  showText={true}
                  className="w-7 h-7 sm:w-[32px] sm:h-[32px]"
                  textClass="text-base sm:text-lg text-[var(--orbit-text-primary)]"
                />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close Menu"
                  className="cursor-pointer rounded-lg p-1 text-gray-400 transition hover:bg-white/5 hover:text-[var(--orbit-text-primary)]"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Drawer Content */}
              <div
                data-lenis-prevent="true"
                className="mobile-drawer-content flex min-h-0 flex-1 custom-scrollbar flex-col gap-2 overflow-y-auto p-4"
              >
                {navLinks.map((link, idx) => (
                  <div key={link.name} className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (link.href.startsWith('/#')) {
                          const id = link.href.substring(2);
                          setMobileMenuOpen(false);
                          if (location.pathname === '/') {
                            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                          } else {
                            navigate(link.href);
                          }
                        } else {
                          handleLinkClick(link.href);
                        }
                      }}
                      className="mobile-drawer-btn block w-full py-3 text-left text-xs font-bold tracking-[0.15em] text-gray-700 uppercase transition-colors hover:text-[var(--orbit-accent-primary)] dark:text-gray-300 dark:hover:text-[var(--orbit-accent-primary)]"
                    >
                      {link.name}
                    </button>
                    {idx < navLinks.length && (
                      <div className="h-px bg-[var(--orbit-border-subtle)]" />
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                  className="mobile-drawer-btn flex w-full py-3 items-center justify-between text-left text-xs font-bold tracking-[0.15em] text-gray-700 uppercase transition-colors hover:text-[var(--orbit-accent-primary)] dark:text-gray-300 dark:hover:text-[var(--orbit-accent-primary)]"
                >
                  <span>Solutions</span>
                  <ChevronDown
                    className={cn(
                      'h-3.5 w-3.5 transition-transform',
                      mobileSolutionsOpen ? 'rotate-180' : ''
                    )}
                  />
                </button>

                {mobileSolutionsOpen && (
                  <div className="mt-1 flex flex-col gap-2 pb-1.5 pl-3">
                    <div className="mb-1 h-px bg-[var(--orbit-border-subtle)]" />
                    {solutionPages.map((page, idx) => (
                      <div key={page.name} className="flex shrink-0 flex-col gap-2">
                        <Link
                          to={page.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block w-full py-2.5 text-left text-xs font-semibold text-[var(--orbit-text-secondary)] transition-colors hover:text-[var(--orbit-accent-primary)]"
                        >
                          {page.name}
                        </Link>
                        {idx < solutionPages.length - 1 && (
                          <div className="h-px bg-[var(--orbit-border-subtle)]" />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className="my-1 h-px bg-[var(--orbit-border-subtle)]" />

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (location.pathname === '/') {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      navigate('/#contact');
                    }
                  }}
                  className="mobile-drawer-btn text-left text-xs font-bold tracking-[0.15em] text-gray-700 uppercase transition-colors hover:text-[var(--orbit-accent-primary)] dark:text-gray-300 dark:hover:text-[var(--orbit-accent-primary)]"
                >
                  Contact
                </button>

                <div className="my-1 h-px bg-[var(--orbit-border-subtle)]" />

                <button
                  type="button"
                  onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                  className="mobile-drawer-btn flex w-full items-center justify-between text-left text-xs font-bold tracking-[0.15em] text-gray-700 uppercase transition-colors hover:text-[var(--orbit-accent-primary)] dark:text-gray-300 dark:hover:text-[var(--orbit-accent-primary)]"
                >
                  <span>Pages</span>
                  <ChevronDown
                    className={cn(
                      'h-3.5 w-3.5 transition-transform',
                      mobileDropdownOpen ? 'rotate-180' : ''
                    )}
                  />
                </button>

                {mobileDropdownOpen && (
                  <div className="mt-1 flex flex-col gap-2 pb-1.5 pl-3">
                    <div className="mb-1 h-px bg-[var(--orbit-border-subtle)]" />
                    {innerPages.map((page, idx) => (
                      <div key={page.name} className="flex shrink-0 flex-col gap-2">
                        <Link
                          to={page.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-1.5 text-left text-xs font-semibold text-[var(--orbit-text-secondary)] transition-colors hover:text-[var(--orbit-accent-primary)]"
                        >
                          {page.name}
                        </Link>
                        {idx < innerPages.length - 1 && (
                          <div className="h-px bg-[var(--orbit-border-subtle)]" />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className="my-1 h-px bg-[var(--orbit-border-subtle)]" />
              </div>

              {/* Drawer Footer CTA */}
              <div className="mobile-drawer-footer flex shrink-0 flex-col gap-2 border-t border-[var(--orbit-border-subtle)] p-4">
                <Link
                  to="/auth/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] py-2.5 text-center text-xs font-bold tracking-wider text-[var(--orbit-text-primary)] uppercase"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full rounded-xl bg-[var(--orbit-accent-primary)] py-2.5 text-center text-xs font-extrabold tracking-wider text-white uppercase shadow-[0_0_10px_rgba(14,165,164,0.25)]"
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
