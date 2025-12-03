import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import BusinessAreasSection from "@/components/home/BusinessAreasSection";
import NewsSection from "@/components/home/NewsSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <StatsSection />
      <BusinessAreasSection />
      <NewsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;