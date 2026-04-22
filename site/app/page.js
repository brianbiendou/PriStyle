import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Marquee from "./components/Marquee/Marquee";
import GenderSection from "./components/GenderSection/GenderSection";
import CategoryCards from "./components/CategoryCards/CategoryCards";
import MarriageSection from "./components/MarriageSection/MarriageSection";
import EnfantSection from "./components/EnfantSection/EnfantSection";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import ScrollReveal from "./components/ScrollReveal/ScrollReveal";
import PopularCarousel from "./components/PopularCarousel/PopularCarousel";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <PopularCarousel />
        <GenderSection />
        <CategoryCards />
        <MarriageSection />
        <EnfantSection />
        <About />
        <Contact />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
