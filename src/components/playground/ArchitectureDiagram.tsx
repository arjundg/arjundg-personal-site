"use client";

import { motion, AnimatePresence } from "framer-motion";
import { type Scenario } from "./scenarios";

// Layout positions for nodes in a flow diagram
function getNodePositions(nodes: string[]): Record<string, { x: number; y: number }> {
  const positions: Record<string, { x: number; y: number }> = {};
  const cols = Math.min(nodes.length, 4);
  const rows = Math.ceil(nodes.length / cols);

  nodes.forEach((node, i) => {
    const row = Math.floor(i / cols);
    const col = i % cols;
    const totalInRow = Math.min(cols, nodes.length - row * cols);
    const offsetX = (cols - totalInRow) * 0.5;

    positions[node] = {
      x: (col + offsetX) * 180 + 90,
      y: row * 120 + 60,
    };
  });

  return positions;
}

interface ArchitectureDiagramProps {
  scenario: Scenario;
  currentStep: number;
}

export function ArchitectureDiagram({ scenario, currentStep }: ArchitectureDiagramProps) {
  const step = scenario.steps[currentStep];
  const positions = getNodePositions(step.nodes);
  const width = Math.min(step.nodes.length, 4) * 180 + 40;
  const rows = Math.ceil(step.nodes.length / 4);
  const height = rows * 120 + 60;

  return (
    <div className="bg-card border border-card-border rounded-xl p-6 overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full max-w-full"
        style={{ minHeight: `${Math.max(250, height)}px`, maxHeight: "400px" }}
      >
        {/* Edges */}
        <AnimatePresence>
          {step.edges.map(([from, to], i) => {
            const fromPos = positions[from];
            const toPos = positions[to];
            if (!fromPos || !toPos) return null;

            return (
              <motion.line
                key={`${from}-${to}-${currentStep}`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                x1={fromPos.x}
                y1={fromPos.y}
                x2={toPos.x}
                y2={toPos.y}
                stroke="var(--accent)"
                strokeWidth="2"
                strokeOpacity="0.4"
                markerEnd="url(#arrowhead)"
              />
            );
          })}
        </AnimatePresence>

        {/* Arrow marker */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="8"
            markerHeight="6"
            refX="8"
            refY="3"
            orient="auto"
          >
            <polygon
              points="0 0, 8 3, 0 6"
              fill="var(--accent)"
              fillOpacity="0.6"
            />
          </marker>
        </defs>

        {/* Nodes */}
        <AnimatePresence>
          {step.nodes.map((node, i) => {
            const pos = positions[node];
            if (!pos) return null;
            const isNew =
              currentStep > 0 &&
              !scenario.steps[currentStep - 1].nodes.includes(node);

            return (
              <motion.g
                key={`${node}-${currentStep}`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: isNew ? 0.3 + i * 0.05 : i * 0.05,
                }}
              >
                <rect
                  x={pos.x - 60}
                  y={pos.y - 18}
                  width="120"
                  height="36"
                  rx="8"
                  fill={isNew ? "var(--accent)" : "var(--muted)"}
                  fillOpacity={isNew ? 0.2 : 1}
                  stroke={isNew ? "var(--accent)" : "var(--card-border)"}
                  strokeWidth="1.5"
                />
                <text
                  x={pos.x}
                  y={pos.y + 5}
                  textAnchor="middle"
                  className="text-[11px] font-medium fill-foreground"
                >
                  {node.length > 16 ? node.slice(0, 15) + "…" : node}
                </text>
              </motion.g>
            );
          })}
        </AnimatePresence>
      </svg>
    </div>
  );
}
