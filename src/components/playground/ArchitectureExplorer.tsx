"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scenarios, type Scenario } from "./scenarios";
import { ArchitectureDiagram } from "./ArchitectureDiagram";

export function ArchitectureExplorer() {
  const [selected, setSelected] = useState<Scenario | null>(null);
  const [step, setStep] = useState(0);

  const handleSelect = (scenario: Scenario) => {
    setSelected(scenario);
    setStep(0);
  };

  const handleNext = () => {
    if (selected && step < selected.steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleReset = () => {
    setSelected(null);
    setStep(0);
  };

  return (
    <div className="space-y-8">
      {/* Scenario selector */}
      <AnimatePresence mode="wait">
        {!selected ? (
          <motion.div
            key="selector"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {scenarios.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => handleSelect(scenario)}
                className="text-left bg-card border-2 border-card-border rounded-lg p-6 hover:border-accent/60 transition-all group"
              >
                <div className="font-mono text-xs text-accent bg-muted px-3 py-2 rounded mb-3 inline-block tracking-tight">
                  {scenario.icon}
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-accent transition-colors">
                  {scenario.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {scenario.description}
                </p>
              </button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="diagram"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-3">
                  <span className="font-mono text-xs text-accent bg-muted px-2 py-1 rounded">{selected.icon}</span>
                  {selected.title}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Step {step + 1} of {selected.steps.length}
                </p>
              </div>
              <button
                onClick={handleReset}
                className="px-4 py-2 text-sm border border-card-border rounded-lg hover:bg-muted transition-colors"
              >
                ← Back to scenarios
              </button>
            </div>

            {/* Diagram */}
            <ArchitectureDiagram scenario={selected} currentStep={step} />

            {/* Step explanation */}
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card border border-card-border rounded-xl p-6"
            >
              <h3 className="font-bold text-accent mb-2">
                {selected.steps[step].title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {selected.steps[step].explanation}
              </p>
              {selected.steps[step].pattern && (
                <div className="mt-4 font-mono text-sm text-accent">
                  <span className="text-muted-foreground">{"// "}</span>
                  <span className="uppercase tracking-wider text-xs">pattern</span>
                  <span className="text-muted-foreground">{" · "}</span>
                  {selected.steps[step].pattern}
                </div>
              )}
            </motion.div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrev}
                disabled={step === 0}
                className="px-5 py-2.5 border border-card-border rounded-lg hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <div className="flex gap-1.5">
                {selected.steps.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i <= step ? "bg-accent" : "bg-card-border"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={handleNext}
                disabled={step === selected.steps.length - 1}
                className="px-5 py-2.5 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
