"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";
import { createClient } from "@/lib/supabase/clients";

type Client = {
  id: string;
  slug: string;
  clientName: string;
  contactName: string;
  email: string;
  projectName: string;
  status: string;
  progress: number;
  deadline: string;
  lastUpdate: string;
  previewUrl: string;
  unreadMessages: number;
  openFeedback: number;
};

type NewClientForm = {
  clientName: string;
  vatNumber: string;
  companyNumber: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  country: string;
  website: string;
  contactName: string;
  email: string;
  phone: string;
  projectName: string;
  status: string;
  progress: string;
  deadline: string;
  previewUrl: string;
};

const emptyNewClient: NewClientForm = {
  clientName: "",
  vatNumber: "",
  companyNumber: "",
  street: "",
  houseNumber: "",
  postalCode: "",
  city: "",
  country: "België",
  website: "",
  contactName: "",
  email: "",
  phone: "",
  projectName: "",
  status: "Discovery",
  progress: "0",
  deadline: "",
  previewUrl: "",
};

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatNow() {
  return new Intl.DateTimeFormat("nl-BE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
}

export default function AdminPage() {
  const supabase = createClient();
  
  const [search, setSearch] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [isNewClientOpen, setIsNewClientOpen] = useState(false);
  const [newClient, setNewClient] = useState<NewClientForm>(emptyNewClient);
  const [savingClient, setSavingClient] = useState(false);
  const [saveError, setSaveError] = useState("");

  async function loadClients() {
    setLoading(true);
    setLoadError("");

    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Supabase load error:", error);
      setLoadError(error.message || "Kon klanten niet laden.");
      setClients([]);
      setLoading(false);
      return;
    }

    const formattedClients: Client[] = (data ?? []).map((client) => ({
      id: client.id,
      slug: client.slug ?? "",
      clientName: client.client_name ?? "",
      contactName: client.contact_name ?? "",
      email: client.email ?? "",
      projectName: client.project_name ?? "",
      status: client.status ?? "Discovery",
      progress: Number(client.progress ?? 0),
      deadline: client.deadline ?? "",
      lastUpdate: client.last_update ?? "",
      previewUrl: client.preview_url ?? "",
      unreadMessages: 0,
      openFeedback: 0,
    }));

    setClients(formattedClients);
    setLoading(false);
  }

  useEffect(() => {
    loadClients();
  }, []);

  const filteredClients = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return clients;

    return clients.filter(
      (client) =>
        client.clientName.toLowerCase().includes(query) ||
        client.projectName.toLowerCase().includes(query) ||
        client.status.toLowerCase().includes(query),
    );
  }, [search, clients]);

  const totalMessages = clients.reduce(
    (total, client) => total + client.unreadMessages,
    0,
  );

  const totalFeedback = clients.reduce(
    (total, client) => total + client.openFeedback,
    0,
  );

  const liveProjects = clients.filter(
    (client) => client.status === "Live",
  ).length;

  async function handleAddClient(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaveError("");

    const slug = createSlug(newClient.clientName);
    const progress = Math.min(100, Math.max(0, Number(newClient.progress || 0)));

    if (!newClient.clientName.trim()) {
      setSaveError("Vul een klantnaam in.");
      return;
    }

    if (!slug) {
      setSaveError("Kon geen geldige slug maken.");
      return;
    }

    setSavingClient(true);

    const { error } = await supabase.from("clients").insert({
      client_name: newClient.clientName.trim(),
      vat_number: newClient.vatNumber.trim(),
      company_number: newClient.companyNumber.trim(),
      street: newClient.street.trim(),
      house_number: newClient.houseNumber.trim(),
      postal_code: newClient.postalCode.trim(),
      city: newClient.city.trim(),
      country: newClient.country.trim() || "België",
      website: newClient.website.trim(),
      contact_name: newClient.contactName.trim(),
      email: newClient.email.trim(),
      phone: newClient.phone.trim(),
      slug,
      project_name: newClient.projectName.trim(),
      status: newClient.status,
      progress,
      deadline: newClient.deadline.trim(),
      last_update: formatNow(),
      preview_url: newClient.previewUrl.trim(),
    });

    if (error) {
      console.error("Supabase insert error:", error);
      setSaveError(error.message || "Klant kon niet worden toegevoegd.");
      setSavingClient(false);
      return;
    }

    setNewClient(emptyNewClient);
    setIsNewClientOpen(false);
    setSavingClient(false);
    await loadClients();
  }

  return (
    <main className="min-h-screen bg-[#05080E] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(37,99,235,0.12),transparent_34%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:34px_34px]" />
      </div>

      <div className="relative z-10 flex min-h-screen">
        <AdminSidebar activeSection="Overzicht" />

        <div className="min-w-0 flex-1">
          <AdminTopbar title="Overzicht" />

          <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
            <section className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-200/55">
                  Overzicht
                </p>

                <h2 className="mt-4 text-[clamp(2.3rem,4vw,4.2rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
                  Welkom terug, Filip.
                </h2>

                <p className="mt-5 max-w-[620px] text-[16px] leading-8 text-white/40">
                  Beheer klanten, projecten, feedback en communicatie vanuit één centrale omgeving.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSaveError("");
                  setIsNewClientOpen(true);
                }}
                className="inline-flex h-12 items-center justify-center gap-3 rounded-lg bg-[#2563EB] px-5 text-sm font-semibold text-white transition hover:bg-[#1D4ED8]"
              >
                + Nieuwe klant toevoegen
              </button>
            </section>

            <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  label: "Actieve klanten",
                  value: clients.length,
                  detail: "Alle lopende klanten",
                },
                {
                  label: "Open feedback",
                  value: totalFeedback,
                  detail: "Te verwerken opmerkingen",
                },
                {
                  label: "Nieuwe berichten",
                  value: totalMessages,
                  detail: "Nog niet gelezen",
                },
                {
                  label: "Projecten live",
                  value: liveProjects,
                  detail:
                    liveProjects === 0
                      ? "Nog geen live projecten"
                      : "Afgeronde livegangen",
                },
              ].map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-[22px] border border-white/[0.12] bg-[#0A101A] p-5"
                >
                  <p className="text-[9px] uppercase tracking-[0.2em] text-white/30">
                    {metric.label}
                  </p>

                  <p className="mt-4 text-3xl font-semibold tracking-[-0.035em]">
                    {metric.value}
                  </p>

                  <p className="mt-3 text-xs leading-5 text-white/30">
                   {metric.detail}
                  </p>
                </div>
              ))}
            </section>

            <section className="mt-6 rounded-[28px] border border-white/[0.13] bg-[#0A101A] p-6 sm:p-7">
              <div className="flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-blue-200/55">
                    Klanten
                  </p>

                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
                    Actieve klanten
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-white/35">
                    Open een klant om het project, communicatie, feedback,
                    bestanden en instellingen te beheren.
                  </p>
                </div>

                <div className="flex w-full gap-3 sm:w-auto">
                  <input
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Zoeken..."
                    className="h-11 w-full rounded-xl border border-white/[0.12] bg-[#07101D] px-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-blue-400/40 sm:w-[240px]"
                  />

                  <button
                    type="button"
                    onClick={loadClients}
                    className="h-11 rounded-xl border border-white/10 bg-white/[0.035] px-4 text-sm font-semibold text-white/70 transition hover:border-blue-400/30 hover:text-white"
                  >
                    ↻
                  </button>
                </div>
              </div>

              {loadError && (
                <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-500/[0.06] p-5">
                  <p className="text-sm font-semibold text-red-200">
                    Supabase fout
                  </p>
                  <p className="mt-2 text-sm text-red-100/60">
                    {loadError}
                  </p>
                </div>
              )}

              {loading ? (
                <div className="mt-6 rounded-2xl border border-white/10 bg-[#07101D] px-5 py-12 text-center">
                  <p className="text-sm text-white/45">Klanten laden...</p>
                </div>
              ) : (
                <>
                  <div className="mt-6 grid gap-4 xl:grid-cols-2">
                    {filteredClients.map((client) => (
                      <Link
                        key={client.id}
                        href={`/admin/client/${client.slug}`}
                        className="group rounded-[22px] border border-white/10 bg-[#07101D] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-blue-400/30 hover:bg-[#0A1422]"
                      >
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <div className="flex items-center gap-3">
                              <span
                                className={`h-2.5 w-2.5 rounded-full ${
                                  client.status === "Development"
                                    ? "bg-blue-300 shadow-[0_0_12px_rgba(96,165,250,0.65)]"
                                    : client.status === "Live"
                                      ? "bg-blue-200"
                                      : "bg-white/25"
                                }`}
                              />

                              <h4 className="font-semibold text-white">
                                {client.clientName}
                              </h4>
                            </div>

                            <p className="mt-2 text-sm text-white/35">
                              {client.projectName || "Geen projectnaam"}
                            </p>
                          </div>

                          <span className="w-fit rounded-lg border border-blue-400/20 bg-blue-500/[0.05] px-3 py-2 text-[8px] uppercase tracking-[0.17em] text-blue-200/70">
                            {client.status}
                          </span>
                        </div>

                        <div className="mt-6">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-white/35">
                              Projectvoortgang
                            </span>

                            <span className="font-semibold text-blue-200">
                              {client.progress}%
                            </span>
                          </div>

                          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-300"
                              style={{ width: `${client.progress}%` }}
                            />
                          </div>
                        </div>

                        <div className="mt-5 grid gap-3 sm:grid-cols-3">
                          <div className="rounded-xl border border-white/10 bg-white/[0.025] p-3">
                            <p className="text-[8px] uppercase tracking-[0.16em] text-white/25">
                              Berichten
                            </p>

                            <p className="mt-2 text-sm font-semibold text-white">
                              {client.unreadMessages}
                            </p>
                          </div>

                          <div className="rounded-xl border border-white/10 bg-white/[0.025] p-3">
                            <p className="text-[8px] uppercase tracking-[0.16em] text-white/25">
                              Feedback
                            </p>

                            <p className="mt-2 text-sm font-semibold text-white">
                              {client.openFeedback}
                            </p>
                          </div>

                          <div className="rounded-xl border border-white/10 bg-white/[0.025] p-3">
                            <p className="text-[8px] uppercase tracking-[0.16em] text-white/25">
                              Update
                            </p>

                            <p className="mt-2 truncate text-[10px] font-medium text-white/60">
                              {client.lastUpdate || "—"}
                            </p>
                          </div>
                        </div>

                        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                          <span className="text-[9px] uppercase tracking-[0.16em] text-white/25">
                            Open klant
                          </span>

                          <span className="text-blue-200 transition-transform duration-300 group-hover:translate-x-1">
                            →
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {filteredClients.length === 0 && (
                    <div className="mt-6 rounded-2xl border border-white/10 bg-[#07101D] px-5 py-10 text-center">
                      <p className="text-sm font-semibold text-white">
                        Geen klanten gevonden.
                      </p>

                      <p className="mt-2 text-sm text-white/35">
                        {clients.length === 0
                          ? "Er staan momenteel geen zichtbare klanten in Supabase."
                          : "Probeer een andere zoekterm."}
                      </p>
                    </div>
                  )}
                </>
              )}
            </section>

            <footer className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 text-[9px] uppercase tracking-[0.2em] text-white/25 sm:flex-row">
              <span>FILVON Admin • Internal workspace</span>
              <span>Klanten / Projecten / Communicatie</span>
            </footer>
          </div>
        </div>
      </div>

      {isNewClientOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsNewClientOpen(false);
            }
          }}
        >
          <div className="max-h-[92vh] w-full max-w-[760px] overflow-y-auto rounded-[28px] border border-white/[0.14] bg-[#08101C] p-6 shadow-[0_40px_140px_rgba(0,0,0,0.65)] sm:p-8">
            <div className="flex items-start justify-between gap-6 border-b border-white/10 pb-6">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-200/55">
                  Nieuwe klant
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em]">
                  Klant toevoegen
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setIsNewClientOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035] text-xl text-white/60 transition hover:text-white"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddClient} className="mt-6">
              <div className="space-y-8">
                <section>
                  <div className="mb-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-blue-200/55">
                      Bedrijfsgegevens
                    </p>
                    <p className="mt-2 text-sm text-white/35">
                      Juridische en praktische gegevens van de klant.
                    </p>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <label className="block md:col-span-2">
                      <span className="text-sm text-white/55">Bedrijfsnaam *</span>
                      <input required value={newClient.clientName} onChange={(event) => setNewClient((current) => ({ ...current, clientName: event.target.value }))} placeholder="Bijvoorbeeld: Example Company BV" className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-[#07101D] px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-blue-400/40" />
                    </label>

                    <label className="block">
                      <span className="text-sm text-white/55">BTW-nummer</span>
                      <input value={newClient.vatNumber} onChange={(event) => setNewClient((current) => ({ ...current, vatNumber: event.target.value }))} placeholder="BE 0123.456.789" className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-[#07101D] px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-blue-400/40" />
                    </label>

                    <label className="block">
                      <span className="text-sm text-white/55">Ondernemingsnummer</span>
                      <input value={newClient.companyNumber} onChange={(event) => setNewClient((current) => ({ ...current, companyNumber: event.target.value }))} placeholder="0123.456.789" className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-[#07101D] px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-blue-400/40" />
                    </label>

                    <label className="block">
                      <span className="text-sm text-white/55">Straat</span>
                      <input value={newClient.street} onChange={(event) => setNewClient((current) => ({ ...current, street: event.target.value }))} placeholder="Straatnaam" className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-[#07101D] px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-blue-400/40" />
                    </label>

                    <label className="block">
                      <span className="text-sm text-white/55">Huisnummer</span>
                      <input value={newClient.houseNumber} onChange={(event) => setNewClient((current) => ({ ...current, houseNumber: event.target.value }))} placeholder="10" className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-[#07101D] px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-blue-400/40" />
                    </label>

                    <label className="block">
                      <span className="text-sm text-white/55">Postcode</span>
                      <input value={newClient.postalCode} onChange={(event) => setNewClient((current) => ({ ...current, postalCode: event.target.value }))} placeholder="2000" className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-[#07101D] px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-blue-400/40" />
                    </label>

                    <label className="block">
                      <span className="text-sm text-white/55">Gemeente / stad</span>
                      <input value={newClient.city} onChange={(event) => setNewClient((current) => ({ ...current, city: event.target.value }))} placeholder="Antwerpen" className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-[#07101D] px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-blue-400/40" />
                    </label>

                    <label className="block">
                      <span className="text-sm text-white/55">Land</span>
                      <input value={newClient.country} onChange={(event) => setNewClient((current) => ({ ...current, country: event.target.value }))} placeholder="België" className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-[#07101D] px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-blue-400/40" />
                    </label>

                    <label className="block">
                      <span className="text-sm text-white/55">Website</span>
                      <input value={newClient.website} onChange={(event) => setNewClient((current) => ({ ...current, website: event.target.value }))} placeholder="https://example.be" className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-[#07101D] px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-blue-400/40" />
                    </label>
                  </div>
                </section>

                <section className="border-t border-white/10 pt-7">
                  <div className="mb-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-blue-200/55">
                      Contactpersoon
                    </p>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <label className="block">
                      <span className="text-sm text-white/55">Naam</span>
                      <input value={newClient.contactName} onChange={(event) => setNewClient((current) => ({ ...current, contactName: event.target.value }))} placeholder="Naam contactpersoon" className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-[#07101D] px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-blue-400/40" />
                    </label>

                    <label className="block">
                      <span className="text-sm text-white/55">E-mail</span>
                      <input type="email" value={newClient.email} onChange={(event) => setNewClient((current) => ({ ...current, email: event.target.value }))} placeholder="contact@example.be" className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-[#07101D] px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-blue-400/40" />
                    </label>

                    <label className="block">
                      <span className="text-sm text-white/55">Telefoon</span>
                      <input type="tel" value={newClient.phone} onChange={(event) => setNewClient((current) => ({ ...current, phone: event.target.value }))} placeholder="+32 ..." className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-[#07101D] px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-blue-400/40" />
                    </label>
                  </div>
                </section>

                <section className="border-t border-white/10 pt-7">
                  <div className="mb-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-blue-200/55">
                      Projectgegevens
                    </p>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <label className="block md:col-span-2">
                      <span className="text-sm text-white/55">Projectnaam</span>
                      <input value={newClient.projectName} onChange={(event) => setNewClient((current) => ({ ...current, projectName: event.target.value }))} placeholder="Nieuwe website" className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-[#07101D] px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-blue-400/40" />
                    </label>

                    <label className="block">
                      <span className="text-sm text-white/55">Status</span>
                      <select value={newClient.status} onChange={(event) => setNewClient((current) => ({ ...current, status: event.target.value }))} className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-[#07101D] px-4 text-sm text-white outline-none focus:border-blue-400/40">
                        <option>Discovery</option>
                        <option>Design</option>
                        <option>Development</option>
                        <option>Testing</option>
                        <option>Live</option>
                      </select>
                    </label>

                    <label className="block">
                      <span className="text-sm text-white/55">Voortgang (%)</span>
                      <input type="number" min="0" max="100" value={newClient.progress} onChange={(event) => setNewClient((current) => ({ ...current, progress: event.target.value }))} className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-[#07101D] px-4 text-sm text-white outline-none focus:border-blue-400/40" />
                    </label>

                    <label className="block">
                      <span className="text-sm text-white/55">Deadline</span>
                      <input value={newClient.deadline} onChange={(event) => setNewClient((current) => ({ ...current, deadline: event.target.value }))} placeholder="31 augustus 2026" className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-[#07101D] px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-blue-400/40" />
                    </label>

                    <label className="block">
                      <span className="text-sm text-white/55">Preview URL</span>
                      <input value={newClient.previewUrl} onChange={(event) => setNewClient((current) => ({ ...current, previewUrl: event.target.value }))} placeholder="https://preview.filvon.be/example" className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-[#07101D] px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-blue-400/40" />
                    </label>
                  </div>
                </section>
              </div>

              {saveError && (
                <div className="mt-5 rounded-xl border border-red-400/20 bg-red-500/[0.06] px-4 py-3 text-sm text-red-200">
                  {saveError}
                </div>
              )}

              <div className="mt-7 flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setIsNewClientOpen(false)}
                  className="h-12 rounded-lg border border-white/10 bg-white/[0.035] px-6 text-sm font-semibold text-white transition hover:border-blue-400/30"
                >
                  Annuleren
                </button>

                <button
                  type="submit"
                  disabled={savingClient}
                  className="h-12 rounded-lg bg-[#2563EB] px-6 text-sm font-semibold text-white transition hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {savingClient ? "Opslaan..." : "Klant opslaan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}