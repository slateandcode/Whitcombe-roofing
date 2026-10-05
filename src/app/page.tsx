import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Setup from "@/components/Setup";
import Rebuild from "@/components/Rebuild";
import CornersCut from "@/components/CornersCut";
import ServicesCarousel from "@/components/ServicesCarousel";
import Work from "@/components/Work";
import SurveySteps from "@/components/SurveySteps";
import Reviews from "@/components/Reviews";
import AreasFaq from "@/components/AreasFaq";
import SurveyForm from "@/components/SurveyForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Setup />
        <Rebuild />
        <CornersCut />
        <ServicesCarousel />
        <Work />
        <SurveySteps />
        <Reviews />
        <AreasFaq />
        <SurveyForm />
      </main>
      <Footer />
    </>
  );
}
