"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/lib/useUser";
import { STYLE, FONTS_IMPORT } from "@/lib/style";
import { SECTIONS } from "@/lib/types";
import type { Project } from "@/lib/types";
import GenericChecklist from "@/components/GenericChecklist";
import GenericCardList from "@/components/GenericCardList";
import RouteTab from "@/components/RouteTab";
import Unterkuenfte from "@/components/Unterkuenfte";
import Kosten from "@/components/Kosten";
import Tagesplanung from "@/components/Tagesplanung";
import Tipps from "@/components/Tipps";
import ShareProject from "@/components/ShareProject";
import {
  ArrowLeft, MapPin, Backpack, ClipboardList, Home, Wallet,
  Utensils, Sparkles, Star, CalendarDays, Lightbulb, Share2,
} from "lucide-react";

const TABS = [
  { id: "packliste", label: "Packliste", icon: Backpack },
  { id: "vorabreise", label: "Vor der Abreise", icon: ClipboardList },
  { id: "route", label: "Route", icon: MapPin },
  { id: "unterkuenfte", label: "Unterkünfte", icon: Home },
  { id: "kosten", label: "Kosten", icon: Wallet },
  { id: "essen", label: "Essen & Trinken", icon: Utensils },
  { id: "aktivitaeten", label: "Aktivitäten", icon: Sparkles },
  { id: "mustdo", label: "Must-Dos", icon: Star },
  { id: "tagesplan", label: "Tagesplanung", icon: CalendarDays },
  { id: "tipps", label: "Tipps", icon: Lightbulb },
];

export default function ProjectPage() {
  const params = useParams();
  const projectId = params?.id as string;
  const router = useRouter();
  const { user, loading: userLoading } = useUser();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("packliste");
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    if (!userLoading && !user) router.replace("/login");
  }, [userLoading, user, router]);

  useEffect(() => {
    if (!projectId) return;
    (async () => {
      const { data, error } = await supabase.from("projects").select("*").eq("id", projectId).single();
      if (error || !data) {
        router.replace("/projects");
        return;
      }
      setProject(data as Project);
      setLoading(false);
    })();
  }, [projectId, router]);

  if (loading || !project) {
    return <div style={{ minHeight: "100vh", background: STYLE.paperDim }} />;
  }

  return (
    <div style={{ minHeight: "100vh", background: STYLE.paperDim, paddingBottom: 40 }}>
      <style>{FONTS_IMPORT}</style>

      <div style={{ background: STYLE.ink, color: STYLE.paper, padding: "20px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={() => router.push("/projects")} style={{ background: "none", border: "none", color: STYLE.paper, display: "flex", alignItems: "center", gap: 6, fontSize: 13, opacity: 0.8 }}>
            <ArrowLeft size={16} /> Meine Urlaube
          </button>
          <button onClick={() => setShowShare(true)} style={{ background: "none", border: "none", color: STYLE.paper, display: "flex", alignItems: "center", gap: 6, fontSize: 13, opacity: 0.9 }}>
            <Share2 size={16} /> Einladen
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
          <span style={{ fontSize: 26 }}>{project.emoji}</span>
          <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 24 }}>{project.name}</span>
        </div>
      </div>

      <div style={{ display: "flex", overflowX: "auto", gap: 6, padding: "14px 16px", background: STYLE.paper, position: "sticky", top: 0, zIndex: 10, borderBottom: `1px solid ${STYLE.paperDim}` }}>
        {TABS.map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                display: "flex", alignItems: "center", gap: 6, flexShrink: 0,
                padding: "8px 14px", borderRadius: 20, border: "none", cursor: "pointer",
                background: active ? STYLE.ink : STYLE.paperDim,
                color: active ? STYLE.paper : STYLE.ink,
                fontSize: 13, fontWeight: 600,
              }}
            >
              <Icon size={14} /> {t.label}
            </button>
          );
        })}
      </div>

      <div style={{ padding: "20px 16px", maxWidth: 720, margin: "0 auto" }}>
        {tab === "packliste" && <GenericChecklist projectId={project.id} section={SECTIONS.PACKLISTE} />}
        {tab === "vorabreise" && <GenericChecklist projectId={project.id} section={SECTIONS.VORABREISE} />}
        {tab === "route" && <RouteTab projectId={project.id} />}
        {tab === "unterkuenfte" && <Unterkuenfte projectId={project.id} />}
        {tab === "kosten" && <Kosten projectId={project.id} />}
        {tab === "essen" && (
          <GenericCardList projectId={project.id} section={SECTIONS.ESSEN} groupLabel="Ort/Station" extraFieldLabel="Adresse/Kontext für Maps" />
        )}
        {tab === "aktivitaeten" && (
          <GenericCardList projectId={project.id} section={SECTIONS.AKTIVITAET} groupLabel="Ort/Kategorie (z. B. Freibäder)" extraFieldLabel="Adresse/Kontext für Maps" />
        )}
        {tab === "mustdo" && (
          <GenericCardList projectId={project.id} section={SECTIONS.MUSTDO} groupLabel="Region" extraFieldLabel="Adresse/Kontext für Maps" />
        )}
        {tab === "tagesplan" && <Tagesplanung projectId={project.id} />}
        {tab === "tipps" && <Tipps projectId={project.id} />}
      </div>

      {showShare && <ShareProject inviteCode={project.invite_code} onClose={() => setShowShare(false)} />}
    </div>
  );
}
