import { Link } from 'react-router-dom';
import { Home, Search, AlertCircle } from 'lucide-react';
import { Navbar } from '../../components/vertex/Navbar';
import { Footer } from '../../components/vertex/Footer';

export const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA] text-gray-900 selection:bg-teal-500/30">
      <Navbar />

      <div className="relative flex flex-grow flex-col items-center justify-center px-4 pt-32 pb-24 text-center">
        {/* Signature vertical rhythm lines */}
        <div className="bg-vertical-grid" />

        <div className="relative z-10 mb-8">
          <div className="absolute inset-0 rounded-full bg-[var(--orbit-accent-primary)]/10 blur-[80px]" />
          <div className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-gray-100 bg-white shadow-sm">
            <AlertCircle size={32} className="text-[var(--orbit-accent-primary)]" />
          </div>
        </div>

        <h1 className="z-10 mb-4 text-6xl font-black tracking-tighter text-gray-900 italic md:text-7xl">
          404
        </h1>
        <h2 className="z-10 mb-4 font-sans text-xl font-bold text-gray-900">Sector Not Found</h2>

        <p className="z-10 mb-8 max-w-md text-sm leading-relaxed font-normal text-gray-500">
          The neural pathway you're trying to access doesn't exist or has been archived. Please
          verify the coordinates and try again.
        </p>

        <div className="z-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            to="/"
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[var(--orbit-accent-primary)] px-6 py-3 text-xs font-bold tracking-wider text-white uppercase shadow-sm transition-all hover:bg-[#0c9594] sm:w-auto"
          >
            <Home size={13} />
            Return Home
          </Link>
          <Link
            to="/help"
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-xs font-bold tracking-wider text-gray-700 uppercase transition-all hover:bg-gray-50 sm:w-auto"
          >
            <Search size={13} />
            Search Help Center
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;
