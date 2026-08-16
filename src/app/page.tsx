import LoadingScreen from "@/components/LoadingScreen";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SocialOperations from "@/components/SocialOperations";
import SoftwareDevelopment from "@/components/SoftwareDevelopment";
import GraphicDesign from "@/components/GraphicDesign";
import CommandCenter from "@/components/CommandCenter";
import Process from "@/components/Process";
import WhyUzayrox from "@/components/WhyUzayrox";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen">
      <LoadingScreen />
      <Header />
      
      <div className="relative z-10 w-full flex flex-col">
        <HeroSection />
        <SocialOperations />
        <SoftwareDevelopment />
        <GraphicDesign />
        <CommandCenter />
        <Process />
        <WhyUzayrox />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
