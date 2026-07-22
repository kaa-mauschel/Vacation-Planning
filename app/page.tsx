"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/useUser";
import { STYLE } from "@/lib/style";
import { Loader2 } from "lucide-react";

export default function RootPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    router.replace(user ? "/projects" : "/login");
  }, [loading, user, router]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: STYLE.paperDim }}>
      <Loader2 className="animate-spin" color={STYLE.ink} size={26} />
    </div>
  );
}
