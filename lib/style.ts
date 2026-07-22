import type { CSSProperties } from "react";

export const STYLE = {
  ink: "#20302B",
  paper: "#FBF7EE",
  paperDim: "#F1EADA",
  accent: "#3E6E52",
  accent2: "#C1793B",
  accent3: "#77689A",
  accent4: "#2A6E8C",
  warn: "#8A5A1E",
  danger: "#D96C6C",
};

export const FONTS_IMPORT =
  "@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap');";

export const cardStyle: CSSProperties = {
  background: STYLE.paper,
  borderRadius: 16,
  padding: 16,
  boxShadow: "0 1px 2px rgba(32,48,43,0.06)",
};
