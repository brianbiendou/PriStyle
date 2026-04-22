import Hero from "./components/Hero/Hero";
import Marquee from "./components/Marquee/Marquee";
import GenderSection from "./components/GenderSection/GenderSection";
import CategoryCards from "./components/CategoryCards/CategoryCards";
import MarriageSection from "./components/MarriageSection/MarriageSection";
import EnfantSection from "./components/EnfantSection/EnfantSection";
import Contact from "./components/Contact/Contact";
import PopularCarousel from "./components/PopularCarousel/PopularCarousel";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <PopularCarousel />
      <GenderSection />
      <CategoryCards />
      <MarriageSection />
      <EnfantSection />
      <Contact />
    </main>
  );
}
