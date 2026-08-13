import Reveal from "@/components/Reveal";

const services = [
  {
    number: "01",
    title: "Web Development",
    label: "Responsive systems",
    description:
      "Snelle, schaalbare websites en digitale ervaringen die vertrouwen opbouwen, duidelijk communiceren en resultaat leveren.",
    visual: (
      <div className="relative h-full min-h-[235px] overflow-hidden rounded-[22px] border border-white/[0.14] bg-[#0A1422]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_45%,rgba(37,99,235,0.13),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:28px_28px]" />
        <div className="absolute left-[9%] top-[11%] w-[82%] rounded-[18px] border border-blue-400/25 bg-[#0D192A]/95 p-4 shadow-[0_28px_75px_rgba(0,0,0,0.35)]">
          <div className="flex h-8 items-center justify-between border-b border-white/[0.12]">
            <div className="flex gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-300" />
              <span className="h-2 w-2 rounded-full bg-blue-400/35" />
              <span className="h-2 w-2 rounded-full bg-blue-400/20" />
            </div>
            <div className="h-2 w-20 rounded-full bg-white/10" />
          </div>
          <div className="grid grid-cols-[58%_42%] gap-4 py-5">
            <div>
              <div className="h-2 w-20 rounded-full bg-blue-300/45" />
              <div className="mt-4 h-4 w-[88%] rounded-full bg-white/25" />
              <div className="mt-2 h-4 w-[68%] rounded-full bg-white/18" />
              <div className="mt-4 h-2 w-[82%] rounded-full bg-white/10" />
              <div className="mt-2 h-2 w-[62%] rounded-full bg-white/10" />
              <div className="mt-5 flex gap-3">
                <div className="h-8 w-24 rounded-md bg-blue-500/65" />
                <div className="h-8 w-20 rounded-md border border-white/15" />
              </div>
            </div>
            <div className="relative overflow-hidden rounded-xl border border-blue-400/20 bg-blue-500/[0.04]">
              <div className="absolute left-[18%] top-[22%] h-14 w-14 rounded-xl border border-blue-400/30 bg-blue-500/10" />
              <div className="absolute right-[14%] top-[34%] h-12 w-12 rounded-full border border-white/15" />
              <div className="absolute bottom-[18%] left-[28%] h-10 w-20 rounded-lg border border-white/10" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 border-t border-white/[0.08] pt-4">
            <div className="h-10 rounded-lg border border-white/10 bg-white/[0.03]" />
            <div className="h-10 rounded-lg border border-white/10 bg-white/[0.03]" />
            <div className="h-10 rounded-lg border border-white/10 bg-white/[0.03]" />
          </div>
        </div>
        <div className="absolute bottom-4 left-6 text-[9px] uppercase tracking-[0.24em] text-blue-200/60">
          UI / structure / performance
        </div>
      </div>
    ),
  },
  {
    number: "02",
    title: "AI Solutions",
    label: "Intelligent workflows",
    description:
      "Praktische AI-oplossingen die informatie slimmer verwerken, beslissingen ondersteunen en dagelijkse processen versnellen.",
    visual: (
      <div className="relative h-full min-h-[235px] overflow-hidden rounded-[22px] border border-white/[0.14] bg-[#0A1422]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.17),transparent_47%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:28px_28px]" />
        <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 520 250" fill="none">
          <path d="M90 130L180 72L260 124L350 68L438 132" stroke="rgba(96,165,250,0.62)" strokeWidth="1.5" />
          <path d="M180 72L215 182L316 192L350 68" stroke="rgba(96,165,250,0.35)" strokeWidth="1.2" strokeDasharray="5 7" />
        </svg>
        {[
          ["left-[14%]", "top-[44%]"],
          ["left-[31%]", "top-[20%]"],
          ["left-[48%]", "top-[40%]"],
          ["left-[65%]", "top-[18%]"],
          ["left-[82%]", "top-[45%]"],
          ["left-[38%]", "top-[67%]"],
          ["left-[59%]", "top-[71%]"],
        ].map(([left, top], index) => (
          <div
            key={index}
            className={`absolute ${left} ${top} flex h-10 w-10 items-center justify-center rounded-full border ${
              index === 2
                ? "border-blue-200 bg-blue-500/25 shadow-[0_0_30px_rgba(96,165,250,0.85)]"
                : "border-white/20 bg-[#0D192A]"
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                index === 2 ? "animate-pulse bg-blue-200" : "bg-blue-400/70"
              }`}
            />
          </div>
        ))}
        <div className="absolute right-5 top-5 rounded-md border border-blue-400/20 bg-blue-500/[0.05] px-3 py-2 text-[8px] uppercase tracking-[0.2em] text-blue-200/70">
          System learning
        </div>
        <div className="absolute bottom-4 left-6 text-[9px] uppercase tracking-[0.24em] text-blue-200/60">
          Data / insight / decision
        </div>
      </div>
    ),
  },
  {
    number: "03",
    title: "Process Automation",
    label: "Connected processes",
    description:
      "Slimme automatiseringen die repetitieve taken verminderen, systemen verbinden en bedrijfsprocessen efficiënter maken.",
    visual: (
      <div className="relative h-full min-h-[235px] overflow-hidden rounded-[22px] border border-white/[0.14] bg-[#0A1422]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_42%_48%,rgba(37,99,235,0.14),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:28px_28px]" />
        <div className="absolute left-[10%] top-[11%] w-[80%]">
          {["Input", "Process", "Automation", "Result"].map((step, index) => (
            <div key={step} className="relative mb-3 flex items-center">
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ${
                  index === 2
                    ? "border-blue-200 bg-blue-500/25 shadow-[0_0_26px_rgba(96,165,250,0.7)]"
                    : "border-white/20 bg-[#0D192A]"
                }`}
              >
                <span className="text-[10px] font-semibold text-white/75">0{index + 1}</span>
              </div>
              <div className="ml-4 flex-1 rounded-xl border border-white/[0.13] bg-white/[0.045] px-4 py-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-white/80">{step}</span>
                  <span
                    className={`h-2 w-2 rounded-full ${
                      index === 2
                        ? "animate-pulse bg-blue-200 shadow-[0_0_15px_rgba(96,165,250,0.8)]"
                        : "bg-blue-400/65"
                    }`}
                  />
                </div>
              </div>
              {index < 3 && <div className="absolute left-[21px] top-11 h-3 w-px bg-blue-400/35" />}
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 left-6 text-[9px] uppercase tracking-[0.24em] text-blue-200/60">
          Flow / connection / efficiency
        </div>
      </div>
    ),
  },
];

export default function Expertise() {
  return (
    <section id="expertise" className="relative overflow-hidden border-b border-white/10 bg-[#070A10]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_54%_40%,rgba(37,99,235,0.11),transparent_44%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.016)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.016)_1px,transparent_1px)] bg-[size:34px_34px]" />
        <div className="absolute -left-24 top-28 h-72 w-72 rounded-full border border-blue-500/10" />
        <div className="absolute bottom-24 right-16 h-36 w-36 border-b border-r border-blue-500/10" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 py-24 sm:px-8 lg:px-[72px] lg:py-28">
        <div className="grid gap-16 lg:grid-cols-[34%_66%] lg:gap-20">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.35em] text-blue-200/75">
              Onze expertise
            </p>
            <h2 className="max-w-[460px] text-[clamp(3rem,4.8vw,5rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-white">
              Wat we
              <br />
              bouwen.
            </h2>
            <p className="mt-8 max-w-[430px] text-[18px] leading-[1.8] text-[#C0C7D3]">
              Drie disciplines die samenkomen in digitale oplossingen die helder werken, slim groeien en echte impact maken.
            </p>

            <div className="mt-11 space-y-4">
              {["Websites en digitale producten", "AI-integraties op maat", "Slimme procesautomatisering"].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-[#AEB7C6]">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-blue-400/30 bg-blue-500/[0.05] text-[10px] text-blue-300">
                    ✓
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-4 text-[10px] uppercase tracking-[0.28em] text-blue-200/55">
              <span className="h-px w-10 bg-blue-400/45" />
              Web / AI / Automation
            </div>
          </Reveal>

          <div className="space-y-6">
            {services.map((service, index) => (
              <Reveal key={service.title} delay={index * 0.15}>
                <article
                  className="group grid overflow-hidden rounded-[28px] border border-white/[0.14] bg-[#0B1018] shadow-[0_25px_80px_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-y-1 hover:border-blue-400/35 hover:bg-[#0E1520] hover:shadow-[0_30px_90px_rgba(0,0,0,0.32)] md:grid-cols-[43%_57%]"
                >
                <div className="flex flex-col justify-center p-8 sm:p-9">
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-blue-200/80">
                        {service.number}
                      </span>

                      <span className="text-right text-[9px] uppercase tracking-[0.23em] text-white/35">
                        {service.label}
                      </span>
                    </div>

                    <h3 className="mt-7 text-[38px] font-semibold leading-[1.05] tracking-[-0.035em] text-white">
                      {service.title}
                    </h3>

                    <p className="mt-4 text-[16px] leading-[1.7] text-[#B9C1CF]">
                      {service.description}
                    </p>
                  </div>
                </div>

                  <div className="p-4 md:p-5">{service.visual}</div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}