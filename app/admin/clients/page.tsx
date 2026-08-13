"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { createClient } from "@/lib/supabase/clients";

type Client = {
  id: string;
  slug: string;
  clientName: string;
  projectName: string;
  status: string;
  progress: number;
};

export default function ClientsPage() {
  const supabase = createClient();

  const [search, setSearch] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  async function loadClients() {
    setLoading(true);
    setErrorMessage("");

    const { data, error } = await supabase
      .from("clients")
      .select("id, slug, client_name, project_name, status, progress")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Supabase clients error:", error);
      setErrorMessage(error.message || "Klanten konden niet geladen worden.");
      setClients([]);
      setLoading(false);
      return;
    }

    const formattedClients: Client[] = (data ?? []).map((client) => ({
      id: client.id,
      slug: client.slug ?? "",
      clientName: client.client_name ?? "",
      projectName: client.project_name ?? "",
      status: client.status ?? "Discovery",
      progress: Number(client.progress ?? 0),
    }));

    setClients(formattedClients);
    setLoading(false);
  }

  useEffect(() => {
    loadClients();
  }, []);

  async function handleDeleteClient(client: Client) {
    const confirmed = window.confirm(
      `Weet je zeker dat je "${client.clientName}" wilt verwijderen?`,
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(client.id);
    setErrorMessage("");

    const { error } = await supabase
      .from("clients")
      .delete()
      .eq("id", client.id);

    if (error) {
      console.error("Supabase delete error:", error);
      setErrorMessage(error.message || "Klant kon niet verwijderd worden.");
      setDeletingId(null);
      return;
    }

    setClients((current) =>
      current.filter((item) => item.id !== client.id),
    );

    setDeletingId(null);
  }

  const filteredClients = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return clients;
    }

    return clients.filter(
      (client) =>
        client.clientName.toLowerCase().includes(query) ||
        client.projectName.toLowerCase().includes(query) ||
        client.status.toLowerCase().includes(query),
    );
  }, [search, clients]);

  return (
    <main className="min-h-screen bg-[#05080E] text-white">
      <div className="relative z-10 flex min-h-screen">
        <AdminSidebar activeSection="Klanten" />

        <div className="min-w-0 flex-1">
          <AdminTopbar title="Klanten" />

          <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-blue-200/55">
                  Klanten
                </p>

                <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">
                  Klanten beheren
                </h1>

                <p className="mt-4 text-white/40">
                  Bekijk, open en beheer alle actieve klantprojecten.
                </p>
              </div>

              <div className="flex gap-3">
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Zoeken..."
                  className="h-11 rounded-xl border border-white/10 bg-[#07101D] px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-blue-400/40"
                />

                <button
                  type="button"
                  onClick={loadClients}
                  className="h-11 rounded-xl border border-white/10 bg-[#07101D] px-4 text-sm text-white/60 transition hover:border-blue-400/30 hover:text-white"
                >
                  ↻
                </button>
              </div>
            </div>

            {errorMessage && (
              <div className="mt-8 rounded-2xl border border-red-400/20 bg-red-500/[0.06] p-5">
                <p className="text-sm font-semibold text-red-200">
                  Er is iets misgegaan
                </p>

                <p className="mt-2 text-sm text-red-100/60">
                  {errorMessage}
                </p>
              </div>
            )}

            {loading ? (
              <div className="mt-8 rounded-[22px] border border-white/10 bg-[#0A101A] px-5 py-12 text-center">
                <p className="text-sm text-white/40">
                  Klanten laden...
                </p>
              </div>
            ) : (
              <>
                <div className="mt-8 grid gap-4 xl:grid-cols-2">
                  {filteredClients.map((client) => (
                    <div
                      key={client.id}
                      className="group rounded-[22px] border border-white/10 bg-[#0A101A] p-5 transition hover:border-blue-400/30"
                    >
                      <div className="flex items-start justify-between gap-5">
                        <div>
                          <h2 className="font-semibold">
                            {client.clientName}
                          </h2>

                          <p className="mt-2 text-sm text-white/35">
                            {client.projectName || "Geen projectnaam"}
                          </p>
                        </div>

                        <span className="rounded-lg border border-blue-400/20 bg-blue-500/[0.05] px-3 py-2 text-[8px] uppercase tracking-[0.17em] text-blue-200">
                          {client.status}
                        </span>
                      </div>

                      <div className="mt-6">
                        <div className="flex justify-between text-xs">
                          <span className="text-white/35">
                            Projectvoortgang
                          </span>

                          <span className="text-blue-200">
                            {client.progress}%
                          </span>
                        </div>

                        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-300"
                            style={{
                              width: `${client.progress}%`,
                            }}
                          />
                        </div>
                      </div>

                      <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
                        <Link
                          href={`/admin/client/${client.slug}`}
                          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.035] px-4 text-sm font-semibold text-white/75 transition hover:border-blue-400/30 hover:text-white"
                        >
                          Open klant
                          <span className="text-blue-200">→</span>
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleDeleteClient(client)}
                          disabled={deletingId === client.id}
                          className="inline-flex h-10 items-center justify-center rounded-lg border border-red-400/20 bg-red-500/[0.05] px-4 text-sm font-semibold text-red-200/70 transition hover:border-red-400/40 hover:bg-red-500/[0.1] hover:text-red-100 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          {deletingId === client.id
                            ? "Verwijderen..."
                            : "Verwijderen"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredClients.length === 0 && (
                  <div className="mt-8 rounded-[22px] border border-white/10 bg-[#0A101A] px-5 py-14 text-center">
                    <p className="font-semibold">
                      Geen klanten gevonden.
                    </p>

                    <p className="mt-2 text-sm text-white/35">
                      {clients.length === 0
                        ? "Voeg je eerste klant toe via het overzicht."
                        : "Probeer een andere zoekterm."}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}