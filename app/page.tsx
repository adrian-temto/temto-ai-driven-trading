import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import WhyChooseTemtoSection from "@/components/WhyChooseTemtoSection";
import PricingSection from "@/components/PricingSection";
import CaptainsLog from "@/components/CaptainsLog";
import MarketInsights from "@/components/MarketInsights";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--bg-primary)]">
      
      {/* === GLOBAL DECORATIVE ELLIPSE (RIGHT HALF VISIBLE) === */}
      <div className="absolute top-[45%] right-0 z-0 pointer-events-none">
        <div
          className="w-[1200px] h-[600px] rounded-full blur-[140px] opacity-20"
          style={{
            transform: "translateX(50%)",
            background:
              "radial-gradient(ellipse at center, #D062B2 0%, #D062B2 35%, transparent 70%)",
          }}
        />
      </div>

      {/* === PAGE CONTENT === */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />

        {/* === BLOBS BETWEEN HOW IT WORKS & WHY CHOOSE === */}
        <div className="relative w-full pointer-events-none -mt-16 md:-mt-20">
          {/* Right blob 1 */}
          <div className="absolute right-[-15%] top-0 w-[480px] h-[480px] rounded-full bg-[#D062B2]/25 blur-[120px]" />
          {/* Right blob 2 */}
          <div className="absolute right-[5%] top-[80px] w-[360px] h-[360px] rounded-full bg-[#D062B2]/20 blur-[100px]" />
          {/* Left blob */}
          <div className="absolute left-[-10%] top-[40px] w-[420px] h-[420px] rounded-full bg-[#D062B2]/20 blur-[110px]" />
        </div>

        <WhyChooseTemtoSection />
        
        <PricingSection />
        
        {/* Decorative blob for Captains Log */}
        <div className="relative w-full pointer-events-none -mt-12 md:-mt-16">
          <div className="absolute left-[-10%] top-0 w-[500px] h-[500px] rounded-full bg-[var(--glow-purple)]/25 blur-[120px]" />
        </div>
        
        <CaptainsLog />
        
        {/* Decorative blobs for Market Insights */}
        <div className="relative w-full pointer-events-none -mt-12 md:-mt-16">
          <div className="absolute right-0 top-0 w-[400px] h-[400px] rounded-full bg-[var(--glow-cyan)]/25 blur-[120px]" />
        </div>
        
        <MarketInsights />
        
        {/* Decorative blob for FAQ */}
        <div className="relative w-full pointer-events-none -mt-12 md:-mt-16">
          <div className="absolute right-0 top-0 w-[500px] h-[500px] rounded-full bg-[var(--glow-cyan)]/25 blur-[120px]" />
        </div>
        
        <FAQSection />
        <Footer />
      </div>
    </div>
  );
}
