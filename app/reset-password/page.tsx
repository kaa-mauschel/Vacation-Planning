"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { STYLE, FONTS_IMPORT } from "@/lib/style";
import { Luggage, Lock } from "lucide-react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Supabase erkennt den Recovery-Link in der URL automatisch (detectSessionInUrl)
    // und legt kurz danach eine Sitzung an. Wir warten kurz darauf.
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });
    // Falls die Sitzung schon beim Laden da ist (z. B. Seite neu geladen)
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    const { error } = await supabase.auth.updateUser({ password });
    setSaving(false);
    if (error) {
      setError(error.message);
      return;
    }
    setSuccess(true);
    setTimeout(() => router.replace("/projects"), 1500);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, background: STYLE.paperDim }}>
      <style>{FONTS_IMPORT}</style>
      <div style={{ width: "100%", maxWidth: 380, background: STYLE.paper, borderRadius: 20, padding: 28, boxShadow: "0 4px 20px rgba(32,48,43,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: STYLE.ink, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Luggage size={20} color={STYLE.paper} />
          </div>
          <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 22 }}>Neues Passwort</span>
        </div>

        {success ? (
          <div style={{ background: "#E4EFE7", borderRadius: 12, padding: "14px 16px", fontSize: 14, color: "#2F4A3A" }}>
            Passwort gespeichert! Du wirst weitergeleitet…
          </div>
        ) : !ready ? (
          <p style={{ fontSize: 13.5, color: "#6B6558" }}>
            Einen Moment, der Link wird geprüft… Falls hier nichts passiert, ist der Link evtl. abgelaufen –
            fordere auf der Anmeldeseite über "Passwort vergessen?" einen neuen an.
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Neues Passwort</label>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6, marginBottom: 14, border: "1px solid #E0D9C6", borderRadius: 10, padding: "10px 12px" }}>
              <Lock size={16} color="#9A9384" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="mindestens 6 Zeichen"
                style={{ border: "none", outline: "none", flex: 1, fontSize: 14, background: "transparent" }}
              />
            </div>
            {error && <div style={{ color: STYLE.danger, fontSize: 13, marginBottom: 10 }}>{error}</div>}
            <button
              type="submit"
              disabled={saving}
              style={{ width: "100%", padding: "12px 0", borderRadius: 10, border: "none", background: STYLE.ink, color: STYLE.paper, fontSize: 14.5, fontWeight: 600, opacity: saving ? 0.7 : 1 }}
            >
              {saving ? "Wird gespeichert…" : "Passwort speichern"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
