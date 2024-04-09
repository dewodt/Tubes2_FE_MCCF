"use client";

import type { Article, Path } from "@/types/api";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import * as React from "react";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

interface ResultGraphProps {
  articles: Article[];
  paths: Path[];
}

interface Node {
  id: number; // (unique) Index in articles: Article[] array. (Different from article ID.)
  title: string; // Title of the article
  url: string; // URL of the article
  degree: number; // Nth degree of separation from the source article
}

interface Link {
  source: number; // Source node id
  target: number; // Target node id
}

interface GraphData {
  nodes: Node[];
  links: Link[];
}

// Simple color generator
function getColor(i: number) {
  // Get color prefix
  const colors = [
    "#e11d48", // Red
    "#f97316", // Orange
    "#facc15", // Yellow
    "#16a34a", // Green
    "#2563eb", // Blue
    "#7c3aed", // Purple
    "#e27bb1", // Pink
    "#B45309", // Brown
    "#6b7280", // Gray
    "#18181b", // Dark Gray
  ] as const;

  return colors[i % colors.length];
}

// Get graph data
const getGraphData = (articles: Article[], paths: Path[]): GraphData => {
  const nodes: Node[] = [];
  const links: Link[] = [];

  paths.forEach((path) => {
    path.forEach((id, i) => {
      const article = articles[id];
      const node = nodes.find((node) => node.id === id);

      if (!node) {
        nodes.push({
          id: id,
          title: article.title,
          url: article.url,
          degree: i,
        });
      }

      if (i > 0) {
        links.push({
          source: path[i - 1],
          target: id,
        });
      }
    });
  });

  return { nodes, links };
};

const ResultGraph = ({ articles, paths }: ResultGraphProps) => {
  // Get graph data
  const graphData = getGraphData(articles, paths);

  // Calculate current window width size
  const [width, setWidth] = React.useState(0);
  React.useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Get current theme
  const { theme } = useTheme();

  // Canvas styles
  const canvasWidth = width < 640 ? 320 : width < 1024 ? 640 : 800;
  const textSize = 10;
  const textColor = theme === "dark" ? "white" : "black";

  // Node styles
  const nodeSize = 6;
  const nodeTextSeparation = 12;

  // Link styles
  const linkColor = theme === "dark" ? "#FFFFFF" : "#6b7280";
  const linkWidth = 2;
  const linkDirectionalArrowLength = 8;
  const linkDirectionalArrowRelPos = 1;

  return (
    <div className="rounded-lg border border-border">
      <ForceGraph2D
        // Force engine config
        // d3AlphaMin={0.01}
        // d3AlphaDecay={0.0001}
        // d3VelocityDecay={0.002}
        // Canvas setting
        width={canvasWidth}
        height={600}
        graphData={graphData}
        // Node setting
        nodeRelSize={nodeSize}
        nodeLabel={(node) => node.url}
        nodeColor={(node) => getColor(node.degree)}
        // nodeAutoColorBy={"degree"} // Problem: Cannot show color in legend?
        nodeCanvasObjectMode={() => "after"}
        nodeCanvasObject={(node, ctx, globalScale) => {
          // Draw node label
          const fontSize = textSize / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.fillStyle = textColor;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(
            node.title,
            node.x as number,
            (node.y as number) + nodeTextSeparation,
          );
        }}
        onNodeClick={(node) => {
          // Open article in new tab
          window.open(node.url, "_blank");
        }}
        // Link setting
        linkColor={linkColor} // Problem: Dark mode not working?
        linkWidth={linkWidth}
        linkDirectionalArrowLength={linkDirectionalArrowLength}
        linkDirectionalArrowColor={linkColor}
        linkDirectionalArrowRelPos={linkDirectionalArrowRelPos}
      />
    </div>
  );
};

export { ResultGraph };
