"use client";

import { useState } from "react";
import { STYLE } from "@/lib/style";
import { X, Copy, Check } from "lucide-react";

export default function ShareProject({ inviteCode, onClose }: { inviteCode: string; onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(32,48,43,0.4)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 50 }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: STYLE.paper, borderRadius: "20px 20px 0 0", padding: 22, width: "100%", maxWidth: 420, boxSizing: "border-box" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 18 }}>Mitreisende einladen</span>
          <button onClick={onClose} style={{ background: "none", border: "none" }}><X size={20} color="#9A9384" /></button>
        </div>
        <p style={{ fontSize: 13.5, color: "#6B6558", marginBottom: 14 }}>
          Teile diesen Code – jede Person meldet sich in der App an, tippt auf "Beitreten" und gibt ihn ein.
          Alle sehen dann dieselben Inhalte und können sie gemeinsam bearbeiten.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 10, background: STYLE.paperDim, borderRadius: 12, padding: "14px 16px" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 700, flex: 1, letterSpacing: 1 }}>{inviteCode}</span>
          <button onClick={handleCopy} style={{ background: STYLE.ink, border: "none", color: "#fff", borderRadius: 8, padding: "8px 12px", display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600 }}>
            {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Kopiert" : "Kopieren"}
          </button>
        </div>
      </div>
    </div>
  );
}
