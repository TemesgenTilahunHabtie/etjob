import HeroSection from "@/components/home/HeroSection";
import FeaturedJobs from "@/components/home/FeaturedJobs";
import HowItWorks from "@/components/home/HowItWorks";
import TelegramFeature from "@/components/home/TelegramFeature";
import EmployerCTA from "@/components/home/EmployerCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedJobs />
      <HowItWorks />
      <TelegramFeature />
      <EmployerCTA />
    </>
  );
}