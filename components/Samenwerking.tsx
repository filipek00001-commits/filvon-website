import Link from "next/link";

const benefits = [
  "Live voortgang",
  "Duidelijke communicatie",
  "Feedback op één plek",
  "Altijd inzicht",
];

const files = ["Brandguide.pdf", "Logo.svg"];

export default function WhyFilvon() {
  return (
    <section
      id="samenwerking"
      className="relative overflow-hidden border-b border-white/10 bg-[#060910]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_44%,rgba(37,99,235,0.13),transparent_42%)]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.014)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.014)_1px,transparent_1px)] bg-[size:34px_34px]" />

        <div className="absolute -left-20 top-24 h-64 w-64 rounded-full border border-blue-500/10" />
        <div className="absolute bottom-20 right-16 h-40 w-40 border-b border-r border-blue-500/10" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 py-24 sm:px-8 lg:px-[72px] lg:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-[40%_60%] lg:gap-20">
          <div>
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.35em] text-blue-200/75">
              Samenwerken zonder verrassingen
            </p>

            <h2 className="max-w-[560px] text-[clamp(3rem,4.8vw,5rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-white">
              Jij weet altijd
              <br />
              waar jouw
              <br />
              project staat.
            </h2>

            <p className="mt-8 max-w-[520px] text-[18px] leading-[1.8] text-[#C0C7D3]">
              Vanaf de eerste dag krijg je toegang tot jouw persoonlijke
              projectomgeving. Bekijk de voortgang, reageer op nieuwe versies
              en werk samen vanuit één centrale plek.
            </p>

            <div className="mt-11 grid gap-4 sm:grid-cols-2">
              {benefits.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-[#AEB7C6]"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-blue-400/30 bg-blue-500/[0.05] text-[10px] text-blue-300">
                    ✓
                  </span>

                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-4 text-[10px] uppercase tracking-[0.28em] text-blue-200/55">
              <span className="h-px w-10 bg-blue-400/45" />
              Transparant / centraal / persoonlijk
            </div>

            <Link
              href="/dashboard"
              className="group mt-10 inline-flex h-12 items-center gap-3 rounded-lg bg-[#2563EB] px-6 text-sm font-semibold text-white shadow-[0_0_24px_rgba(37,99,235,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1D4ED8] hover:shadow-[0_0_32px_rgba(37,99,235,0.32)]"
            >
              Bekijk Workspace demo
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/12 blur-[140px]" />

            <div className="relative overflow-hidden rounded-[30px] border border-white/[0.14] bg-[#0A101A] p-5 shadow-[0_35px_110px_rgba(0,0,0,0.4)] sm:p-7">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-300" />
                  <span className="h-2 w-2 rounded-full bg-blue-400/35" />
                  <span className="h-2 w-2 rounded-full bg-blue-400/20" />
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[9px] uppercase tracking-[0.24em] text-blue-200/50">
                    FILVON Workspace
                  </span>

                  <span className="rounded-md border border-blue-400/25 bg-blue-500/[0.05] px-3 py-2 text-[8px] uppercase tracking-[0.2em] text-blue-200/70">
                    Actief
                  </span>
                </div>
              </div>

              <div className="mt-6 grid gap-5 xl:grid-cols-[1fr_230px]">
                <div className="space-y-5">
                  <section className="rounded-[22px] border border-white/[0.12] bg-[#07101D] p-5">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.24em] text-blue-200/55">
                          Project
                        </p>

                        <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">
                          Vermeulen Consulting
                        </h3>

                        <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-blue-200/45">
                          Corporate Website
                        </p>
                      </div>

                      <span className="rounded-md border border-blue-400/20 bg-blue-500/[0.04] px-3 py-2 text-[8px] uppercase tracking-[0.18em] text-blue-200/65">
                        Development
                      </span>
                    </div>

                    <div className="mt-7">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-white/45">Voortgang</span>
                        <span className="font-medium text-blue-200">63%</span>
                      </div>

                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full w-[63%] rounded-full bg-gradient-to-r from-blue-600 to-blue-300 shadow-[0_0_16px_rgba(96,165,250,0.5)]" />
                      </div>
                    </div>

                    <div className="mt-7 grid gap-3 sm:grid-cols-3">
                      {[
                        ["Huidige fase", "Development"],
                        ["Volgende stap", "Testing"],
                        ["Oplevering", "18 augustus"],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          className="rounded-xl border border-white/10 bg-white/[0.025] p-4"
                        >
                          <p className="text-[8px] uppercase tracking-[0.18em] text-white/30">
                            {label}
                          </p>

                          <p className="mt-2 text-xs font-medium text-white/75">
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[20px] border border-white/[0.12] bg-[#07101D] p-5">
                      <div className="flex items-center justify-between">
                        <p className="text-[9px] uppercase tracking-[0.22em] text-blue-200/55">
                          Laatste update
                        </p>

                        <span className="h-2 w-2 animate-pulse rounded-full bg-blue-300 shadow-[0_0_14px_rgba(96,165,250,0.8)]" />
                      </div>

                      <p className="mt-5 text-sm font-medium text-white/80">
                        Homepage afgerond
                      </p>

                      <p className="mt-2 text-xs leading-5 text-white/35">
                        De eerste versie staat klaar voor feedback.
                      </p>

                      <p className="mt-5 text-[8px] uppercase tracking-[0.18em] text-white/25">
                        2 uur geleden
                      </p>
                    </div>

                    <div className="rounded-[20px] border border-white/[0.12] bg-[#07101D] p-5">
                      <p className="text-[9px] uppercase tracking-[0.22em] text-blue-200/55">
                        Preview
                      </p>

                      <div className="mt-5 rounded-xl border border-blue-400/20 bg-blue-500/[0.04] p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-xs font-medium text-white/75">
                              Testomgeving
                            </p>

                            <p className="mt-1 text-[9px] uppercase tracking-[0.14em] text-white/30">
                              preview.filvon.be
                            </p>
                          </div>

                          <span className="text-blue-200">→</span>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="rounded-[20px] border border-white/[0.12] bg-[#07101D] p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-[9px] uppercase tracking-[0.22em] text-blue-200/55">
                        Feedback
                      </p>

                      <span className="rounded-md border border-blue-400/20 bg-blue-500/[0.04] px-3 py-1.5 text-[8px] uppercase tracking-[0.18em] text-blue-200/65">
                        3 opmerkingen
                      </span>
                    </div>

                    <div className="mt-5 space-y-3">
                      {[
                        "CTA iets hoger plaatsen",
                        "Nieuwe foto voor de hero",
                        "Tekst bij diensten aanpassen",
                      ].map((item, index) => (
                        <div
                          key={item}
                          className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3"
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`h-2 w-2 rounded-full ${
                                index === 0
                                  ? "bg-blue-300 shadow-[0_0_12px_rgba(96,165,250,0.75)]"
                                  : "bg-white/20"
                              }`}
                            />

                            <span className="text-xs text-white/65">{item}</span>
                          </div>

                          <span className="text-[9px] uppercase tracking-[0.14em] text-white/25">
                            Open
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                <aside className="space-y-5">
                  <div className="rounded-[20px] border border-white/[0.12] bg-[#07101D] p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-[9px] uppercase tracking-[0.22em] text-blue-200/55">
                        Bestanden
                      </p>

                      <span className="text-xs text-white/30">2</span>
                    </div>

                    <div className="mt-5 space-y-3">
                      {files.map((file) => (
                        <div
                          key={file}
                          className="rounded-xl border border-white/10 bg-white/[0.025] p-3"
                        >
                          <p className="text-xs font-medium text-white/70">
                            {file}
                          </p>

                          <p className="mt-2 text-[8px] uppercase tracking-[0.16em] text-white/25">
                            Beschikbaar
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[20px] border border-white/[0.12] bg-[#07101D] p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-[9px] uppercase tracking-[0.22em] text-blue-200/55">
                        Berichten
                      </p>

                      <span className="h-2 w-2 animate-pulse rounded-full bg-blue-300 shadow-[0_0_14px_rgba(96,165,250,0.8)]" />
                    </div>

                    <div className="mt-5 rounded-xl border border-blue-400/20 bg-blue-500/[0.04] p-4">
                      <p className="text-xs font-medium text-white/75">
                        1 nieuw bericht
                      </p>

                      <p className="mt-2 text-[9px] leading-4 text-white/35">
                        Een nieuwe update werd toegevoegd aan jouw project.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-[20px] border border-white/[0.12] bg-[#07101D] p-5">
                    <p className="text-[9px] uppercase tracking-[0.22em] text-blue-200/55">
                      Contactpersoon
                    </p>

                    <div className="mt-5 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-400/25 bg-blue-500/[0.05] text-xs font-semibold text-blue-200">
                        FP
                      </div>

                      <div>
                        <p className="text-xs font-medium text-white/75">
                          Filip Piotrowski
                        </p>

                        <p className="mt-1 text-[9px] uppercase tracking-[0.14em] text-white/30">
                          CEO & Project Manager
                        </p>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
                <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-blue-200/45">
                  <span className="h-px w-8 bg-blue-400/35" />
                  Altijd inzicht in jouw project
                </div>

                <div className="text-[9px] uppercase tracking-[0.2em] text-white/25">
                  FILVON Workspace / Demo
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}