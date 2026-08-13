"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { getProjectBySlug } from "@/lib/projectData";

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        d="m5 12 4 4L19 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      aria-hidden="true"
    >
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

function FileIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        d="M7 3h7l4 4v14H7V3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M14 3v5h5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function DashboardPage() {
  const project = getProjectBySlug("vermeulen");

  if (!project) {
    return (
      <main className="min-h-screen bg-[#05080E] p-10 text-white">
        <p className="text-sm text-white/50">Project niet gevonden.</p>
      </main>
    );
  }

  const projectSteps = [
    {
      name: "Discovery",
      description: "Doelen en projectvereisten bepaald.",
    },
    {
      name: "Design",
      description: "Visuele richting en pagina-opbouw goedgekeurd.",
    },
    {
      name: "Development",
      description: "Website wordt technisch opgebouwd.",
    },
    {
      name: "Testing",
      description: "Controle op werking, snelheid en mobiel gebruik.",
    },
    {
      name: "Livegang",
      description: "Finale controle en publicatie.",
    },
  ];

  const phaseNames = ["Discovery", "Design", "Development", "Testing", "Live"];

  const currentPhaseIndex = Math.max(
    0,
    phaseNames.findIndex((phase) => phase === project.status),
  );

  const updates = [
    {
      title: "Project bijgewerkt",
      description: `De projectstatus staat momenteel op ${project.status}.`,
      time: project.lastUpdate,
    },
    {
      title: "Werkruimte bijgewerkt",
      description: "De meest recente projectinformatie is beschikbaar in jouw Workspace.",
      time: project.lastUpdate,
    },
  ];

  const planning = [
    {
      day: "Nu",
      task: `Huidige fase: ${project.status}`,
      status: "Bezig",
    },
    {
      day: "Volgende",
      task:
        currentPhaseIndex < 4
          ? `Start ${phaseNames[currentPhaseIndex + 1]}`
          : "Livegang opvolgen",
      status: "Gepland",
    },
    {
      day: "Deadline",
      task: project.deadline,
      status: "Gepland",
    },
  ];

  const [chatMessages, setChatMessages] = useState(() =>
    project.messages.map((message) => ({
      ...message,
      message: message.text,
    })),
  );

  const [chatInput, setChatInput] = useState("");

  const [feedbackItems, setFeedbackItems] = useState(() =>
    project.feedback.map((item) => ({
      id: item.id,
      title: item.title,
      text: item.title,
      category: item.category,
      status: item.status === "Afgerond" ? "Verwerkt" : "Open",
    })),
  );

  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [feedbackCategory, setFeedbackCategory] = useState<
    "Design" | "Functionaliteit" | "Tekst" | "Anders"
  >("Design");
  const [feedbackDescription, setFeedbackDescription] = useState("");

  async function handleChatSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = chatInput.trim();

    if (!message) {
      return;
    }

    const now = new Date();

    const time = now.toLocaleTimeString("nl-BE", {
      hour: "2-digit",
      minute: "2-digit",
    });

    setChatMessages((current) => [
      ...current,
      {
        id: Date.now(),
        sender: "client",
        name: project?.contactName?.split(" ")[0] || "Klant",
        text:message,
        message,
        time,
      },
    ]);

    setChatInput("");
  }

  function handleFeedbackSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const title = feedbackTitle.trim();
    const description = feedbackDescription.trim();

    if (!title || !description) {
      return;
    }

    setFeedbackItems((current) => [
      {
        id: Date.now(),
        title,
        text: description,
        category: feedbackCategory,
        status: "Open",
      },
      ...current,
    ]);

    setFeedbackTitle("");
    setFeedbackCategory("Design");
    setFeedbackDescription("");
    setIsFeedbackOpen(false);
  }

  return (
    <main className="min-h-screen bg-[#05080E] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(37,99,235,0.14),transparent_34%)]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.013)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.013)_1px,transparent_1px)] bg-[size:34px_34px]" />

        <div className="absolute -left-28 top-40 h-80 w-80 rounded-full border border-blue-500/10" />
        <div className="absolute -right-24 bottom-24 h-72 w-72 rounded-full border border-blue-500/10" />
      </div>

      {/* Top navigation */}
      <header className="relative z-20 border-b border-white/10 bg-[#05080E]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-[82px] max-w-[1540px] items-center justify-between px-5 sm:px-8 lg:px-[64px]">
          <Link href="/" className="group flex items-center gap-3">
            <Image
              src="/filvon-mark-final.svg"
              alt="FILVON"
              width={54}
              height={46}
              priority
              className="h-[44px] w-auto transition-opacity duration-300 group-hover:opacity-80"
            />

            <div>
              <p className="text-[18px] font-medium tracking-[0.27em] text-white">
                FILVON
              </p>

              <p className="mt-1 text-[8px] uppercase tracking-[0.24em] text-blue-200/45">
                Client portal
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-white">
                {project.clientName}
              </p>

              <p className="mt-1 text-[10px] text-white/45">
                {project.projectName}
              </p>

              <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-white/30">
                Project #FIL-001
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-400/25 bg-blue-500/[0.08] text-sm font-semibold text-blue-100">
              FP
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-[1540px] px-5 py-10 sm:px-8 lg:px-[64px] lg:py-14">
        {/* Welcome */}
        <section className="flex flex-col gap-8 border-b border-white/10 pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-blue-200/60">
              Persoonlijke projectomgeving
            </p>

            <h1 className="mt-5 text-[clamp(2.4rem,4vw,4.6rem)] font-semibold leading-[0.96] tracking-[-0.05em]">
              Welkom terug,
              <br />
              <span className="text-blue-400">{project.contactName.split(' ')[0]}.</span>
            </h1>

            <p className="mt-6 max-w-[620px] text-[17px] leading-8 text-[#AEB7C6]">
              Hier volg je de voortgang van jouw project, bekijk je nieuwe
              versies en geef je feedback vanuit één centrale omgeving.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#projectgesprek"
              className="inline-flex h-12 items-center justify-center gap-3 rounded-lg border border-white/10 bg-white/[0.035] px-5 text-sm font-semibold text-white transition hover:border-blue-400/30 hover:bg-blue-500/[0.07]"
            >
              Projectgesprek openen
            </a>

            <a
              href="#preview"
              className="group inline-flex h-12 items-center justify-center gap-3 rounded-lg bg-[#2563EB] px-5 text-sm font-semibold text-white shadow-[0_0_28px_rgba(37,99,235,0.2)] transition hover:-translate-y-0.5 hover:bg-[#1D4ED8]"
            >
              Testversie openen
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </a>
          </div>
        </section>

        {/* Project overview */}
        <section className="mt-8 grid gap-6 xl:grid-cols-[1.45fr_0.75fr]">
          <div className="relative overflow-hidden rounded-[28px] border border-white/[0.13] bg-[#0A101A] p-6 shadow-[0_25px_90px_rgba(0,0,0,0.28)] sm:p-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(37,99,235,0.12),transparent_38%)]" />

            <div className="relative">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-200/55">
                    Project
                  </p>

                  <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-white">
                    {project.clientName}
                  </h2>

                  <p className="mt-2 text-sm font-medium text-blue-200/65">
                    {project.projectName}
                  </p>

                  <p className="mt-3 max-w-[560px] text-sm leading-7 text-white/45">
                    Nieuwe bedrijfswebsite inclusief design, development,
                    contactformulier en persoonlijke projectomgeving.
                  </p>
                </div>

                <span className="w-fit rounded-lg border border-blue-400/25 bg-blue-500/[0.08] px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-blue-200">
                  {project.status}
                </span>
              </div>

              <div className="mt-9">
                <div className="flex items-end justify-between gap-6">
                  <div>
                    <p className="text-sm text-white/45">Totale voortgang</p>
                    <p className="mt-2 text-4xl font-semibold tracking-[-0.04em] text-white">
                      {project.progress}%
                    </p>
                  </div>

                  <p className="text-right text-xs leading-6 text-white/35">
                    Laatste update
                    <br />
                    {project.lastUpdate}
                  </p>
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-300 shadow-[0_0_18px_rgba(96,165,250,0.45)]"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  ["Huidige fase", project.status],
                  [
                    "Volgende stap",
                    currentPhaseIndex < 4
                      ? phaseNames[currentPhaseIndex + 1]
                      : "Afronding",
                  ],
                  ["Verwachte oplevering", project.deadline],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/10 bg-[#07101D] p-5"
                  >
                    <p className="text-[9px] uppercase tracking-[0.2em] text-white/30">
                      {label}
                    </p>

                    <p className="mt-3 text-sm font-semibold text-white">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            id="preview"
            className="relative overflow-hidden rounded-[28px] border border-white/[0.13] bg-[#0A101A] p-6"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(37,99,235,0.12),transparent_45%)]" />

            <div className="relative flex h-full flex-col">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-200/55">
                Preview
              </p>

              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white">
                Testomgeving
              </h2>

              <p className="mt-3 text-sm leading-7 text-white/40">
                Bekijk de meest recente versie van jouw website en geef direct
                feedback.
              </p>

              <div className="mt-8 rounded-2xl border border-blue-400/20 bg-[#07101D] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Website Preview v3
                    </p>

                    <p className="mt-2 text-[9px] uppercase tracking-[0.18em] text-blue-200/45">
                      {project.previewUrl}
                    </p>
                  </div>

                  <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-blue-300 shadow-[0_0_16px_rgba(96,165,250,0.8)]" />
                </div>
              </div>

              <a
                href="#"
                className="group mt-auto inline-flex h-12 items-center justify-center gap-3 rounded-lg border border-white/10 bg-white/[0.035] px-5 text-sm font-semibold text-white transition hover:border-blue-400/30 hover:bg-blue-500/[0.07]"
              >
                Preview openen
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* Project phases */}
        <section className="mt-6 rounded-[28px] border border-white/[0.13] bg-[#0A101A] p-6 sm:p-8">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-200/55">
              Projectfase
            </p>

            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white">
              Van idee tot livegang
            </h2>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-5">
            {projectSteps.map((step, index) => {
              const completed = index < currentPhaseIndex;
              const active = index === currentPhaseIndex;

              return (
                <div
                  key={step.name}
                  className={`relative rounded-2xl border p-5 ${
                    active
                      ? "border-blue-300/40 bg-blue-500/[0.08] shadow-[0_0_30px_rgba(37,99,235,0.1)]"
                      : completed
                        ? "border-blue-400/20 bg-[#07101D]"
                        : "border-white/10 bg-[#07101D]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full border ${
                        completed
                          ? "border-blue-300/35 bg-blue-500/10 text-blue-200"
                          : active
                            ? "border-blue-200/55 bg-blue-500/20 text-white shadow-[0_0_18px_rgba(96,165,250,0.25)]"
                            : "border-white/10 text-white/25"
                      }`}
                    >
                      {completed ? (
                        <CheckIcon />
                      ) : (
                        <span className="text-xs font-semibold">
                          {index + 1}
                        </span>
                      )}
                    </div>

                    <span
                      className={`h-2 w-2 rounded-full ${
                        completed
                          ? "bg-blue-300"
                          : active
                            ? "animate-pulse bg-blue-200 shadow-[0_0_14px_rgba(96,165,250,0.8)]"
                            : "bg-white/15"
                      }`}
                    />
                  </div>

                  <h3 className="mt-5 font-semibold text-white">{step.name}</h3>

                  <p className="mt-3 text-sm leading-6 text-white/35">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Main content */}
        <section className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          {/* Updates */}
          <div className="rounded-[28px] border border-white/[0.13] bg-[#0A101A] p-6 sm:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-200/55">
              Laatste updates
            </p>

            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em]">
              Wat is er veranderd?
            </h2>

            <div className="mt-8 space-y-3">
              {updates.map((update, index) => (
                <div
                  key={update.title}
                  className="rounded-2xl border border-white/10 bg-[#07101D] p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue-400/25 bg-blue-500/[0.08] text-blue-200">
                      <CheckIcon />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <h3 className="font-semibold text-white">
                          {update.title}
                        </h3>

                        <span className="text-[10px] uppercase tracking-[0.16em] text-white/25">
                          {update.time}
                        </span>
                      </div>

                      <p className="mt-3 text-sm leading-6 text-white/40">
                        {update.description}
                      </p>

                      {index === 0 && (
                        <span className="mt-4 inline-flex rounded-md border border-blue-400/20 bg-blue-500/[0.06] px-3 py-1.5 text-[8px] uppercase tracking-[0.18em] text-blue-200/65">
                          Nieuw
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Planning */}
          <div className="rounded-[28px] border border-white/[0.13] bg-[#0A101A] p-6 sm:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-200/55">
              Planning
            </p>

            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em]">
              Volgende stappen
            </h2>

            <div className="mt-8 space-y-3">
              {planning.map((item) => (
                <div
                  key={item.task}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#07101D] p-5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/[0.06] text-xs font-semibold text-blue-200">
                    {item.day.slice(0, 2).toUpperCase()}
                  </div>

                  <div className="flex-1">
                    <p className="text-[9px] uppercase tracking-[0.17em] text-white/30">
                      {item.day}
                    </p>

                    <p className="mt-2 text-sm font-semibold text-white">
                      {item.task}
                    </p>
                  </div>

                  <span className="text-[9px] uppercase tracking-[0.17em] text-blue-200/55">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feedback and files */}
        <section className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div
            id="feedback"
            className="rounded-[28px] border border-white/[0.13] bg-[#0A101A] p-6 sm:p-8"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-200/55">
                  Feedback
                </p>

                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em]">
                  Jouw opmerkingen
                </h2>
              </div>

              <span className="rounded-lg border border-blue-400/20 bg-blue-500/[0.06] px-3 py-2 text-[9px] uppercase tracking-[0.17em] text-blue-200/65">
                {feedbackItems.length} opmerkingen
              </span>
            </div>

            <div className="mt-8 space-y-3">
              {feedbackItems.map((item) => (
                <div
                  key={item.text}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-[#07101D] p-5"
                >
                  <span
                    className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${
                      item.status === "Open"
                        ? "bg-blue-300 shadow-[0_0_14px_rgba(96,165,250,0.7)]"
                        : "bg-white/20"
                    }`}
                  />

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="text-sm font-semibold text-white">
                        {item.title}
                      </p>

                      <span className="rounded-md border border-blue-400/15 bg-blue-500/[0.05] px-2.5 py-1 text-[8px] uppercase tracking-[0.16em] text-blue-200/55">
                        {item.category}
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-white/70">
                      {item.text}
                    </p>
                  </div>

                  <span className="text-[9px] uppercase tracking-[0.17em] text-white/30">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsFeedbackOpen(true)}
              className="mt-6 inline-flex h-12 items-center justify-center rounded-lg border border-white/10 bg-white/[0.035] px-5 text-sm font-semibold text-white transition hover:border-blue-400/30 hover:bg-blue-500/[0.07]"
            >
              Nieuwe opmerking toevoegen
            </button>
          </div>

          <div className="rounded-[28px] border border-white/[0.13] bg-[#0A101A] p-6 sm:p-8">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-200/55">
                  Bestanden
                </p>

                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em]">
                  Projectdocumenten
                </h2>
              </div>

              <span className="text-sm text-white/30">{project.files.length}</span>
            </div>

            <div className="mt-8 space-y-3">
              {project.files.map((file) => (
                <a
                  key={file.name}
                  href="#"
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-[#07101D] p-5 transition hover:border-blue-400/25 hover:bg-[#0A1422]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/[0.06] text-blue-200">
                    <FileIcon />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">
                      {file.name}
                    </p>

                    <p className="mt-2 text-[9px] uppercase tracking-[0.16em] text-white/30">
                      {file.type} • {file.size}
                    </p>
                  </div>

                  <span className="text-blue-200/45 transition-transform group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Project chat */}
        <section
          id="projectgesprek"
          className="mt-6 grid scroll-mt-8 gap-6 xl:grid-cols-[1.45fr_0.55fr]"
        >
          <div className="overflow-hidden rounded-[28px] border border-white/[0.13] bg-[#0A101A]">
            <div className="flex flex-col gap-4 border-b border-white/10 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-200/55">
                  Projectgesprek
                </p>

                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em]">
                  Communicatie over jouw project
                </h2>

                <p className="mt-3 text-sm leading-7 text-white/40">
                  Stel vragen, bespreek aanpassingen en houd alle communicatie
                  bij het project.
                </p>
              </div>

              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.17em] text-blue-200/65">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M12 7v5l3 2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Meestal antwoord binnen 2 uur
              </div>
            </div>

            <div className="space-y-5 p-6 sm:p-8">
              {chatMessages.map((message) => {
                const fromClient = message.sender === "client";

                return (
                  <div
                    key={message.id}
                    className={`flex ${
                      fromClient ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[86%] rounded-2xl border p-4 sm:max-w-[72%] ${
                        fromClient
                          ? "border-blue-300/35 bg-blue-500/[0.1]"
                          : "border-white/10 bg-[#07101D]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-6">
                        <p
                          className={`text-xs font-semibold ${
                            fromClient ? "text-blue-100" : "text-white"
                          }`}
                        >
                          {message.name}
                        </p>

                        <span className="text-[9px] uppercase tracking-[0.14em] text-white/25">
                          {message.time}
                        </span>
                      </div>

                      <p className="mt-3 text-sm leading-6 text-white/65">
                        {message.message}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <form
              onSubmit={handleChatSubmit}
              className="border-t border-white/10 p-6 sm:p-8"
            >
              <label htmlFor="project-message" className="sr-only">
                Schrijf een bericht
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <textarea
                  id="project-message"
                  value={chatInput}
                  onChange={(event) => setChatInput(event.target.value)}
                  rows={2}
                  placeholder="Schrijf een bericht over het project..."
                  className="min-h-14 flex-1 resize-none rounded-xl border border-white/[0.12] bg-[#07101D] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/25 focus:border-blue-400/45 focus:ring-4 focus:ring-blue-500/10"
                />

                <button
                  type="submit"
                  disabled={!chatInput.trim()}
                  className="inline-flex h-14 items-center justify-center gap-3 rounded-lg bg-[#2563EB] px-7 text-sm font-semibold text-white transition hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Versturen
                  <ArrowIcon />
                </button>
              </div>

              <p className="mt-3 text-xs leading-5 text-white/25">
                Demoversie: nieuwe berichten blijven zichtbaar tot je de pagina
                vernieuwt.
              </p>
            </form>
          </div>

          <aside className="rounded-[28px] border border-white/[0.13] bg-[#0A101A] p-6 sm:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-200/55">
              Jouw contactpersoon
            </p>

            <div className="mt-7 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-blue-400/25 bg-blue-500/[0.08] text-lg font-semibold text-blue-100">
                FP
              </div>

              <div>
                <p className="font-semibold text-white">Filip Piotrowski</p>
                <p className="mt-2 text-sm text-white/35">
                  CEO & Project Manager
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <div className="rounded-2xl border border-white/10 bg-[#07101D] p-5">
                <p className="text-[9px] uppercase tracking-[0.18em] text-white/30">
                  Beschikbaarheid
                </p>
                <p className="mt-3 text-sm font-semibold text-white">
                  Maandag tot vrijdag
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#07101D] p-5">
                <p className="text-[9px] uppercase tracking-[0.18em] text-white/30">
                  Gemiddelde reactietijd
                </p>
                <p className="mt-3 text-sm font-semibold text-white">
                  Binnen 2 uur
                </p>
              </div>
            </div>

            <a
              href="mailto:filvon@outlook.com"
              className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-lg border border-white/10 bg-white/[0.035] px-5 text-sm font-semibold text-white transition hover:border-blue-400/30 hover:bg-blue-500/[0.07]"
            >
              filvon@outlook.com
            </a>
          </aside>
        </section>

        {isFeedbackOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-labelledby="feedback-modal-title"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setIsFeedbackOpen(false);
              }
            }}
          >
            <div className="relative w-full max-w-[680px] overflow-hidden rounded-[28px] border border-white/[0.14] bg-[#08101C] shadow-[0_40px_140px_rgba(0,0,0,0.65)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(37,99,235,0.14),transparent_38%)]" />

              <button
                type="button"
                onClick={() => setIsFeedbackOpen(false)}
                aria-label="Venster sluiten"
                className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-2xl text-white/65 transition hover:border-blue-400/30 hover:bg-blue-500/[0.08] hover:text-white"
              >
                ×
              </button>

              <div className="relative p-6 sm:p-9">
                <div className="border-b border-white/10 pb-7 pr-14">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-200/55">
                    Nieuwe feedback
                  </p>

                  <h2
                    id="feedback-modal-title"
                    className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-white"
                  >
                    Voeg een opmerking toe
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-white/40">
                    Beschrijf duidelijk wat je aangepast, gecontroleerd of
                    verduidelijkt wilt zien.
                  </p>
                </div>

                <form onSubmit={handleFeedbackSubmit} className="mt-7">
                  <label className="block">
                    <span className="mb-3 block text-sm font-medium text-white/75">
                      Titel <span className="text-blue-300">*</span>
                    </span>

                    <input
                      type="text"
                      value={feedbackTitle}
                      onChange={(event) => setFeedbackTitle(event.target.value)}
                      required
                      placeholder="Bijvoorbeeld: knop op homepage"
                      className="h-14 w-full rounded-xl border border-white/[0.12] bg-[#07101D] px-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-blue-400/45 focus:ring-4 focus:ring-blue-500/10"
                    />
                  </label>

                  <fieldset className="mt-6">
                    <legend className="text-sm font-medium text-white/75">
                      Categorie
                    </legend>

                    <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {(["Design", "Functionaliteit", "Tekst", "Anders"] as const).map(
                        (category) => (
                          <button
                            key={category}
                            type="button"
                            onClick={() => setFeedbackCategory(category)}
                            className={`h-11 rounded-lg border px-3 text-xs font-semibold transition ${
                              feedbackCategory === category
                                ? "border-blue-300/45 bg-blue-500/[0.12] text-blue-100"
                                : "border-white/10 bg-[#07101D] text-white/45 hover:border-blue-400/25 hover:text-white"
                            }`}
                          >
                            {category}
                          </button>
                        ),
                      )}
                    </div>
                  </fieldset>

                  <label className="mt-6 block">
                    <span className="mb-3 block text-sm font-medium text-white/75">
                      Beschrijving <span className="text-blue-300">*</span>
                    </span>

                    <textarea
                      value={feedbackDescription}
                      onChange={(event) =>
                        setFeedbackDescription(event.target.value)
                      }
                      required
                      rows={6}
                      placeholder="Leg kort uit wat je wilt wijzigen of waar je een vraag over hebt..."
                      className="w-full resize-none rounded-[18px] border border-white/[0.12] bg-[#07101D] px-4 py-4 text-sm leading-7 text-white outline-none transition placeholder:text-white/25 focus:border-blue-400/45 focus:ring-4 focus:ring-blue-500/10"
                    />
                  </label>

                  <div className="mt-7 flex flex-col-reverse gap-3 border-t border-white/10 pt-7 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={() => setIsFeedbackOpen(false)}
                      className="inline-flex h-12 items-center justify-center rounded-lg border border-white/10 bg-white/[0.035] px-6 text-sm font-semibold text-white transition hover:border-blue-400/30 hover:bg-blue-500/[0.07]"
                    >
                      Annuleren
                    </button>

                    <button
                      type="submit"
                      disabled={!feedbackTitle.trim() || !feedbackDescription.trim()}
                      className="inline-flex h-12 items-center justify-center gap-3 rounded-lg bg-[#2563EB] px-6 text-sm font-semibold text-white transition hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Feedback toevoegen
                      <ArrowIcon />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        <footer className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 text-[9px] uppercase tracking-[0.2em] text-white/25 sm:flex-row">
          <span>FILVON Workspace • Demo v1.0</span>
          <span>Altijd inzicht in jouw project</span>
        </footer>
      </div>
    </main>
  );
}