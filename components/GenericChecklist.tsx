"use client";

import { useState } from "react";
import { useItems } from "@/lib/useItems";
import { STYLE, cardStyle } from "@/lib/style";
import { Check, Plus } from "lucide-react";

export default function GenericChecklist({ projectId, section }: { projectId: string; section: string }) {
  const { items, loading, addItem, updateItem, deleteItem } = useItems(projectId, section);
  const [newCategory, setNewCategory] = useState("");
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");

  if (loading) return <p style={{ color: "#9A9384", fontSize: 14 }}>Lädt…</p>;

  const categories = Array.from(new Set(items.map((it) => it.data.category || "Sonstiges")));
  const total = items.length;
  const done = items.filter((it) => it.data.checked).length;

  const submitDraft = (cat: string) => {
    const text = (drafts[cat] || "").trim();
    if (!text) return;
    addItem({ category: cat, text, checked: false });
    setDrafts({ ...drafts, [cat]: "" });
  };

  const addCategory = () => {
    const cat = newCategory.trim();
    if (!cat) return;
    addItem({ category: cat, text: "Erster Punkt…", checked: false });
    setNewCategory("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 17 }}>Fortschritt</span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 600, color: STYLE.accent }}>{done}/{total}</span>
        </div>
        <div style={{ height: 6, background: STYLE.paperDim, borderRadius: 4, marginTop: 10, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${total ? (done / total) * 100 : 0}%`, background: STYLE.accent, transition: "width 0.3s" }} />
        </div>
      </div>

      {categories.map((cat) => {
        const catItems = items.filter((it) => (it.data.category || "Sonstiges") === cat);
        return (
          <div key={cat} style={cardStyle}>
            <div style={{ fontWeight: 700, fontSize: 14.5, marginBottom: 10 }}>{cat}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {catItems.map((it) => {
                const checked = !!it.data.checked;
                const isEditing = editingId === it.id;
                return (
                  <div key={it.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 4px" }}>
                    <div
                      onClick={() => updateItem(it.id, { ...it.data, checked: !checked })}
                      style={{
                        width: 20, height: 20, borderRadius: 6, flexShrink: 0, cursor: "pointer",
                        border: `2px solid ${checked ? STYLE.accent : "#C9C2B0"}`,
                        background: checked ? STYLE.accent : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      {checked && <Check size={13} color="#fff" strokeWidth={3} />}
                    </div>
                    {isEditing ? (
                      <input
                        autoFocus
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        onBlur={() => { updateItem(it.id, { ...it.data, text: editingText }); setEditingId(null); }}
                        onKeyDown={(e) => { if (e.key === "Enter") { updateItem(it.id, { ...it.data, text: editingText }); setEditingId(null); } }}
                        style={{ flex: 1, minWidth: 0, padding: "5px 8px", borderRadius: 7, border: `1px solid ${STYLE.accent}`, fontSize: 14 }}
                      />
                    ) : (
                      <span
                        onClick={() => { setEditingId(it.id); setEditingText(it.data.text); }}
                        style={{ flex: 1, minWidth: 0, fontSize: 14, cursor: "text", color: checked ? "#9A9384" : STYLE.ink, textDecoration: checked ? "line-through" : "none" }}
                      >
                        {it.data.text}
                      </span>
                    )}
                    <button onClick={() => deleteItem(it.id)} style={{ width: 22, height: 22, borderRadius: "50%", border: "none", background: "transparent", color: "#B8AF9C", fontSize: 15, fontWeight: 700 }}>×</button>
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <input
                type="text"
                placeholder="Punkt hinzufügen…"
                value={drafts[cat] || ""}
                onChange={(e) => setDrafts({ ...drafts, [cat]: e.target.value })}
                onKeyDown={(e) => { if (e.key === "Enter") submitDraft(cat); }}
                style={{ flex: 1, padding: "8px 11px", borderRadius: 9, border: "1px solid #E0D9C6", fontSize: 13.5, minWidth: 0 }}
              />
              <button onClick={() => submitDraft(cat)} style={{ padding: "8px 14px", borderRadius: 9, border: "none", background: STYLE.accent, color: "#fff", fontSize: 13.5, fontWeight: 600 }}>+</button>
            </div>
          </div>
        );
      })}

      <div style={cardStyle}>
        <div style={{ fontWeight: 700, fontSize: 14.5, marginBottom: 10 }}>Neue Kategorie</div>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            type="text"
            placeholder="z. B. Elektronik…"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") addCategory(); }}
            style={{ flex: 1, padding: "8px 11px", borderRadius: 9, border: "1px solid #E0D9C6", fontSize: 13.5, minWidth: 0 }}
          />
          <button onClick={addCategory} style={{ padding: "8px 14px", borderRadius: 9, border: "none", background: STYLE.ink, color: "#fff", fontSize: 13.5, fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
            <Plus size={14} /> Kategorie
          </button>
        </div>
      </div>
    </div>
  );
}
