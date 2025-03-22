
import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ApplicationForm from "@/components/ApplicationForm";
import NewsSection from "@/components/NewsSection";
import ContactSection from "@/components/ContactSection";
import { NewsProvider } from "@/context/NewsContext";
import { LegalProvider } from "@/context/LegalContext";

const Index = () => {
  return (
    <NewsProvider>
      <LegalProvider>
        <Layout>
          <HeroSection />
          <ServicesSection />
          <ApplicationForm />
          <NewsSection />
          <ContactSection />
        </Layout>
      </LegalProvider>
    </NewsProvider>
  );
};

export default Index;
