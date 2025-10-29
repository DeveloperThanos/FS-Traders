import HeroSection from './components/home/hero-section';
import AboutSection from './components/home/about';
import LeadersSection from './components/home/leaders';
import SupplierSection from './components/home/supplier';
import ProductsSection from './components/home/products';
import CTASection from './components/home/cta-section';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <LeadersSection />
      <SupplierSection />
      <ProductsSection />
      <CTASection />
    </main>
  );
}
