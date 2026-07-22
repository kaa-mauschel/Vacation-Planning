"use client";

import { useState } from "react";
import { useItems } from "@/lib/useItems";
import { STYLE, cardStyle } from "@/lib/style";
import { MapPin, Plus, X } from "lucide-react";

function mapsDirectionsLink(from: string, to: string) {
  return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(from)}&destination=${encodeURIComponent(to)}&travelmode=driving`;
}

export default function RouteTab({ projectId }: { projectId: string }) {
  const { items, loading, addItem, deleteItem } = useItems(projectId, "route");
  const [form, setForm] = useState({ from: "", to: "", date: "", km: "", h: "" });

  if (loading) return <p style={{ color: "#9A9384", fontSize: 14 }}>Lädt…</p>;

  const submit = () => {
    if (!form.from.trim() || !form.to.trim()) return;
    addItem(form, items.length);
    setForm({ from: "", to: "", date: "", km: "", h: "" });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={cardStyle}>
        <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 17, marginBottom: 10 }}>Route</div>
        {items.length === 0 && <p style={{ fontSize: 13.5, color: "#9A9384" }}>Noch keine Etappen eingetragen.</p>}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {items.map((it) => (
            <div key={it.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", background: STYLE.paperDim, borderRadius: 10 }}>
              <a
                href={mapsDirectionsLink(it.data.from, it.data.to)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ flex: 1, display: "flex", justifyContent: "space-between", alignItems: "center", textDecoration: "none", color: "inherit", gap: 8 }}
              >
                <span style={{ fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                  {it.data.from} → {it.data.to} <MapPin size={12} color={STYLE.accent4} />
                </span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, color: "#6B6558", textAlign: "right" }}>
                  {it.data.date ? `${it.data.date} · ` : ""}{it.data.km} {it.data.h && `· ${it.data.h}`}
                </span>
              </a>
              <button onClick={() => deleteItem(it.id)} style={{ background: "none", border: "none", color: "#B8AF9C" }}><X size={15} /></button>
            </div>
          ))}
        </div>
      </div>

      <div style={cardStyle}>
        <div style={{ fontWeight: 700, fontSize: 14.5, marginBottom: 10 }}>Etappe hinzufügen</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", gap: 8 }}>
            <input placeholder="Von" value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} style={inputStyle} />
            <input placeholder="Nach" value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })} style={inputStyle} />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <input placeholder="Datum (z. B. 12. Aug.)" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} style={inputStyle} />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <input placeholder="≈ km" value={form.km} onChange={(e) => setForm({ ...form, km: e.target.value })} style={inputStyle} />
            <input placeholder="≈ Std." value={form.h} onChange={(e) => setForm({ ...form, h: e.target.value })} style={inputStyle} />
          </div>
          <button onClick={submit} style={{ padding: "10px 0", borderRadius: 9, border: "none", background: STYLE.ink, color: "#fff", fontSize: 13.5, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <Plus size={14} /> Etappe speichern
          </button>
        </div>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "9px 11px",
  borderRadius: 9,
  border: "1px solid #E0D9C6",
  fontSize: 13.5,
  width: "100%",
  fontFamily: "inherit",
  minWidth: 0,
};
