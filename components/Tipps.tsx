"use client";

import { useState } from "react";
import { useItems } from "@/lib/useItems";
import { STYLE, cardStyle } from "@/lib/style";
import { Lightbulb, Plus, X } from "lucide-react";

export default function Tipps({ projectId }: { projectId: string }) {
  const { items, loading, addItem, deleteItem } = useItems(projectId, "tipp");
  const [form, setForm] = useState({ title: "", text: "" });

  if (loading) return <p style={{ color: "#9A9384", fontSize: 14 }}>Lädt…</p>;

  const submit = () => {
    if (!form.title.trim()) return;
    addItem(form);
    setForm({ title: "", text: "" });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {items.map((it) => (
        <div key={it.id} style={cardStyle}>
          <div style={{ display: "flex", gap: 10 }}>
            <Lightbulb size={17} color={STYLE.accent2} style={{ flexShrink: 0, marginTop: 1 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14.5 }}>{it.data.title}</div>
              {it.data.text && <p style={{ fontSize: 13.5, color: "#4A453C", lineHeight: 1.6, margin: "5px 0 0" }}>{it.data.text}</p>}
            </div>
            <button onClick={() => deleteItem(it.id)} style={{ background: "none", border: "none", color: "#C9C2B0" }}><X size={16} /></button>
          </div>
        </div>
      ))}

      <div style={{ ...cardStyle, display: "flex", flexDirection: "column", gap: 8 }}>
        <input placeholder="Titel" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} style={inputStyle} />
        <textarea placeholder="Beschreibung" value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} rows={2} style={inputStyle} />
        <button onClick={submit} style={{ padding: "9px 0", borderRadius: 9, border: "none", background: STYLE.ink, color: "#fff", fontSize: 13.5, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <Plus size={14} /> Tipp hinzufügen
        </button>
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
};
