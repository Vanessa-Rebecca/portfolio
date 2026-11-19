import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { RevealController } from "@/components/motion/RevealController";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { AIML } from "@/components/sections/AIML";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { ProjectDialog } from "@/components/projects/ProjectDialog";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[90] rounded-full bg-fg px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <SmoothScroll />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <AIML />
        <Contact />
      </main>
      <Footer buildYear={new Date().getFullYear()} />
      <ProjectDialog />
      <RevealController />
    </>
  );
}
