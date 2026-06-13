import { Hero } from '../components/vertex/Hero';
import { Navbar } from '../components/vertex/Navbar';
import { DashboardShowcase } from '../components/vertex/DashboardShowcase';
import { StatsSection } from '../components/vertex/StatsSection';
import { ProductCarousel } from '../components/vertex/ProductCarousel';
import { FeatureDeepDive } from '../components/vertex/FeatureDeepDive';
import { HowItWorks } from '../components/vertex/HowItWorks';
import { FeaturesSection } from '../components/vertex/FeaturesSection';
import { BenefitsSection } from '../components/vertex/BenefitsSection';
import { Testimonials } from '../components/vertex/Testimonials';
import { IntegrationsSection } from '../components/vertex/IntegrationsSection';
import { Pricing } from '../components/vertex/Pricing';
import { FAQAccordion } from '../components/vertex/FAQAccordion';
import { ContactSection } from '../components/vertex/ContactSection';
import { FinalCTA } from '../components/vertex/FinalCTA';
import { Footer } from '../components/vertex/Footer';

export const Home = () => {
  return (
    <div className="min-h-screen bg-white transition-colors duration-300 dark:bg-[#0B0F19]">
      {/* Navbar always overlays the hero */}
      <Navbar />

      {/* Hero */}
      <main id="main-content"><Hero /></main>

      {/* All content sections */}
      <div className="relative z-20 -mt-[25svh] md:-mt-[40svh] overflow-x-hidden bg-white text-gray-900 transition-colors duration-300 dark:bg-[#0B0F19] dark:text-gray-100">
        <DashboardShowcase />
        <ProductCarousel />
        <FeatureDeepDive />
        <StatsSection />
        <HowItWorks />
        <FeaturesSection />
        <BenefitsSection />
        <Testimonials />
        <IntegrationsSection />
        <Pricing />
        <FAQAccordion />
        <ContactSection />
        <FinalCTA />
      </div>
      <Footer />
    </div>
  );
};
