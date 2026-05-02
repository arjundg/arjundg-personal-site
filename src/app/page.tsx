import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { NodePathDivider } from "@/components/SystemMotif";

export const metadata = {
  title: "Arjun K Dasgupta — AI Architect & Tech Lead",
  description:
    "Leadership in AI architecture, systems design, and engineering teams building reliable, compliant AI products.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Arjun K Dasgupta",
  jobTitle: "AI Solution Architect, Systems Designer & Engineering Leader",
  url: "https://arjunkdasgupta.com",
  sameAs: [
    "https://linkedin.com/in/arjunkdasgupta",
    "https://github.com/arjundg",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "London",
    addressCountry: "GB",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <NodePathDivider />
      <About />
      <NodePathDivider />
      <Projects />
      <NodePathDivider />
      <Experience />
      <NodePathDivider />
      <Skills />
      <Contact />
    </>
  );
}
