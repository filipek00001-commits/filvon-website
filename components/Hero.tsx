export default function Hero() {
  const workflowSteps = ["Idea", "Design", "Build", "Launch"];

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-white/10 bg-[#030712]"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_73%_43%,rgba(37,99,235,0.18),transparent_40%)]" />

        <div className="absolute left-[5%] top-[15%] h-[540px] w-[650px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.11),transparent_68%)] blur-[95px]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:34px_34px]" />

        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full border border-blue-500/10" />
        <div className="absolute -left-16 top-32 h-56 w-56 rounded-full border border-blue-500/10" />

        <div className="absolute right-12 top-20 h-28 w-28 border-r border-t border-blue-500/15" />
        <div className="absolute bottom-20 right-20 h-40 w-40 border-b border-r border-blue-500/10" />
      </div>

      <div className="relative mx-auto grid min-h-[740px] max-w-[1440px] items-center gap-12 px-8 pt-28 lg:pt-0 lg:grid-cols-[44%_56%] lg:px-[72px]">
        {/* Left side */}
        <div className="max-w-[560px] lg:-translate-y-2">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-[#BCC4D3]">
            Digitale oplossingen. Slimmer gebouwd.
          </p>

          <h1 className="text-[clamp(3.5rem,5vw,4.875rem)] font-bold leading-[0.95] tracking-[-0.05em] text-white">
            Van idee
            <br />
            naar <span className="text-[#2563EB]">impact.</span>
          </h1>

          <p className="mt-8 max-w-[500px] text-[20px] leading-[1.7] text-[#C4CAD6]">
            Wij bouwen digitale oplossingen die bedrijven vooruithelpen.
            Slim, schaalbaar en met een doel.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href="#contact"
              className="inline-flex h-14 items-center gap-3 rounded-md bg-[#2563EB] px-7 font-semibold text-white shadow-[0_0_30px_rgba(37,99,235,0.18)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#1d4ed8] hover:shadow-[0_0_40px_rgba(37,99,235,0.3)]"
            >
              <span>Offerte aanvragen</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        {/* Right side */}
        <div className="relative min-h-[580px] lg:translate-x-6">
          {/* Stronger glow under the workspace */}
          <div className="absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-[150px]" />

          <div className="absolute left-[17%] top-[20%] h-[360px] w-[540px] rounded-full bg-blue-500/10 blur-[90px]" />

          {/* Construction elements */}
          <div className="absolute right-[3%] top-[2%] h-28 w-28 rounded-full border border-blue-400/20" />
          <div className="absolute right-[6%] top-[5%] h-20 w-20 rounded-full border border-blue-400/15" />

          <div className="absolute right-[9.5%] top-[8.5%] h-3 w-3 animate-pulse rounded-full bg-blue-400 shadow-[0_0_18px_rgba(96,165,250,0.9)]" />

          {/* Panels behind */}
          <div className="absolute right-[1%] top-[3%] h-[76%] w-[56%] rotate-[5deg] rounded-2xl border border-blue-400/[0.12]" />

          <div className="absolute right-[6%] top-[8%] h-[68%] w-[50%] rotate-[5deg] rounded-2xl border border-blue-400/[0.08]" />

          {/* Main workspace */}
          <div className="absolute left-[1%] top-[8%] w-[93%] origin-center scale-[1.05] rotate-[-2deg] rounded-2xl border border-blue-400/30 bg-gradient-to-br from-[#0B162A]/95 to-[#07101E]/95 p-4 shadow-[0_35px_110px_rgba(0,0,0,0.52)] backdrop-blur-sm transition duration-500 hover:-translate-y-1 hover:rotate-[-1deg]">
            {/* Window bar */}
            <div className="flex h-11 items-center justify-between border-b border-white/10 px-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-400/90" />
                <span className="h-2 w-2 rounded-full bg-blue-400/35" />
                <span className="h-2 w-2 rounded-full bg-blue-400/35" />
              </div>

              <span className="text-[9px] uppercase tracking-[0.28em] text-blue-200/70">
                Digital workspace / v1.0
              </span>
            </div>

            <div className="grid min-h-[420px] grid-cols-[74px_1fr]">
              {/* Sidebar */}
              <div className="border-r border-white/10 p-4">
                <div className="mb-8 flex h-6 w-6 items-center justify-center rounded border border-blue-400/60">
                  <div className="h-2 w-2 rounded-sm bg-blue-400/80" />
                </div>

                <div className="space-y-5">
                  <div className="h-2 w-8 rounded-full bg-blue-400/60" />
                  <div className="h-2 w-6 rounded-full bg-white/15" />
                  <div className="h-2 w-7 rounded-full bg-white/15" />
                  <div className="h-2 w-5 rounded-full bg-white/15" />
                </div>

                <div className="mt-12 text-[8px] uppercase leading-5 tracking-[0.18em] text-blue-200/35">
                  <p>680 px</p>
                  <p>12 col</p>
                </div>
              </div>

              {/* Workspace content */}
              <div className="relative p-6">
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <p className="mb-2 text-[9px] uppercase tracking-[0.3em] text-blue-200/60">
                      Product environment
                    </p>

                    <div className="h-3 w-44 rounded-full bg-white/20" />
                  </div>

                  <div className="rounded-md border border-blue-400/30 bg-blue-500/[0.04] px-3 py-2 text-[9px] uppercase tracking-[0.2em] text-blue-200/75">
                    System active
                  </div>
                </div>

                {/* Top cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative rounded-xl border border-white/[0.12] bg-white/[0.04] p-4">
                    <div className="absolute right-4 top-4 h-3 w-3 animate-pulse rounded-full bg-blue-400 shadow-[0_0_20px_rgba(96,165,250,1)]" />

                    <div className="mb-5 h-2 w-20 rounded-full bg-white/20" />

                    <div className="flex items-end gap-2">
                      <div className="h-8 w-5 rounded-sm bg-blue-500/25" />
                      <div className="h-14 w-5 rounded-sm bg-blue-500/45" />
                      <div className="h-10 w-5 rounded-sm bg-blue-500/30" />
                      <div className="h-20 w-5 rounded-sm bg-blue-500/65" />
                      <div className="h-12 w-5 rounded-sm bg-blue-500/38" />
                    </div>

                    <div className="mt-4 flex justify-between text-[8px] uppercase tracking-[0.16em] text-white/30">
                      <span>UI</span>
                      <span>Data</span>
                      <span>Flow</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/[0.12] bg-white/[0.04] p-4">
                    <div className="mb-6 h-2 w-24 rounded-full bg-white/20" />

                    <div className="relative h-20">
                      <div className="absolute left-1 top-9 h-px w-[90%] rotate-[-7deg] bg-blue-400/55" />

                      <div className="absolute left-[18%] top-8 h-2 w-2 rounded-full bg-blue-400" />
                      <div className="absolute left-[48%] top-5 h-2 w-2 rounded-full bg-blue-400" />

                      <div className="absolute right-[10%] top-1 h-2 w-2 animate-pulse rounded-full bg-blue-300 shadow-[0_0_18px_rgba(96,165,250,1)]" />
                    </div>

                    <div className="mt-2 text-[8px] uppercase tracking-[0.16em] text-white/30">
                      Growth trajectory
                    </div>
                  </div>
                </div>

                {/* Bottom cards */}
                <div className="mt-4 grid grid-cols-[1fr_165px] gap-4">
                  <div className="rounded-xl border border-white/[0.12] bg-white/[0.035] p-4">
                    <div className="mb-5 flex items-center justify-between">
                      <div className="h-2 w-28 rounded-full bg-white/20" />

                      <span className="text-[9px] uppercase tracking-[0.2em] text-blue-200/60">
                        Workflow
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      {workflowSteps.map((step, index) => (
                        <div key={step} className="flex items-center">
                          <div className="flex flex-col items-center gap-2">
                            <div
                              className={`h-7 w-7 rounded-full border ${
                                index === workflowSteps.length - 1
                                  ? "animate-pulse border-blue-300 bg-blue-500/25 shadow-[0_0_18px_rgba(96,165,250,0.65)]"
                                  : "border-white/20 bg-[#0A1527]"
                              }`}
                            />

                            <span className="text-[8px] uppercase tracking-[0.16em] text-white/40">
                              {step}
                            </span>
                          </div>

                          {index < workflowSteps.length - 1 && (
                            <div className="mx-3 mb-5 h-px w-8 bg-blue-400/30" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/[0.12] bg-black/25 p-4 font-mono">
                    <p className="text-[8px] uppercase tracking-[0.18em] text-blue-200/60">
                      API / Status
                    </p>

                    <div className="mt-4 space-y-2 text-[9px] leading-4">
                      <p className="text-white/35">
                        <span className="text-blue-200/80">POST</span>{" "}
                        /api/project
                      </p>

                      <p className="text-white/35">
                        status:{" "}
                        <span className="text-blue-200/80">success</span>
                      </p>

                      <p className="text-white/35">
                        build:{" "}
                        <span className="text-blue-200/80">ready</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Active node */}
                <div className="pointer-events-none absolute left-[43%] top-[31%]">
                  <div className="relative h-5 w-5">
                    <div className="absolute inset-0 animate-ping rounded-full bg-blue-400/35" />

                    <div className="absolute inset-[6px] rounded-full bg-blue-300 shadow-[0_0_22px_rgba(96,165,250,1)]" />
                  </div>
                </div>

                {/* Connector lines */}
                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  viewBox="0 0 700 420"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M302 142 C330 150 345 190 370 215"
                    fill="none"
                    stroke="rgba(96,165,250,0.42)"
                    strokeWidth="1"
                    strokeDasharray="5 7"
                  />

                  <path
                    d="M370 215 C430 235 505 250 568 292"
                    fill="none"
                    stroke="rgba(96,165,250,0.32)"
                    strokeWidth="1"
                    strokeDasharray="5 7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Labels */}
          <div className="absolute bottom-[7%] left-[2%] text-[9px] uppercase leading-6 tracking-[0.24em] text-blue-200/45">
            <p>UI grid / responsive</p>
            <p>Product development</p>
          </div>

          <div className="absolute bottom-[7%] right-[3%] text-right text-[9px] uppercase leading-6 tracking-[0.24em] text-blue-200/45">
            <p>Design → build</p>
            <p>Idea → impact</p>
          </div>
        </div>
      </div>
    </section>
  );
}