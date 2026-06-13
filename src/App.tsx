import React, { useEffect, useState, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AppShell } from './components/layout/AppShell';

import { usePageMeta } from './hooks/usePageMeta';
import { ProtectedRoute } from './components/layout/ProtectedRoute';

declare global {
  interface Window {
    lenis?: {
      scrollTo: (target: number, options: { immediate: boolean }) => void;
      resize: () => void;
    };
  }
}

const Home = React.lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })));
const HomeChatbot = React.lazy(() =>
  import('./pages/HomeChatbot').then((m) => ({ default: m.HomeChatbot }))
);
const HomeWorkflow = React.lazy(() =>
  import('./pages/HomeWorkflow').then((m) => ({ default: m.HomeWorkflow }))
);
const HomeMobileApp = React.lazy(() =>
  import('./pages/HomeMobileApp').then((m) => ({ default: m.HomeMobileApp }))
);
const HomeCRM = React.lazy(() => import('./pages/HomeCRM').then((m) => ({ default: m.HomeCRM })));
const HomeAnalyticsPlatform = React.lazy(() =>
  import('./pages/HomeAnalyticsPlatform').then((m) => ({ default: m.HomeAnalyticsPlatform }))
);
const HomeAgency = React.lazy(() =>
  import('./pages/HomeAgency').then((m) => ({ default: m.HomeAgency }))
);
const HomeProjectManagement = React.lazy(() =>
  import('./pages/HomeProjectManagement').then((m) => ({ default: m.HomeProjectManagement }))
);
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Analytics = React.lazy(() => import('./pages/Analytics'));
const HelpDocs = React.lazy(() => import('./pages/HelpDocs'));
const Settings = React.lazy(() => import('./pages/Settings'));
const Features = React.lazy(() =>
  import('./pages/Features').then((m) => ({ default: m.Features }))
);
const NotFound = React.lazy(() => import('./pages/utility/NotFound'));
const Blank = React.lazy(() => import('./pages/utility/Blank'));
const Login = React.lazy(() => import('./pages/auth/Login'));
const Register = React.lazy(() => import('./pages/auth/Register'));
const ForgotPassword = React.lazy(() => import('./pages/auth/ForgotPassword'));
const ResetPassword = React.lazy(() => import('./pages/auth/ResetPassword'));
const Pricing = React.lazy(() => import('./pages/Pricing'));
const FAQ = React.lazy(() => import('./pages/FAQ'));
const UIKit = React.lazy(() => import('./pages/UIKit').then((m) => ({ default: m.UIKit })));
const Transactions = React.lazy(() => import('./pages/Transactions'));
const Invoices = React.lazy(() => import('./pages/Invoices'));
const Developers = React.lazy(() => import('./pages/Developers'));
const Executions = React.lazy(() => import('./pages/Executions'));
const Integrations = React.lazy(() => import('./pages/Integrations'));
const Auth = React.lazy(() => import('./pages/Auth').then((m) => ({ default: m.Auth })));
const About = React.lazy(() => import('./pages/About'));
const Team = React.lazy(() => import('./pages/Team'));
const Careers = React.lazy(() => import('./pages/Careers'));
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));
const ScheduleDemo = React.lazy(() => import('./pages/ScheduleDemo'));
const PricingDetailed = React.lazy(() => import('./pages/PricingDetailed'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = React.lazy(() => import('./pages/TermsOfService'));
const ComingSoon = React.lazy(() => import('./pages/utility/ComingSoon'));
const ThankYou = React.lazy(() => import('./pages/utility/ThankYou'));

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      document.documentElement.scrollTo(0, 0);
      document.body.scrollTo(0, 0);
    }
    
    // Check for lenis loaded asynchronously to prevent scroll restoration issues
    let checks = 0;
    const interval = setInterval(() => {
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
        window.lenis.resize();
        clearInterval(interval);
      }
      checks++;
      if (checks > 30) clearInterval(interval);
    }, 50);

    const timer = setTimeout(() => {
      if (!hash) {
        window.scrollTo(0, 0);
        document.documentElement.scrollTo(0, 0);
        document.body.scrollTo(0, 0);
      }
      if (window.lenis) {
        window.lenis.resize();
      }
    }, 100);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [pathname, hash]);

  return null;
}

function App() {
  usePageMeta();
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const location = useLocation();

  const isDashboardRoute = [
    '/dashboard', '/settings', '/analytics', '/help', 
    '/executions', '/integrations', '/transactions', 
    '/invoices', '/developers'
  ].some(path => location.pathname.startsWith(path));

  useEffect(() => {
    if (isDashboardRoute) return;
    const consented = localStorage.getItem('orbitflow-cookies-accepted');
    if (!consented) {
      const timer = setTimeout(() => setShowCookieConsent(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [isDashboardRoute]);

  const handleAccept = () => {
    localStorage.setItem('orbitflow-cookies-accepted', 'true');
    setShowCookieConsent(false);
  };

  const handleDecline = () => {
    setShowCookieConsent(false);
  };

  return (
    <AppShell>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-xl focus:bg-[var(--orbit-surface)] focus:p-4 focus:text-[var(--orbit-accent-primary)] focus:shadow-2xl focus:outline-none focus:ring-4 focus:ring-[var(--orbit-accent-primary)]/50"
      >
        Skip to main content
      </a>
      <ScrollToTop />
      <Suspense
        fallback={
          <div
            className="flex min-h-screen items-center justify-center bg-[var(--orbit-base)]"
            role="status"
            aria-label="Loading page"
          >
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--orbit-accent-primary)] border-t-transparent"></div>
          </div>
        }
      >
        <Routes>
          {/* Landing / Marketing pages */}
          <Route path="/" element={<Home />} />
          <Route path="/home-chatbot" element={<HomeChatbot />} />
          <Route path="/home-workflow" element={<HomeWorkflow />} />
          <Route path="/home-mobile-app" element={<HomeMobileApp />} />
          <Route path="/home-crm" element={<HomeCRM />} />
          <Route path="/home-analytics-platform" element={<HomeAnalyticsPlatform />} />
          <Route path="/home-agency" element={<HomeAgency />} />
          <Route path="/home-project-management" element={<HomeProjectManagement />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/faq" element={<FAQ />} />

          {/* Inner Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/schedule-demo" element={<ScheduleDemo />} />
          <Route path="/pricing-detailed" element={<PricingDetailed />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/404" element={<NotFound />} />

          {/* Dashboard App */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dashboard/mobile" element={<ProtectedRoute><Dashboard forceMobile={true} /></ProtectedRoute>} />
          <Route path="/dashboard/desktop" element={<ProtectedRoute><Dashboard forceMobile={false} /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          <Route path="/help" element={<ProtectedRoute><HelpDocs /></ProtectedRoute>} />
          <Route path="/executions" element={<ProtectedRoute><Executions /></ProtectedRoute>} />
          <Route path="/integrations" element={<ProtectedRoute><Integrations /></ProtectedRoute>} />

          {/* Old routes kept for compatibility */}
          <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
          <Route path="/invoices" element={<ProtectedRoute><Invoices /></ProtectedRoute>} />
          <Route path="/developers" element={<ProtectedRoute><Developers /></ProtectedRoute>} />

          {/* Auth */}
          <Route path="/auth" element={<Auth />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />

          {/* Utility */}
          <Route path="/ui-kit" element={<UIKit />} />
          <Route path="/blank" element={<Blank />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      {/* Premium Cookie Consent Banner */}
      <AnimatePresence>
        {showCookieConsent && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-6 bottom-6 left-6 z-[9999] flex flex-col gap-4 rounded-[2.5rem] border border-[var(--orbit-border-mid)] bg-[var(--orbit-elevated)]/90 p-5 text-left shadow-[0_20px_50px_rgba(0,0,0,0.15)] backdrop-blur-xl md:right-8 md:left-auto md:max-w-md dark:shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
          >
            <div className="flex flex-col gap-1.5">
              <span className="block font-mono text-xs font-bold tracking-[0.25em] text-[var(--orbit-accent-primary)] uppercase">
                Cookie Settings
              </span>
              <h4 className="text-sm font-extrabold text-[var(--orbit-text-primary)]">
                We value your privacy
              </h4>
              <p className="text-xs leading-relaxed font-normal text-[var(--orbit-text-secondary)]">
                We use cookies to enhance your browsing experience, serve personalized content, and
                analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
              </p>
            </div>
            <div className="flex w-full items-center gap-3">
              <button
                type="button"
                onClick={handleDecline}
                className="flex-1 cursor-pointer rounded-xl border border-[var(--orbit-border)] py-2.5 text-center text-xs font-bold text-[var(--orbit-text-primary)] transition-all duration-300 hover:bg-[var(--orbit-border)]/50 active:scale-95"
              >
                Reject All
              </button>
              <button
                type="button"
                onClick={handleAccept}
                className="flex-1 cursor-pointer rounded-xl bg-[var(--orbit-accent-primary)] py-2.5 text-center text-xs font-bold text-white shadow-[0_4px_12px_rgba(14,165,164,0.25)] transition-all duration-300 hover:scale-[1.02] hover:opacity-90 hover:shadow-[0_4px_16px_rgba(14,165,164,0.4)] active:scale-95"
              >
                Accept All
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppShell>
  );
}

export default App;
