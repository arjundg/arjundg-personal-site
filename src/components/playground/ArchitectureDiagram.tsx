"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type Scenario } from "./scenarios";

const NODE_W = 160;
const NODE_H = 36;

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
      x: (col + offsetX) * 210 + 105,
      y: row * 120 + 60,
    };
  });

  return positions;
}

// Check if a straight line between two points would pass through a node's bounding box
function lineIntersectsNode(
  from: { x: number; y: number },
  to: { x: number; y: number },
  node: { x: number; y: number }
): boolean {
  const halfW = NODE_W / 2 + 8; // slight padding
  const halfH = NODE_H / 2 + 8;

  // Parametric line: P = from + t*(to - from), t in [0,1]
  const dx = to.x - from.x;
  const dy = to.y - from.y;

  // Find t range where line is within node's x bounds
  let tMinX = 0, tMaxX = 1;
  if (dx !== 0) {
    const t1 = (node.x - halfW - from.x) / dx;
    const t2 = (node.x + halfW - from.x) / dx;
    tMinX = Math.min(t1, t2);
    tMaxX = Math.max(t1, t2);
  } else if (Math.abs(from.x - node.x) > halfW) {
    return false;
  }

  // Find t range where line is within node's y bounds
  let tMinY = 0, tMaxY = 1;
  if (dy !== 0) {
    const t1 = (node.y - halfH - from.y) / dy;
    const t2 = (node.y + halfH - from.y) / dy;
    tMinY = Math.min(t1, t2);
    tMaxY = Math.max(t1, t2);
  } else if (Math.abs(from.y - node.y) > halfH) {
    return false;
  }

  // Intersection exists if t ranges overlap within (0.05, 0.95) — exclude endpoints
  const tMin = Math.max(tMinX, tMinY, 0.05);
  const tMax = Math.min(tMaxX, tMaxY, 0.95);

  return tMin < tMax;
}

// Compute the curve offset needed to avoid intermediate nodes
function getEdgeCurveOffset(
  from: { x: number; y: number },
  to: { x: number; y: number },
  allNodes: { x: number; y: number }[],
  edgeIndex: number
): number {
  let hasCollision = false;
  for (const node of allNodes) {
    // Skip source and target nodes
    if ((node.x === from.x && node.y === from.y) || (node.x === to.x && node.y === to.y)) continue;
    if (lineIntersectsNode(from, to, node)) {
      hasCollision = true;
      break;
    }
  }
  if (!hasCollision) return 0;
  // Alternate curve direction based on edge index
  const direction = edgeIndex % 2 === 0 ? -1 : 1;
  return direction * 50;
}

interface ArchitectureDiagramProps {
  scenario: Scenario;
  currentStep: number;
}

export function ArchitectureDiagram({ scenario, currentStep }: ArchitectureDiagramProps) {
  const step = scenario.steps[currentStep];
  const positions = getNodePositions(step.nodes);
  const width = Math.min(step.nodes.length, 4) * 210 + 40;
  const rows = Math.ceil(step.nodes.length / 4);
  const height = rows * 120 + 60;
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // Reset selected node when step changes
  useEffect(() => {
    setSelectedNode(null);
  }, [currentStep]);

  const allNodePositions = step.nodes.map((n) => positions[n]).filter(Boolean);
  const hasDetails = !!scenario.nodeDetails;

  return (
    <div className="bg-card border-2 border-card-border rounded-lg p-4 overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full max-w-full"
        style={{ height: `${height + 20}px` }}
      >
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

        {/* Edges — curved around intermediate nodes */}
        <AnimatePresence>
          {step.edges.map(([from, to], i) => {
            const fromPos = positions[from];
            const toPos = positions[to];
            if (!fromPos || !toPos) return null;

            const curveOffset = getEdgeCurveOffset(fromPos, toPos, allNodePositions, i);

            if (curveOffset === 0) {
              // Straight line — compute border points
              const midTarget = toPos;
              const midSource = fromPos;
              const halfW = NODE_W / 2;
              const halfH = NODE_H / 2;

              const dx = midTarget.x - midSource.x;
              const dy = midTarget.y - midSource.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist === 0) return null;

              // Start point: exit from source border
              let startScale: number;
              if (Math.abs(dx) * halfH > Math.abs(dy) * halfW) {
                startScale = halfW / Math.abs(dx);
              } else {
                startScale = halfH / Math.abs(dy);
              }
              const start = { x: midSource.x + dx * startScale, y: midSource.y + dy * startScale };

              // End point: enter target border
              let endScale: number;
              if (Math.abs(dx) * halfH > Math.abs(dy) * halfW) {
                endScale = halfW / Math.abs(dx);
              } else {
                endScale = halfH / Math.abs(dy);
              }
              const end = { x: midTarget.x - dx * endScale, y: midTarget.y - dy * endScale };

              return (
                <motion.line
                  key={`${from}-${to}-${currentStep}`}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  x1={start.x}
                  y1={start.y}
                  x2={end.x}
                  y2={end.y}
                  stroke="var(--accent)"
                  strokeWidth="2"
                  strokeOpacity="0.5"
                  markerEnd="url(#arrowhead)"
                />
              );
            } else {
              // Curved path — compute control point perpendicular to the line
              const mx = (fromPos.x + toPos.x) / 2;
              const my = (fromPos.y + toPos.y) / 2;
              const dx = toPos.x - fromPos.x;
              const dy = toPos.y - fromPos.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              // Perpendicular unit vector
              const px = -dy / dist;
              const py = dx / dist;
              const cx = mx + px * curveOffset;
              const cy = my + py * curveOffset;

              // Compute start/end at border by aiming toward control point direction
              const halfW = NODE_W / 2;
              const halfH = NODE_H / 2;

              const startDx = cx - fromPos.x;
              const startDy = cy - fromPos.y;
              let startScale: number;
              if (Math.abs(startDx) * halfH > Math.abs(startDy) * halfW) {
                startScale = halfW / Math.abs(startDx);
              } else {
                startScale = halfH / Math.abs(startDy);
              }
              const start = { x: fromPos.x + startDx * startScale, y: fromPos.y + startDy * startScale };

              const endDx = cx - toPos.x;
              const endDy = cy - toPos.y;
              let endScale: number;
              if (Math.abs(endDx) * halfH > Math.abs(endDy) * halfW) {
                endScale = halfW / Math.abs(endDx);
              } else {
                endScale = halfH / Math.abs(endDy);
              }
              const end = { x: toPos.x + endDx * endScale, y: toPos.y + endDy * endScale };

              const path = `M ${start.x} ${start.y} Q ${cx} ${cy} ${end.x} ${end.y}`;

              return (
                <motion.path
                  key={`${from}-${to}-${currentStep}`}
                  d={path}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  stroke="var(--accent)"
                  strokeWidth="2"
                  strokeOpacity="0.5"
                  fill="none"
                  markerEnd="url(#arrowhead)"
                />
              );
            }
          })}
        </AnimatePresence>

        {/* Nodes */}
        <AnimatePresence>
          {step.nodes.map((node, i) => {
            const pos = positions[node];
            if (!pos) return null;
            const isNew =
              currentStep > 0 &&
              !scenario.steps[currentStep - 1].nodes.includes(node);
            const isSelected = selectedNode === node;
            const isClickable = hasDetails && !!scenario.nodeDetails?.[node];

            return (
              <motion.g
                key={`${node}-${currentStep}`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: isNew ? 0.3 + i * 0.05 : i * 0.05,
                }}
                onClick={() => isClickable && setSelectedNode(isSelected ? null : node)}
                className={isClickable ? "cursor-pointer" : ""}
              >
                <rect
                  x={pos.x - 80}
                  y={pos.y - 18}
                  width="160"
                  height="36"
                  rx="8"
                  fill={isSelected ? "var(--accent)" : isNew ? "var(--accent)" : "var(--muted)"}
                  fillOpacity={isSelected ? 0.3 : isNew ? 0.2 : 1}
                  stroke={isSelected ? "var(--accent)" : isNew ? "var(--accent)" : "var(--card-border)"}
                  strokeWidth={isSelected ? "2.5" : "1.5"}
                />
                <text
                  x={pos.x}
                  y={pos.y + 5}
                  textAnchor="middle"
                  className="text-[11px] font-medium fill-foreground"
                >
                  {node.length > 20 ? node.slice(0, 19) + "…" : node}
                </text>
                {/* Clickable indicator dot */}
                {isClickable && (
                  <circle
                    cx={pos.x + 74}
                    cy={pos.y - 12}
                    r="3"
                    fill="var(--accent)"
                    fillOpacity={isSelected ? 1 : 0.6}
                  />
                )}
              </motion.g>
            );
          })}
        </AnimatePresence>
      </svg>

      {/* Node detail panel */}
      {hasDetails && (
        <AnimatePresence>
          {selectedNode && scenario.nodeDetails?.[selectedNode] && (
            <motion.div
              key={selectedNode}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="mt-3 border-2 border-accent/30 rounded-lg p-4 bg-muted"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm flex items-center gap-2">
                    <span className="text-accent font-mono text-xs">▸</span>
                    {selectedNode}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {scenario.nodeDetails[selectedNode].role}
                  </p>
                  <div className="mt-3 space-y-2">
                    <div>
                      <span className="font-mono text-xs text-accent uppercase tracking-wider">// tech</span>
                      <p className="text-sm mt-0.5">{scenario.nodeDetails[selectedNode].tech}</p>
                    </div>
                    <div>
                      <span className="font-mono text-xs text-accent uppercase tracking-wider">// why</span>
                      <p className="text-sm text-muted-foreground mt-0.5">{scenario.nodeDetails[selectedNode].why}</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="text-muted-foreground hover:text-foreground text-sm px-2 py-1 shrink-0"
                  aria-label="Close detail"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
      {hasDetails && !selectedNode && (
        <p className="text-xs text-muted-foreground mt-2 font-mono">
          Click a node with <span className="text-accent">●</span> to see tech details
        </p>
      )}
    </div>
  );
}
