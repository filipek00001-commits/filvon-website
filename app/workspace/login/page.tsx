"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/clients";

export default function WorkspaceLoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setErrorMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage("E-mail of wachtwoord is niet correct.");
      setLoading(false);
      return;
    }

    router.push("/workspace");
    router.refresh();
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#05080E] px-5 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(37,99,235,0.16),transparent_36%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.014)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.014)_1px,transparent_1px)] bg-[size:34px_34px]" />
      </div>

      <div className="relative w-full max-w-[460px]">
        <div className="rounded-[30px] border border-white/[0.14] bg-[#0A101A] p-7 shadow-[0_35px_120px_rgba(0,0,0,0.5)] sm:p-9">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-blue-200/55">
            FILVON Client Portal
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">
            Inloggen
          </h1>

          <p className="mt-4 text-sm leading-7 text-white/40">
            Log in om jouw project, feedback en communicatie te bekijken.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <label className="block">
              <span className="text-sm text-white/55">E-mail</span>

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                autoComplete="email"
                placeholder="jouw@email.be"
                className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-[#07101D] px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-blue-400/40"
              />
            </label>

            <label className="block">
              <span className="text-sm text-white/55">Wachtwoord</span>

              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-[#07101D] px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-blue-400/40"
              />
            </label>

            {errorMessage && (
              <div className="rounded-xl border border-red-400/20 bg-red-500/[0.06] px-4 py-3 text-sm text-red-200">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-lg bg-[#2563EB] px-6 text-sm font-semibold text-white transition hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Bezig met inloggen..." : "Inloggen"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}