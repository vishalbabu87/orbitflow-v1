import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { OrbitLogo } from '../../components/ui/OrbitLogo';

export const ThankYou = () => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#FAFAFA] p-6 text-gray-900 selection:bg-teal-500/30">
      <div className="pointer-events-none absolute h-[500px] w-[500px] rounded-full bg-[var(--orbit-accent-primary)]/5 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex w-full max-w-md flex-col items-center text-center"
      >
        <div className="mb-8">
          <OrbitLogo showText={true} size={36} />
        </div>

        <div className="flex w-full flex-col items-center rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-[0_2px_8px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.03)]">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
            <CheckCircle2 size={24} />
          </div>

          <h1 className="mb-3 font-sans text-2xl font-extrabold text-gray-900 md:text-3xl">
            Thank you!
          </h1>
          <p className="mx-auto mb-8 max-w-xs text-xs leading-relaxed font-normal text-gray-500">
            Your action was completed successfully. We have registered your inquiry and sent
            confirmation details directly to your email.
          </p>

          <Link
            to="/"
            className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-[var(--orbit-accent-primary)] py-4 text-xs font-bold tracking-wider text-white uppercase shadow-sm transition-all hover:bg-[#0c9594]"
          >
            Return to Homepage <ArrowRight size={14} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
export default ThankYou;
