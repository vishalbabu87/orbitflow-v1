import { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';

export const LogoMarquee = () => {
  const [speed, setSpeed] = useState(window.innerWidth < 768 ? 30 : 50);

  useEffect(() => {
    const handleResize = () => setSpeed(window.innerWidth < 768 ? 30 : 50);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const integrations = [
    {
      name: 'FlowSync',
      logo: (
        <svg
          className="mr-3 h-[32px] w-[32px] shrink-0 fill-current text-[var(--orbit-accent-primary)]"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="4" />
          <circle cx="5" cy="12" r="3" />
          <circle cx="19" cy="12" r="3" />
          <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    {
      name: 'DocSpace',
      logo: (
        <svg
          className="mr-3 h-[32px] w-[32px] shrink-0 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
    },
    {
      name: 'CloudDrive',
      logo: (
        <svg
          className="mr-3 h-[32px] w-[32px] shrink-0 text-[#06B6D4]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.5 19A3.5 3.5 0 0 0 21 15.5c0-2.79-2.54-4.5-5-4.5-.47 0-.89.09-1.25.26a5 5 0 1 0-8.25 4.74" />
          <path d="M12 13v9" />
          <path d="M9 19l3 3 3-3" />
        </svg>
      ),
    },
    {
      name: 'CRMify',
      logo: (
        <svg
          className="mr-3 h-[32px] w-[32px] shrink-0 text-[#E01E5A]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
    {
      name: 'TaskVault',
      logo: (
        <svg
          className="mr-3 h-[32px] w-[32px] shrink-0 text-[#ECB22E]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
    },
    {
      name: 'LinkNode',
      logo: (
        <svg
          className="mr-3 h-[32px] w-[32px] shrink-0 text-[#4F46E5]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      ),
    },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-transparent py-1">
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee
          pauseOnHover={true}
          speed={speed}
          gradient={false}
          play={true}
          loop={0}
          className="w-full py-0.5"
        >
          {/* Render integrations twice to prevent gaps during animation wrap-around */}
          {[...integrations, ...integrations, ...integrations].map((company, index) => (
            <div key={company.name + '-' + index} className="flex shrink-0 items-center">
              <div className="group flex cursor-pointer items-center px-4 md:px-10 py-0.5 select-none">
                {company.logo}
                <span className="font-['Outfit'] text-xl md:text-2xl font-extrabold text-white tracking-tight">
                  {company.name}
                </span>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default LogoMarquee;
