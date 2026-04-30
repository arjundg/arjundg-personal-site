import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { NodePathDivider } from "@/components/SystemMotif";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Arjun K Dasgupta",
  jobTitle: "AI Solution Architect & Engineering Leader",
  url: "https://arjunkdasgupta.com",
  sameAs: [
    "https://linkedin.com/in/arjunkdasgupta",
    "https://github.com/arjundg",
  ],
  email: "arjun.k.dasgupta@gmail.com",
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
      <Experience />
      <NodePathDivider />
      <Projects />
      <NodePathDivider />
      <Skills />
      <Contact />
    </>
  );
}
