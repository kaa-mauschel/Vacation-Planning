// Diese Vorschläge werden automatisch angelegt, wenn ein neues Projekt (=Urlaub) erstellt wird.
// Der Nutzer kann danach beliebig Punkte hinzufügen, bearbeiten und löschen.

export const DEFAULT_PACKLIST: { category: string; text: string }[] = [
  { category: "Dokumente", text: "Ausweise / Reisepässe" },
  { category: "Dokumente", text: "Führerschein & Fahrzeugschein" },
  { category: "Dokumente", text: "Buchungsbestätigungen" },
  { category: "Kleidung", text: "Badesachen" },
  { category: "Kleidung", text: "Regenjacke" },
  { category: "Gesundheit", text: "Sonnencreme" },
  { category: "Gesundheit", text: "Reiseapotheke" },
  { category: "Technik", text: "Ladekabel & Powerbank" },
];

export const DEFAULT_VORABREISE: { category: string; text: string }[] = [
  { category: "Zuhause", text: "Müll rausbringen" },
  { category: "Zuhause", text: "Pflanzen gießen (oder Nachbarn bitten)" },
  { category: "Zuhause", text: "Aufräumen" },
  { category: "Letzte Einkäufe", text: "Drogerie: Sonnencreme & Reiseapotheke auffüllen" },
  { category: "Letzte Einkäufe", text: "Snacks & Getränke fürs Auto" },
];

export const DEFAULT_TIPS: { title: string; text: string }[] = [
  { title: "Mautstrecken vorab prüfen", text: "Je nach Zielländern können Vignette, Autobahnmaut oder Péage anfallen – vorab online informieren." },
];
