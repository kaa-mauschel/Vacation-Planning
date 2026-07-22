"use client";

import { useState } from "react";
import { useItems } from "@/lib/useItems";
import { STYLE, cardStyle } from "@/lib/style";
import { Plus, X } from "lucide-react";

export default function Kosten({ projectId }: { projectId: string }) {
  const { items, loading, addItem, deleteItem } = useItems(projectId, "kosten");
  const [form, setForm] = useState({ kategorie: "", betrag: "" });

  if (loading) return <p style={{ color: "#9A9384", fontSize: 14 }}>Lädt…</p>;

  const total = items.reduce((sum, it) => sum + (Number(it.data.betrag) || 0), 0);

  const submit = () => {
    if (!form.kategorie.trim() || !form.betrag) return;
    addItem(form);
    setForm({ kategorie: "", betrag: "" });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={cardStyle}>
        <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 17 }}>Gesamtkosten</span>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 32, fontWeight: 600, marginTop: 8 }}>
          {total.toLocaleString("de-DE")} €
        </div>
      </div>

      <div style={cardStyle}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {items.map((it) => (
            <div key={it.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 13, flex: 1 }}>{it.data.kategorie}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13.5, fontWeight: 600 }}>{Number(it.data.betrag).toLocaleString("de-DE")} €</span>
              <button onClick={() => deleteItem(it.id)} style={{ background: "none", border: "none", color: "#B8AF9C" }}><X size={15} /></button>
            </div>
          ))}
          {items.length === 0 && <p style={{ fontSize: 13.5, color: "#9A9384" }}>Noch keine Kosten eingetragen.</p>}
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <input placeholder="Kategorie (z. B. Unterkunft)" value={form.kategorie} onChange={(e) => setForm({ ...form, kategorie: e.target.value })} style={{ ...inputStyle, flex: 2 }} />
          <input placeholder="€" type="number" value={form.betrag} onChange={(e) => setForm({ ...form, betrag: e.target.value })} style={{ ...inputStyle, flex: 1 }} />
          <button onClick={submit} style={{ padding: "0 14px", borderRadius: 9, border: "none", background: STYLE.accent, color: "#fff", fontWeight: 600 }}><Plus size={16} /></button>
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
  fontFamily: "inherit",
  minWidth: 0,
};
