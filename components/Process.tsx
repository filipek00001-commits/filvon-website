import Reveal from "@/components/Reveal";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "We leren jouw bedrijf, doelen en uitdagingen kennen.",
    label: "Kick-off",
  },
  {
    number: "02",
    title: "Strategy",
    description: "We vertalen inzichten naar een heldere digitale roadmap.",
    label: "Analyse",
  },
  {
    number: "03",
    title: "Design",
    description: "We ontwerpen een duidelijke ervaring en moderne interface.",
    label: "Wireframes",
  },
  {
    number: "04",
    title: "Development",
    description: "We bouwen een snelle, schaalbare en betrouwbare oplossing.",
    label: "Development",
  },
  {
    number: "05",
    title: "Launch",
    description: "We testen, lanceren en blijven gericht optimaliseren.",
    label: "Live",
  },
];

function StepIcon({ index }: { index: number }) {
  const common =
    "h-8 w-8 stroke-[1.6] text-blue-300 transition duration-300 group-hover:text-blue-100";

  if (index === 0) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={common}
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="6" stroke="currentColor" />
        <path d="m16 16 4 4" stroke="currentColor" strokeLinecap="round" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={common}
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="8" stroke="currentColor" />
        <circle cx="12" cy="12" r="3.5" stroke="currentColor" />
        <path
          d="M12 4V1.8M20 12h2.2M12 20v2.2M4 12H1.8"
          stroke="currentColor"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={common}
        aria-hidden="true"
      >
        <path
          d="m4 18 3.5-.8L18 6.7 15.3 4 4.8 14.5 4 18Z"
          stroke="currentColor"
          strokeLinejoin="round"
        />
        <path d="m13.8 5.5 2.7 2.7" stroke="currentColor" />
      </svg>
    );
  }

  if (index === 3) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={common}
        aria-hidden="true"
      >
        <path
          d="m8 6-5 6 5 6M16 6l5 6-5 6M14 4l-4 16"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={common}
      aria-hidden="true"
    >
      <path
        d="M14.5 4.5c2.6.3 4.7 2.4 5 5-3.2 1.2-5.7 3.7-6.9 6.9-2.6-.3-4.7-2.4-5-5 1.2-3.2 3.7-5.7 6.9-6.9Z"
        stroke="currentColor"
        strokeLinejoin="round"
      />
      <path
        d="m8.2 15.8-3.7 3.7M6.3 13.9 3 13l.9-3.3M10.1 17.7l.9 3.3 3.3-.9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="15.2" cy="8.8" r="1.3" stroke="currentColor" />
    </svg>
  );
}

export default function Process() {
  return (
    <section
      id="process"
      className="relative overflow-hidden border-b border-white/10 bg-[#05080E]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_36%,rgba(37,99,235,0.12),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.014)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.014)_1px,transparent_1px)] bg-[size:34px_34px]" />
        <div className="absolute -left-20 bottom-16 h-72 w-72 rounded-full border border-blue-500/10" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 py-24 sm:px-8 lg:px-[72px] lg:py-32">
        <div className="grid gap-16 lg:grid-cols-[34%_66%] lg:gap-16">
          <Reveal className="lg:pt-8">
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.35em] text-blue-200/75">
              Onze werkwijze
            </p>

            <h2 className="max-w-[520px] text-[clamp(3rem,4.8vw,5rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-white">
              Van idee
              <br />
              tot lancering.
            </h2>

            <p className="mt-8 max-w-[440px] text-[18px] leading-[1.8] text-[#C0C7D3]">
              Geen ingewikkeld proces. Wel een duidelijke aanpak waarin
              strategie, design en technologie samenkomen.
            </p>

            <div className="mt-11 space-y-4">
              {[
                "Duidelijke communicatie",
                "Transparante voortgang",
                "Iteratief en schaalbaar",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-[#AEB7C6]"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-blue-400/30 bg-blue-500/[0.05] text-[10px] text-blue-300">
                    ✓
                  </span>

                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-4 text-[10px] uppercase tracking-[0.28em] text-blue-200/55">
              <span className="h-px w-10 bg-blue-400/45" />
              Strategy / Design / Build
            </div>
          </Reveal>

          <div>
            <Reveal delay={0.1}>
              <div className="group relative overflow-hidden rounded-[30px] border border-white/[0.14] bg-[#0A101A] shadow-[0_35px_110px_rgba(0,0,0,0.4)]">
                <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_62%_38%,rgba(96,165,250,0.08),transparent_48%)]" />

                <img
                  src="/process-workspace.webp"
                  alt="Digitale werkruimte van FILVON met laptop, notebook en smartphone"
                  className="relative h-[320px] w-full object-cover object-center brightness-[1.18] contrast-[1.08] saturate-[1.03] opacity-95 transition duration-700 group-hover:scale-[1.012] group-hover:brightness-[1.24] group-hover:opacity-100 sm:h-[400px]"
                />

                <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-[#07101D]/45 via-transparent to-black/[0.04]" />
                <div className="pointer-events-none absolute inset-0 z-20 ring-1 ring-inset ring-white/[0.06]" />
              </div>
            </Reveal>

            <div className="relative mt-8">
              <div className="absolute left-[10%] right-[10%] top-[47px] hidden h-px overflow-hidden lg:block">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
                <div className="absolute left-0 top-0 h-px w-24 animate-[processLine_4s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-blue-200 to-transparent shadow-[0_0_16px_rgba(96,165,250,0.75)]" />
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
                {steps.map((step, index) => (
                  <Reveal key={step.title} delay={0.12 + index * 0.06}>
                    <article className="group relative text-center">
                      <div
                        className={`relative mx-auto flex h-[94px] w-[94px] items-center justify-center rounded-full border bg-[#0A1422] shadow-[0_15px_50px_rgba(0,0,0,0.25)] transition duration-300 group-hover:-translate-y-1 group-hover:border-blue-300/55 group-hover:shadow-[0_18px_55px_rgba(37,99,235,0.18)] ${
                          index === 0
                            ? "border-blue-300/45 shadow-[0_0_24px_rgba(96,165,250,0.14)]"
                            : "border-blue-400/25"
                        }`}
                      >
                        <StepIcon index={index} />

                        <span
                          className={`absolute -top-3 flex h-8 min-w-8 items-center justify-center rounded-full border px-2 text-[10px] font-semibold shadow-[0_0_18px_rgba(96,165,250,0.35)] ${
                            index === 0
                              ? "animate-pulse border-blue-200/70 bg-[#17356D] text-white"
                              : "border-blue-300/50 bg-[#10244A] text-blue-100"
                          }`}
                        >
                          {step.number}
                        </span>
                      </div>

                      <h3 className="mt-5 text-[18px] font-semibold tracking-[-0.02em] text-white">
                        {step.title}
                      </h3>

                      <p className="mx-auto mt-3 max-w-[190px] text-sm leading-6 text-[#9FA9B8]">
                        {step.description}
                      </p>

                      <span className="mt-5 inline-flex rounded-md border border-blue-400/15 bg-blue-500/[0.05] px-3 py-2 text-[8px] uppercase tracking-[0.18em] text-blue-200/65">
                        {step.label}
                      </span>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes processLine {
          0% {
            transform: translateX(-110%);
            opacity: 0;
          }

          20% {
            opacity: 1;
          }

          80% {
            opacity: 1;
          }

          100% {
            transform: translateX(800%);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}