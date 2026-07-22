# Urlaubsplaner – Setup-Anleitung

Diese Anleitung ist für absolute Anfänger geschrieben. Du brauchst keine Programmiererfahrung –
nur Copy & Paste und ein bisschen Geduld. Gesamtdauer: ca. 45–60 Minuten, einmalig.

Du hast bereits einen Account bei **Supabase** (Datenbank) und **Vercel** (Hosting) angelegt – gut,
dann geht's jetzt los.

---

## Schritt 1: Datenbank in Supabase einrichten (10 Min.)

1. Gehe zu [supabase.com](https://supabase.com) und logg dich ein.
2. Klicke auf **"New Project"**.
   - Name: z. B. `urlaubsplaner`
   - Datenbank-Passwort: irgendein sicheres Passwort, notiere es dir (brauchst du selten)
   - Region: am besten eine, die nah bei dir ist (z. B. Frankfurt/EU)
   - Klicke auf **"Create new project"** und warte ca. 1–2 Minuten, bis es fertig ist.
3. Wenn das Projekt fertig ist, klicke links im Menü auf **"SQL Editor"**.
4. Klicke auf **"New query"**.
5. Öffne die Datei `supabase/schema.sql` aus diesem Projektordner, kopiere den **kompletten Inhalt**
   und füge ihn in das Textfeld im SQL Editor ein.
6. Klicke auf **"Run"** (unten rechts, oder Strg/Cmd + Enter). Es sollte "Success" erscheinen.
   → Damit sind alle Tabellen, Regeln und Sicherheitseinstellungen fertig eingerichtet.

7. Jetzt die Zugangsdaten holen: Klicke links auf das Zahnrad **"Project Settings"** → **"API"**.
   Dort findest du zwei Werte, die du gleich brauchst:
   - **Project URL** (sieht aus wie `https://xxxxx.supabase.co`)
   - **anon public** Key (ein langer Text)
   Lass dieses Fenster offen oder kopiere beide Werte in eine Notiz.

8. **E-Mail-Login aktivieren** (ist normalerweise schon an): Gehe zu **"Authentication"** → **"Providers"**
   und stelle sicher, dass **"Email"** aktiviert ist. Unter **"Authentication" → "URL Configuration"**
   trägst du später (nach Schritt 3) deine Vercel-Adresse ein – dazu unten mehr.

---

## Schritt 2: Code zu GitHub hochladen (10 Min.)

Falls du noch keinen GitHub-Account hast: auf [github.com](https://github.com) kostenlos registrieren.

1. Auf GitHub oben rechts auf **"+"** → **"New repository"** klicken.
2. Name: z. B. `urlaubsplaner`. Auf **"Create repository"** klicken (Rest kann auf Standard bleiben).
3. Auf der nächsten Seite siehst du Befehle unter **"…or push an existing repository"**.
   Du musst den kompletten Ordner `urlaubsplaner-app` (den du von mir bekommen hast) in dieses
   Repository hochladen. Der einfachste Weg ohne Kommandozeile:
   - Auf der GitHub-Repo-Seite auf **"uploading an existing file"** klicken
   - Alle Dateien & Ordner aus `urlaubsplaner-app` per Drag & Drop reinziehen
   - Unten auf **"Commit changes"** klicken

   (Falls du dich mit der Kommandozeile auskennst, geht es natürlich auch per `git push` – aber das
   ist für den Anfang nicht nötig.)

---

## Schritt 3: Mit Vercel verbinden & live schalten (10 Min.)

1. Gehe zu [vercel.com](https://vercel.com) und logg dich mit deinem GitHub-Account ein.
2. Klicke auf **"Add New…" → "Project"**.
3. Wähle dein gerade hochgeladenes `urlaubsplaner`-Repository aus und klicke auf **"Import"**.
4. Bevor du auf "Deploy" klickst, klappe **"Environment Variables"** auf und trage genau diese zwei
   Werte ein (aus Schritt 1.7):
   - Name: `NEXT_PUBLIC_SUPABASE_URL` → Wert: deine Project URL
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY` → Wert: dein anon public Key
5. Klicke auf **"Deploy"**. Nach ca. 1–2 Minuten ist die App live, du bekommst einen Link wie
   `https://urlaubsplaner-xyz.vercel.app`.

6. **Wichtig – zurück zu Supabase:** Gehe zu **"Authentication" → "URL Configuration"** und trage
   bei **"Site URL"** deinen Vercel-Link ein (z. B. `https://urlaubsplaner-xyz.vercel.app`).
   Das sorgt dafür, dass der Login-Link in der E-Mail auch wirklich zu deiner App führt.

---

## Schritt 4: App aufs Handy holen (2 Min.)

1. Öffne den Vercel-Link auf deinem Handy im Browser (Safari bei iPhone, Chrome bei Android).
2. **iPhone:** Teilen-Symbol antippen → "Zum Home-Bildschirm".
   **Android:** Menü (drei Punkte) → "App installieren" bzw. "Zum Startbildschirm hinzufügen".
3. Fertig – jetzt liegt ein eigenes App-Icon auf dem Homescreen, öffnet ohne Browser-Leiste.

Schick den Link genauso an alle, die mitplanen sollen.

---

## Schritt 5: Ausprobieren

1. Öffne die App, gib deine E-Mail-Adresse ein, du bekommst einen Anmelde-Link per Mail.
2. Klick auf den Link in der Mail → du bist eingeloggt.
3. Leg über "Neuer Urlaub" dein erstes Projekt an.
4. Tippe oben rechts im Projekt auf "Einladen" → du bekommst einen Code, den du an Mitreisende
   schickst. Die melden sich in der App an, tippen auf "Beitreten" und geben den Code ein –
   danach sehen alle dieselben Inhalte live.

---

## Wie geht's danach weiter?

Alles, was du anders haben möchtest – neue Reiter, anderes Design, mehr Funktionen wie in deinem
ursprünglichen Prototyp (z. B. die grafische Route, Sommercard-Infos, Favoriten-Herzchen) – sag mir
einfach hier im Chat. Ich passe den Code an, du lädst die geänderten Dateien erneut auf GitHub hoch
(einfach die betroffene Datei ersetzen) – Vercel aktualisiert die Live-App dann automatisch innerhalb
von ca. 1 Minute, ganz ohne dass du irgendwas bei Vercel oder Supabase nochmal einrichten musst.

## Was ist in dieser ersten Version drin?

- Login per E-Mail-Link (kein Passwort)
- Beliebig viele Urlaubsprojekte anlegen
- Pro Projekt: Packliste, Vor-der-Abreise-Liste, Route, Unterkünfte, Kosten, Essen & Trinken,
  Aktivitäten, Must-Dos, Tagesplanung, Tipps
- Alles live mit allen Mitreisenden geteilt (Einladung per Code)
- Installierbar als App auf dem Homescreen (PWA)

## Was in dieser ersten Version bewusst einfacher ist als im Prototyp

- Die grafische Routenkarte (SVG mit Länderzonen) ist hier noch eine einfache Liste – kann ich auf
  Wunsch nachbauen.
- Essen/Aktivitäten sind jetzt frei befüllbar statt mit vorausgefüllten Restaurant-Empfehlungen –
  da für "generelle Urlaubsplanung" ja jeder Urlaub andere Orte hat. Ich kann dir aber gerne eine
  Funktion bauen, bei der die App auf Wunsch automatisch Vorschläge recherchiert.
- Noch kein Rechte-System (aktuell: jedes Mitglied darf alles bearbeiten/löschen) – kann ich bei
  Bedarf ergänzen (z. B. nur Ersteller darf löschen).

Sag mir einfach, was als nächstes dran soll.
