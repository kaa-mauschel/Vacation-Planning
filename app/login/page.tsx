"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/lib/useUser";
import { STYLE, FONTS_IMPORT } from "@/lib/style";
import { Luggage, Mail } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useUser();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!loading && user) router.replace("/projects");
  }, [loading, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSending(true);
    const redirectTo = typeof window !== "undefined" ? `${window.location.origin}/projects` : undefined;
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    });
    setSending(false);
    if (error) setError(error.message);
    else setSent(true);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, background: STYLE.paperDim }}>
      <style>{FONTS_IMPORT}</style>
      <div style={{ width: "100%", maxWidth: 380, background: STYLE.paper, borderRadius: 20, padding: 28, boxShadow: "0 4px 20px rgba(32,48,43,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: STYLE.ink, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Luggage size={20} color={STYLE.paper} />
          </div>
          <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 22 }}>Urlaubsplaner</span>
        </div>
        <p style={{ fontSize: 14, color: "#6B6558", margin: "10px 0 22px" }}>
          Gemeinsam Urlaube planen – Packliste, Route, Unterkünfte, Kosten und mehr, mit allen die mitkommen.
        </p>

        {sent ? (
          <div style={{ background: "#E4EFE7", borderRadius: 12, padding: "14px 16px", fontSize: 14, color: "#2F4A3A" }}>
            Link verschickt! Öffne die E-Mail von <strong>{email}</strong> und klicke auf den Anmelde-Link – du wirst dann direkt in die App weitergeleitet.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label style={{ fontSize: 13, fontWeight: 600, color: STYLE.ink }}>E-Mail-Adresse</label>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6, marginBottom: 14, border: "1px solid #E0D9C6", borderRadius: 10, padding: "10px 12px" }}>
              <Mail size={16} color="#9A9384" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="du@beispiel.de"
                style={{ border: "none", outline: "none", flex: 1, fontSize: 14, background: "transparent" }}
              />
            </div>
            {error && <div style={{ color: STYLE.danger, fontSize: 13, marginBottom: 10 }}>{error}</div>}
            <button
              type="submit"
              disabled={sending}
              style={{ width: "100%", padding: "12px 0", borderRadius: 10, border: "none", background: STYLE.ink, color: STYLE.paper, fontSize: 14.5, fontWeight: 600, opacity: sending ? 0.7 : 1 }}
            >
              {sending ? "Wird gesendet…" : "Anmelde-Link senden"}
            </button>
            <p style={{ fontSize: 12, color: "#9A9384", marginTop: 12, textAlign: "center" }}>
              Kein Passwort nötig – du bekommst einen Link per E-Mail.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
