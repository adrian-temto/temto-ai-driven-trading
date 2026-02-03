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
    <div>
      <Navbar />
      <HeroSection />
       <FeaturesSection />
       <HowItWorksSection />
       <WhyChooseTemtoSection/>
       <PricingSection/>
       <CaptainsLog/>
       <MarketInsights/>
       <FAQSection/>
       <Footer/>
    </div>
  );
}
