import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#03060B]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.07),transparent_50%)]" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 py-16 sm:px-8 lg:px-[72px] lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr_1fr]">
          
          {/* Brand */}
          <div>
            <a
              href="#top"
              aria-label="FILVON home"
              className="group inline-flex items-center gap-3"
            >
              <Image
                src="/filvon-mark-final.svg"
                alt=""
                width={52}
                height={46}
                className="h-[46px] w-auto transition-opacity duration-300 group-hover:opacity-80"
              />

              <span className="text-[21px] font-medium tracking-[0.28em] text-white">
                FILVON
              </span>
            </a>

            <p className="mt-7 max-w-[360px] text-sm leading-7 text-[#8F9AAA]">
              Digitale oplossingen met focus op helderheid, kwaliteit en
              langdurige samenwerking.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.025] text-sm font-semibold text-white/55 transition duration-200 hover:border-blue-400/30 hover:bg-blue-500/[0.06] hover:text-blue-200"
              >
                in
              </a>

              <a
                href="mailto:filvon@outlook.com"
                aria-label="E-mail"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.025] text-white/55 transition duration-200 hover:border-blue-400/30 hover:bg-blue-500/[0.06] hover:text-blue-200"
              >
                @
              </a>
            </div>
          </div>

          {/* Navigatie */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-200/55">
              Navigatie
            </p>

            <nav className="mt-6 flex flex-col gap-4 text-sm text-[#AEB7C6]">
              <a
                href="#expertise"
                className="w-fit transition-colors duration-200 hover:text-white"
              >
                Diensten
              </a>

              <a
                href="#process"
                className="w-fit transition-colors duration-200 hover:text-white"
              >
                Werkwijze
              </a>

              <a
                href="#samenwerking"
                className="w-fit transition-colors duration-200 hover:text-white"
              >
                Samenwerking
              </a>

              <a
                href="#contact"
                className="w-fit transition-colors duration-200 hover:text-white"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-200/55">
              Contact
            </p>

            <div className="mt-6 flex flex-col gap-4 text-sm text-[#AEB7C6]">
              <a
                href="mailto:filvon@outlook.com"
                className="w-fit transition-colors duration-200 hover:text-white"
              >
                filvon@outlook.com
              </a>

              <a
                href="tel:+32XXXXXXXXX"
                className="w-fit transition-colors duration-200 hover:text-white"
              >
                +32 489 20 48 75
              </a>

              <span>België</span>

              <span className="text-white/35">
                <a
  href="https://www.linkedin.com/company/filvon"
  target="_blank"
  rel="noopener noreferrer"
  className="text-blue-300/70 transition-colors hover:text-blue-300"
>
  LinkedIn
</a>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-[10px] uppercase tracking-[0.22em] text-white/30 sm:flex-row">
          <span>© 2026 FILVON</span>

          <span>Web • AI • Automation</span>
        </div>
      </div>
    </footer>
  );
}