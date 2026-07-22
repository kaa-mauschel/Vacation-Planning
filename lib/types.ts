export type Project = {
  id: string;
  name: string;
  emoji: string;
  created_by: string;
  invite_code: string;
  created_at: string;
};

export type Item = {
  id: string;
  project_id: string;
  section: string;
  data: Record<string, any>;
  position: number;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

export const SECTIONS = {
  PACKLISTE: "packliste",
  VORABREISE: "vorabreise",
  ROUTE: "route",
  UNTERKUNFT: "unterkunft",
  KOSTEN: "kosten",
  ESSEN: "essen",
  AKTIVITAET: "aktivitaet",
  MUSTDO: "mustdo",
  TAGESPLAN: "tagesplan",
  TIPP: "tipp",
} as const;
