"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/clients";

type AdminTopbarProps = {
  title: string;
};

export default function AdminTopbar({
  title,
}: AdminTopbarProps) {
  const router = useRouter();
  const supabase = createClient();

  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error);
      setLoggingOut(false);
      return;
    }

    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <header className="border-b border-white/10 bg-[#05080E]/80 backdrop-blur-xl">
      <div className="flex h-[76px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-blue-200/45">
            FILVON Admin
          </p>

          <h1 className="mt-1 text-lg font-semibold tracking-[-0.02em] text-white">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="hidden h-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.035] px-4 text-xs font-semibold text-white transition hover:border-blue-400/30 hover:bg-blue-500/[0.07] sm:inline-flex"
          >
            Open Workspace
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="hidden h-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.035] px-4 text-xs font-semibold text-white/70 transition hover:border-red-400/30 hover:bg-red-500/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 sm:inline-flex"
          >
            {loggingOut ? "Uitloggen..." : "Uitloggen"}
          </button>

          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-400/25 bg-blue-500/[0.08] text-xs font-semibold text-blue-100">
            FP
          </div>
        </div>
      </div>
    </header>
  );
}