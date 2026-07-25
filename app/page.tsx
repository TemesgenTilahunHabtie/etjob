import HeroSection from "@/components/home/HeroSection";
import FeaturedJobs from "@/components/home/FeaturedJobs";
import HowItWorks from "@/components/home/HowItWorks";
import TelegramFeature from "@/components/home/TelegramFeature";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedJobs />
      <HowItWorks />
      <TelegramFeature />
    </>
  );
}