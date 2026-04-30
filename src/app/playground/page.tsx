import type { Metadata } from "next";
import { ArchitectureExplorer } from "@/components/playground/ArchitectureExplorer";

export const metadata: Metadata = {
  title: "AI Architecture Playground — Arjun K Dasgupta",
  description:
    "Interactive AI architecture pattern explorer. Pick a problem and see the right architecture emerge step-by-step.",
};

export default function PlaygroundPage() {
  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            AI Architecture Pattern Explorer
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select a problem below and watch the right architecture emerge
            step-by-step. Each pattern is chosen based on real-world constraints
            I&apos;ve encountered building AI systems for regulated industries.
          </p>
        </div>
        <ArchitectureExplorer />
      </div>
    </div>
  );
}
