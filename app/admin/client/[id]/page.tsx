"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { createClient } from "@/lib/supabase/clients";

const phases = ["Discovery", "Design", "Development", "Testing", "Livegang"];


type ClientData = {
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
  messages: Message[];
  feedback: FeedbackItem[];
  files: ProjectFile[];
};

type Message = {
  id: string;
  sender: "filvon" | "client";
  name: string;
  text: string;
  time: string;
};

type FeedbackItem = {
  id: string;
  title: string;
  category: string;
  status: "Open" | "In behandeling" | "Afgerond";
};

type ProjectFile = {
  name: string;
  type: string;
  size: string;
};


function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M5 12h14M14 7l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ClientPage() {
  const params = useParams<{ id: string }>();
  const clientId = params?.id ?? "";
  const router = useRouter();
  const supabase = createClient();

  const [client, setClient] = useState<ClientData | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [activeTab, setActiveTab] = useState("Project");
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    async function loadClient() {
      if (!clientId) {
        setLoadError("Geen geldige klant geselecteerd.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setLoadError("");

      const { data, error } = await supabase
        .from("clients")
        .select(
          "id, slug, client_name, contact_name, email, project_name, status, progress, deadline, last_update, preview_url",
        )
        .eq("slug", clientId)
        .maybeSingle();

      if (error) {
        console.error("Supabase client error:", error);
        setLoadError(error.message || "Klant kon niet geladen worden.");
        setClient(null);
        setLoading(false);
        return;
      }

      if (!data) {
        setLoadError("Klantproject niet gevonden.");
        setClient(null);
        setLoading(false);
        return;
      }

      const { data: messagesData, error: messagesError } = await supabase
        .from("messages")
        .select("id, sender, sender_name, message, created_at")
        .eq("client_id", data.id)
        .order("created_at", { ascending: true });

      if (messagesError) {
        console.error("Messages load error:", messagesError);
      }

      const { data: feedbackData, error: feedbackError } = await supabase
  .from("feedback")
  .select("id, title, category, status, created_at")
  .eq("client_id", data.id)
  .order("created_at", { ascending: false });

if (feedbackError) {
  console.error("Feedback load error:", feedbackError);
}

      const formattedClient: ClientData = {
        id: data.id,
        slug: data.slug ?? "",
        clientName: data.client_name ?? "",
        contactName: data.contact_name ?? "",
        email: data.email ?? "",
        projectName: data.project_name ?? "",
        status: data.status ?? "Discovery",
        progress: Number(data.progress ?? 0),
        deadline: data.deadline ?? "",
        lastUpdate: data.last_update ?? "",
        previewUrl: data.preview_url ?? "",
        messages: [],
        feedback: [],
        files: [],
      };

      setClient(formattedClient);

      setMessages(
        (messagesData ?? []).map((item) => ({
          id: item.id,
          sender: item.sender as "filvon" | "client",
          name: item.sender_name,
          text: item.message,
          time: new Date(item.created_at).toLocaleTimeString("nl-BE", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        })),
      );

      setFeedback(
  (feedbackData ?? []).map((item) => ({
    id: item.id,
    title: item.title,
    category: item.category,
    status: item.status,
  })),
);
      setLoading(false);
    }

    loadClient();
  }, [clientId]);

  const tabs = [
    "Project",
    "Communicatie",
    "Feedback",
    "Bestanden",
    "Preview",
    "Instellingen",
  ];

  const currentPhaseIndex = useMemo(() => {
    const index = phases.findIndex(
      (phase) =>
        phase.toLowerCase() === (client?.status ?? "").toLowerCase() ||
        (phase === "Livegang" && client?.status === "Live"),
    );

    return index === -1 ? 0 : index;
  }, [client?.status]);

  async function handleDeleteClient() {
    if (!client) return;

    const confirmed = window.confirm(
      `Weet je zeker dat je "${client.clientName}" wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.`,
    );

    if (!confirmed) return;

    setDeleting(true);
    setDeleteError("");

    const { error } = await supabase
      .from("clients")
      .delete()
      .eq("id", client.id);

    if (error) {
      console.error("Supabase delete client error:", error);
      setDeleteError(error.message || "Klant kon niet verwijderd worden.");
      setDeleting(false);
      return;
    }

    router.replace("/admin/clients");
    router.refresh();
  }

  async function handleMessageSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = messageInput.trim();
    if (!value) return;

    const { data, error } = await supabase
  .from("messages")
  .insert({
    client_id: client!.id,
    sender: "filvon",
    sender_name: "FILVON",
    message: value,
  })
  .select("id, sender, sender_name, message, created_at")
  .single();

if (error) {
  console.error("Message insert error:", error);
  return;
}

setMessages((current) => [
  ...current,
  {
    id: data.id,
    sender: data.sender as "filvon" | "client",
    name: data.sender_name,
    text: data.message,
    time: new Date(data.created_at).toLocaleTimeString("nl-BE", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
]);

setMessageInput("");
  }

  async function cycleFeedbackStatus(id: string) {
  const currentItem = feedback.find((item) => item.id === id);

  if (!currentItem) return;

  const nextStatus =
  currentItem.status === "Open"
    ? "In behandeling"
    : currentItem.status === "In behandeling"
      ? "Afgerond"
      : "Open";

  const { error } = await supabase
    .from("feedback")
    .update({
      status: nextStatus,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("Feedback update error:", error);
    return;
  }

  setFeedback((current) =>
    current.map((item) =>
      item.id === id
        ? {
            ...item,
            status: nextStatus,
          }
        : item,
    ),
  );
}

  if (loading) {
    return (
      <main className="min-h-screen bg-[#05080E] text-white">
        <div className="relative z-10 flex min-h-screen">
          <AdminSidebar activeSection="Klanten" />
          <div className="min-w-0 flex-1">
            <AdminTopbar title="Klant laden..." />
            <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-10">
              <div className="rounded-[28px] border border-white/10 bg-[#0A101A] px-6 py-14 text-center">
                <p className="text-sm text-white/40">Klantgegevens laden...</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!client) {
    return (
      <main className="min-h-screen bg-[#05080E] text-white">
        <div className="relative z-10 flex min-h-screen">
          <AdminSidebar activeSection="Klanten" />
          <div className="min-w-0 flex-1">
            <AdminTopbar title="Klant niet gevonden" />
            <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-10">
              <div className="rounded-[28px] border border-red-400/20 bg-red-500/[0.05] p-6">
                <p className="font-semibold text-red-100">
                  {loadError || "Klantproject niet gevonden."}
                </p>
                <Link
                  href="/admin/clients"
                  className="mt-4 inline-flex text-sm font-semibold text-blue-300"
                >
                  ← Terug naar klanten
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#05080E] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(37,99,235,0.12),transparent_34%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:34px_34px]" />
      </div>

      <div className="relative z-10 flex min-h-screen">
        <AdminSidebar activeSection="Klanten" />

        <div className="min-w-0 flex-1">
          <AdminTopbar title={client.clientName} />

          <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-sm text-white/40 transition hover:text-white"
            >
              <span>←</span>
              Terug naar klanten
            </Link>

            <section className="mt-7 flex flex-col gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-200/55">
                    Klantproject
                  </p>

                  <span className="rounded-md border border-blue-400/20 bg-blue-500/[0.06] px-3 py-1.5 text-[8px] uppercase tracking-[0.18em] text-blue-200">
                    {client.status}
                  </span>
                </div>

                <h1 className="mt-4 text-[clamp(2.4rem,4vw,4rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
                  {client.clientName}
                </h1>

                <p className="mt-3 text-[17px] text-white/40">
                  {client.projectName}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleDeleteClient}
                  disabled={deleting}
                  className="inline-flex h-11 items-center justify-center rounded-lg border border-red-400/20 bg-red-500/[0.05] px-5 text-sm font-semibold text-red-200/75 transition hover:border-red-400/40 hover:bg-red-500/[0.1] hover:text-red-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {deleting ? "Verwijderen..." : "Verwijder klant"}
                </button>

                <Link
                  href="/dashboard"
                  className="inline-flex h-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.035] px-5 text-sm font-semibold transition hover:border-blue-400/30 hover:bg-blue-500/[0.07]"
                >
                  Workspace bekijken
                </Link>

                <button
                  type="button"
                  onClick={() => setActiveTab("Communicatie")}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-5 text-sm font-semibold transition hover:bg-[#1D4ED8]"
                >
                  Bericht sturen
                  <ArrowIcon />
                </button>
              </div>
            </section>

            {deleteError && (
              <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-500/[0.06] p-4">
                <p className="text-sm font-semibold text-red-200">
                  Klant kon niet verwijderd worden
                </p>
                <p className="mt-2 text-sm text-red-100/60">
                  {deleteError}
                </p>
              </div>
            )}

            <nav className="mt-6 overflow-x-auto border-b border-white/10">
              <div className="flex min-w-max gap-7">
                {tabs.map((tab) => {
                  const active = tab === activeTab;

                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={`relative pb-4 text-sm font-medium transition ${
                        active ? "text-white" : "text-white/35 hover:text-white/70"
                      }`}
                    >
                      {tab}

                      {active && (
                        <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-blue-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            </nav>

            {activeTab === "Project" && (
              <section className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
                <div className="rounded-[28px] border border-white/[0.13] bg-[#0A101A] p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-blue-200/55">
                        Project
                      </p>

                      <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em]">
                        Projectvoortgang
                      </h2>
                    </div>

                    <span className="text-3xl font-semibold tracking-[-0.04em] text-blue-200">
                      {client.progress}%
                    </span>
                  </div>

                  <div className="mt-7 h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-300"
                      style={{ width: `${client.progress}%` }}
                    />
                  </div>

                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    {[
                      ["Status", client.status],
                      ["Deadline", client.deadline],
                      ["Laatste update", client.lastUpdate],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="rounded-2xl border border-white/10 bg-[#07101D] p-5"
                      >
                        <p className="text-[9px] uppercase tracking-[0.18em] text-white/25">
                          {label}
                        </p>

                        <p className="mt-3 text-sm font-semibold text-white">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-blue-200/55">
                      Fases
                    </p>

                    <div className="mt-5 grid gap-3 sm:grid-cols-5">
                      {phases.map((phase, index) => {
                        const completed = index < currentPhaseIndex;
                        const active = index === currentPhaseIndex;

                        return (
                          <div
                            key={phase}
                            className={`rounded-2xl border p-4 ${
                              active
                                ? "border-blue-300/35 bg-blue-500/[0.08]"
                                : completed
                                  ? "border-blue-400/20 bg-[#07101D]"
                                  : "border-white/10 bg-[#07101D]"
                            }`}
                          >
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs ${
                                completed || active
                                  ? "border-blue-300/35 text-blue-200"
                                  : "border-white/10 text-white/25"
                              }`}
                            >
                              {completed ? "✓" : index + 1}
                            </div>

                            <p className="mt-4 text-sm font-semibold text-white">
                              {phase}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="rounded-[28px] border border-white/[0.13] bg-[#0A101A] p-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-blue-200/55">
                      Snelle acties
                    </p>

                    <div className="mt-5 space-y-3">
                      {[
                        "Voortgang aanpassen",
                        "Nieuwe update plaatsen",
                        "Deadline wijzigen",
                      ].map((action) => (
                        <button
                          key={action}
                          type="button"
                          className="flex h-12 w-full items-center justify-between rounded-xl border border-white/10 bg-[#07101D] px-4 text-sm font-semibold transition hover:border-blue-400/25 hover:bg-[#0A1422]"
                        >
                          {action}
                          <span className="text-blue-200">→</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-white/[0.13] bg-[#0A101A] p-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-blue-200/55">
                      Contact
                    </p>

                    <p className="mt-4 font-semibold text-white">
                      {client.contactName}
                    </p>

                    <p className="mt-2 text-sm text-white/35">
                      {client.email}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {activeTab === "Communicatie" && (
              <section className="mt-6 rounded-[28px] border border-white/[0.13] bg-[#0A101A]">
                <div className="border-b border-white/10 p-6 sm:p-8">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-blue-200/55">
                    Communicatie
                  </p>

                  <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em]">
                    Projectgesprek
                  </h2>
                </div>

                <div className="space-y-5 p-6 sm:p-8">
                  {messages.map((message) => {
                    const fromClient = message.sender === "client";

                    return (
                      <div
                        key={message.id}
                        className={`flex ${
                          fromClient ? "justify-start" : "justify-end"
                        }`}
                      >
                        <div
                          className={`max-w-[82%] rounded-2xl border p-4 sm:max-w-[68%] ${
                            fromClient
                              ? "border-white/10 bg-[#07101D]"
                              : "border-blue-300/30 bg-blue-500/[0.09]"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-6">
                            <p className="text-xs font-semibold">
                              {message.name}
                            </p>

                            <span className="text-[9px] text-white/25">
                              {message.time}
                            </span>
                          </div>

                          <p className="mt-3 text-sm leading-6 text-white/65">
                            {message.text}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <form
                  onSubmit={handleMessageSubmit}
                  className="border-t border-white/10 p-6 sm:p-8"
                >
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <textarea
                      value={messageInput}
                      onChange={(event) => setMessageInput(event.target.value)}
                      rows={2}
                      placeholder="Schrijf een bericht..."
                      className="min-h-14 flex-1 resize-none rounded-xl border border-white/[0.12] bg-[#07101D] px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-blue-400/40"
                    />

                    <button
                      type="submit"
                      disabled={!messageInput.trim()}
                      className="h-14 rounded-lg bg-[#2563EB] px-7 text-sm font-semibold transition hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Versturen
                    </button>
                  </div>
                </form>
              </section>
            )}

            {activeTab === "Feedback" && (
              <section className="mt-6 rounded-[28px] border border-white/[0.13] bg-[#0A101A] p-6 sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-blue-200/55">
                      Feedback
                    </p>

                    <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em]">
                      Opmerkingen beheren
                    </h2>
                  </div>

                  <span className="text-sm text-white/35">
                    {feedback.length} items
                  </span>
                </div>

                <div className="mt-7 space-y-3">
                  {feedback.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => cycleFeedbackStatus(item.id)}
                      className="flex w-full flex-col gap-4 rounded-2xl border border-white/10 bg-[#07101D] p-5 text-left transition hover:border-blue-400/25 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="font-semibold text-white">{item.title}</p>
                        <p className="mt-2 text-xs uppercase tracking-[0.16em] text-white/25">
                          {item.category}
                        </p>
                      </div>

                      <span className="w-fit rounded-lg border border-blue-400/20 bg-blue-500/[0.05] px-3 py-2 text-[9px] uppercase tracking-[0.16em] text-blue-200">
                        {item.status}
                      </span>
                    </button>
                  ))}
                </div>

                <p className="mt-5 text-xs text-white/25">
                  Demo: klik op een item om de status te wijzigen.
                </p>
              </section>
            )}

            {activeTab === "Bestanden" && (
              <section className="mt-6 rounded-[28px] border border-white/[0.13] bg-[#0A101A] p-6 sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-blue-200/55">
                      Bestanden
                    </p>

                    <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em]">
                      Projectdocumenten
                    </h2>
                  </div>

                  <button
                    type="button"
                    className="h-11 rounded-lg bg-[#2563EB] px-5 text-sm font-semibold transition hover:bg-[#1D4ED8]"
                  >
                    + Bestand uploaden
                  </button>
                </div>

                <div className="mt-7 grid gap-3 lg:grid-cols-2">
                  {client.files.map((file) => (
                    <div
                      key={file.name}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#07101D] p-5"
                    >
                      <div>
                        <p className="font-semibold text-white">{file.name}</p>
                        <p className="mt-2 text-xs text-white/25">{`${file.type} • ${file.size}`}</p>
                      </div>

                      <span className="text-blue-200">→</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeTab === "Preview" && (
              <section className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                <div className="rounded-[28px] border border-white/[0.13] bg-[#0A101A] p-6 sm:p-8">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-blue-200/55">
                    Preview
                  </p>

                  <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em]">
                    Website Preview v3
                  </h2>

                  <div className="mt-7 rounded-2xl border border-blue-400/20 bg-[#07101D] p-6">
                    <p className="text-sm font-semibold text-white">
                      {client.previewUrl}
                    </p>

                    <p className="mt-3 text-sm leading-6 text-white/35">
                      Laatste versie van de testomgeving voor deze klant.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="mt-6 inline-flex h-11 items-center gap-3 rounded-lg bg-[#2563EB] px-5 text-sm font-semibold transition hover:bg-[#1D4ED8]"
                  >
                    Preview openen
                    <ArrowIcon />
                  </button>
                </div>

                <div className="rounded-[28px] border border-white/[0.13] bg-[#0A101A] p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-blue-200/55">
                    Deployment
                  </p>

                  <div className="mt-5 space-y-3">
                    <div className="rounded-2xl border border-white/10 bg-[#07101D] p-5">
                      <p className="text-[9px] uppercase tracking-[0.16em] text-white/25">
                        Status
                      </p>
                      <p className="mt-3 text-sm font-semibold">Ready</p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-[#07101D] p-5">
                      <p className="text-[9px] uppercase tracking-[0.16em] text-white/25">
                        Laatste build
                      </p>
                      <p className="mt-3 text-sm font-semibold">
                        Vandaag, 08:54
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeTab === "Instellingen" && (
              <section className="mt-6 rounded-[28px] border border-white/[0.13] bg-[#0A101A] p-6 sm:p-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-blue-200/55">
                  Instellingen
                </p>

                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em]">
                  Klant- en projectgegevens
                </h2>

                <div className="mt-7 grid gap-5 md:grid-cols-2">
                  {[
                    ["Klantnaam", client.clientName],
                    ["Project", client.projectName],
                    ["E-mail", client.email],
                    ["Preview URL", client.previewUrl],
                  ].map(([label, value]) => (
                    <label key={label} className="block">
                      <span className="text-xs font-medium text-white/45">
                        {label}
                      </span>

                      <input
                        defaultValue={value}
                        className="mt-2 h-12 w-full rounded-xl border border-white/[0.12] bg-[#07101D] px-4 text-sm text-white outline-none focus:border-blue-400/40"
                      />
                    </label>
                  ))}
                </div>

                <button
                  type="button"
                  className="mt-7 h-11 rounded-lg bg-[#2563EB] px-5 text-sm font-semibold transition hover:bg-[#1D4ED8]"
                >
                  Wijzigingen opslaan
                </button>
              </section>
            )}

            <footer className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 text-[9px] uppercase tracking-[0.2em] text-white/25 sm:flex-row">
              <span>FILVON Admin • {client.clientName}</span>
              <span>Project / Communicatie / Feedback / Bestanden</span>
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
}
