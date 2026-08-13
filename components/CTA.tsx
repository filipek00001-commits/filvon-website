"use client";

import { FormEvent, useEffect, useState } from "react";

const projectTypes = [
  {
    value: "Website",
    title: "Website",
    description: "Een sterke website of digitaal platform.",
    icon: "🌐",
  },
  {
    value: "AI-oplossing",
    title: "AI-oplossing",
    description: "Slimme AI die jouw werk ondersteunt.",
    icon: "✦",
  },
  {
    value: "Procesautomatisering",
    title: "Automatisering",
    description: "Minder handmatig werk, meer efficiëntie.",
    icon: "⚙",
  },
  {
    value: "Anders",
    title: "Anders",
    description: "Een idee dat niet in een standaardvak past.",
    icon: "◇",
  },
];

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xkjwnydo";

export default function CTA() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function openModal() {
    setIsOpen(true);
    setSubmitted(false);
    setErrorMessage("");
  }

  function closeModal() {
    if (isSubmitting) {
      return;
    }

    setIsOpen(false);
    setErrorMessage("");
  }

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && !isSubmitting) {
        setIsOpen(false);
        setErrorMessage("");
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, isSubmitting]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedType) {
      setErrorMessage("Kies eerst waar je naar op zoek bent.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    formData.set("projectType", selectedType);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        const formspreeMessage =
          result?.errors
            ?.map((error: { message?: string }) => error.message)
            .filter(Boolean)
            .join(" ") ||
          result?.error ||
          `Formspree fout ${response.status}.`;

        throw new Error(formspreeMessage);
      }

      form.reset();
      setSelectedType("");
      setSubmitted(true);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Onbekende fout bij het versturen.";

      setErrorMessage(`Versturen mislukt: ${message}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <section
        id="contact"
        className="relative overflow-hidden border-b border-white/10 bg-[#05080E]"
      >
        {/* Background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(37,99,235,0.15),transparent_42%)]" />

          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:34px_34px]" />

          <div className="absolute -left-24 top-20 h-72 w-72 rounded-full border border-blue-500/10" />

          <div className="absolute -right-20 bottom-16 h-64 w-64 rounded-full border border-blue-500/10" />
        </div>

        <div className="relative mx-auto max-w-[1440px] px-6 py-28 sm:px-8 lg:px-[72px] lg:py-40">
          <div className="mx-auto max-w-[1050px] text-center">
            <p className="mb-7 text-[11px] font-semibold uppercase tracking-[0.35em] text-blue-200/75">
              Laten we kennismaken
            </p>

            <h2 className="text-[clamp(3rem,5.4vw,5.8rem)] font-semibold leading-[0.95] tracking-[-0.055em] text-white">
              Laten we samen
              <br />
              iets bijzonders bouwen.
            </h2>

            <p className="mx-auto mt-8 max-w-[650px] text-[18px] leading-[1.8] text-[#C0C7D3]">
              Of je nu een website, AI-oplossing of automatisering nodig hebt,
              wij bouwen digitale oplossingen die klaar zijn voor de toekomst.
            </p>

            {/* Main CTA */}
            <button
              type="button"
              onClick={openModal}
              className="group mt-12 inline-flex h-16 items-center justify-center gap-3 rounded-lg bg-[#2563EB] px-10 text-[15px] font-semibold text-white shadow-[0_0_40px_rgba(37,99,235,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#1D4ED8] hover:shadow-[0_0_50px_rgba(37,99,235,0.4)]"
            >
              <span>Offerte aanvragen</span>

              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </button>

            <p className="mt-9 text-xs text-white/35">
              Liever direct contact?
            </p>

            {/* Direct contact */}
            <div className="mx-auto mt-5 grid max-w-[650px] gap-3 sm:grid-cols-2">
              {/* Email */}
              <a
                href="mailto:filvon@outlook.com"
                className="group flex min-h-[86px] items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.025] px-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/30 hover:bg-blue-500/[0.06]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/[0.07] text-blue-200">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 6.5h16v11H4v-11Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="m5 8 7 5 7-5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div className="min-w-0">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/30">
                    E-mail
                  </p>

                  <p className="mt-2 truncate text-sm font-semibold text-white transition group-hover:text-blue-100">
                    filvon@outlook.com
                  </p>
                </div>

                <span className="ml-auto text-blue-200/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-blue-200">
                  →
                </span>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/32489204875"
                target="_blank"
                rel="noreferrer"
                className="group flex min-h-[86px] items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.025] px-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/30 hover:bg-blue-500/[0.06]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/[0.07] text-blue-200">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path
                      d="M20 11.5a8 8 0 0 1-11.85 7L4 19.5l1.1-4A8 8 0 1 1 20 11.5Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 9.5c.6 2 2 3.4 4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/30">
                    WhatsApp
                  </p>

                  <p className="mt-2 text-sm font-semibold text-white transition group-hover:text-blue-100">
                    Stuur een bericht
                  </p>
                </div>

                <span className="ml-auto text-blue-200/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-blue-200">
                  →
                </span>
              </a>
            </div>

            <p className="mt-5 text-[11px] leading-5 text-white/25">
              We nemen zo snel mogelijk contact met je op.
            </p>

            <div className="mx-auto mt-20 max-w-[820px] border-t border-white/10 pt-8">
              <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <p className="text-[10px] uppercase tracking-[0.24em] text-blue-200/45">
                  FILVON • WEB • AI • AUTOMATION
                </p>

                <p className="text-[10px] uppercase tracking-[0.24em] text-white/25">
                  DIGITAL AGENCY • BELGIUM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className="relative max-h-[92vh] w-full max-w-[920px] overflow-y-auto rounded-[28px] border border-white/[0.14] bg-[#08101C] shadow-[0_40px_140px_rgba(0,0,0,0.65)]">
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_16%,rgba(37,99,235,0.15),transparent_38%)]" />

              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:34px_34px]" />
            </div>

            <button
              type="button"
              onClick={closeModal}
              disabled={isSubmitting}
              aria-label="Formulier sluiten"
              className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-2xl text-white/70 transition hover:border-blue-400/30 hover:bg-blue-500/[0.08] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              ×
            </button>

            <div className="relative p-6 sm:p-9 lg:p-11">
              <div className="border-b border-white/10 pb-7 pr-14">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-blue-200/65">
                  Contact
                </p>

                <h3
                  id="contact-modal-title"
                  className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl"
                >
                  Plan een gesprek
                </h3>

                <p className="mt-4 max-w-[620px] text-[16px] leading-7 text-[#AEB7C6]">
                  Vertel ons kort waar je naar op zoek bent. We nemen zo snel
                  mogelijk contact met je op.
                </p>
              </div>

              {submitted ? (
                <div className="flex min-h-[430px] flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-blue-300/35 bg-blue-500/10 text-2xl text-blue-200 shadow-[0_0_30px_rgba(37,99,235,0.2)]">
                    ✓
                  </div>

                  <h4 className="mt-7 text-3xl font-semibold text-white">
                    Bedankt!
                  </h4>

                  <p className="mt-4 max-w-[520px] text-[17px] leading-7 text-[#AEB7C6]">
                    Jouw aanvraag werd ontvangen. We nemen zo snel mogelijk
                    contact met je op.
                  </p>

                  <button
                    type="button"
                    onClick={closeModal}
                    className="mt-8 inline-flex h-12 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] px-6 text-sm font-semibold text-white transition hover:border-blue-400/30 hover:bg-blue-500/[0.08]"
                  >
                    Sluiten
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8">
                  <input
                    type="hidden"
                    name="_subject"
                    value="Nieuwe aanvraag via FILVON"
                  />

                  <div className="grid gap-5 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-3 block text-sm font-medium text-white/75">
                        Naam <span className="text-blue-300">*</span>
                      </span>

                      <input
                        type="text"
                        name="name"
                        required
                        autoComplete="name"
                        placeholder="Jouw naam"
                        className="h-14 w-full rounded-xl border border-white/[0.12] bg-[#07101D] px-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-blue-400/45 focus:ring-4 focus:ring-blue-500/10"
                      />
                    </label>

                    <label className="block">
  <span className="mb-3 block text-sm font-medium text-white/75">
    Bedrijf <span className="text-blue-300">*</span>
  </span>

  <input
    type="text"
    name="company"
    required
    autoComplete="organization"
    placeholder="Bedrijfsnaam"
    className="h-14 w-full rounded-xl border border-white/[0.12] bg-[#07101D] px-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-blue-400/45 focus:ring-4 focus:ring-blue-500/10"
  />
</label>

                    <label className="block">
                      <span className="mb-3 block text-sm font-medium text-white/75">
                        E-mailadres <span className="text-blue-300">*</span>
                      </span>

                      <input
                        type="email"
                        name="email"
                        required
                        autoComplete="email"
                        placeholder="naam@bedrijf.be"
                        className="h-14 w-full rounded-xl border border-white/[0.12] bg-[#07101D] px-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-blue-400/45 focus:ring-4 focus:ring-blue-500/10"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-3 block text-sm font-medium text-white/75">
                        Telefoonnummer{" "}
                        <span className="text-white/30">(optioneel)</span>
                      </span>

                      <input
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        placeholder="+32 ..."
                        className="h-14 w-full rounded-xl border border-white/[0.12] bg-[#07101D] px-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-blue-400/45 focus:ring-4 focus:ring-blue-500/10"
                      />
                    </label>
                  </div>

                  <fieldset className="mt-8">
                    <legend className="text-sm font-medium text-white/75">
                      Waar ben je naar op zoek?{" "}
                      <span className="text-blue-300">*</span>
                    </legend>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {projectTypes.map((type) => {
                        const selected = selectedType === type.value;

                        return (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => {
                              setSelectedType(type.value);
                              setErrorMessage("");
                            }}
                            aria-pressed={selected}
                            className={`group rounded-[18px] border p-4 text-left transition duration-300 ${
                              selected
                                ? "border-blue-300/50 bg-blue-500/[0.1] shadow-[0_0_30px_rgba(37,99,235,0.12)]"
                                : "border-white/[0.12] bg-[#07101D] hover:border-blue-400/30 hover:bg-[#0A1422]"
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <span
                                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border text-lg ${
                                  selected
                                    ? "border-blue-300/45 bg-blue-500/15 text-blue-100"
                                    : "border-white/10 bg-white/[0.025] text-blue-300"
                                }`}
                              >
                                {type.icon}
                              </span>

                              <div>
                                <p className="font-semibold text-white">
                                  {type.title}
                                </p>

                                <p className="mt-1 text-sm leading-6 text-white/40">
                                  {type.description}
                                </p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <input
                      type="hidden"
                      name="projectType"
                      value={selectedType}
                    />
                  </fieldset>

                  <label className="mt-8 block">
                    <span className="mb-3 block text-sm font-medium text-white/75">
                      Beschrijf kort jouw idee of uitdaging{" "}
                      <span className="text-blue-300">*</span>
                    </span>

                    <textarea
                      name="message"
                      required
                      rows={6}
                      placeholder="Vertel ons wat je wilt realiseren, verbeteren of automatiseren..."
                      className="w-full resize-none rounded-[18px] border border-white/[0.12] bg-[#07101D] px-4 py-4 text-sm leading-7 text-white outline-none transition placeholder:text-white/25 focus:border-blue-400/45 focus:ring-4 focus:ring-blue-500/10"
                    />
                  </label>

                  {errorMessage && (
                    <p className="mt-5 rounded-xl border border-red-400/20 bg-red-500/[0.06] px-4 py-3 text-sm leading-6 text-red-200">
                      {errorMessage}
                    </p>
                  )}

                  <div className="mt-7 flex flex-col gap-5 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-[470px] text-xs leading-5 text-white/30">
                      Door het formulier te versturen, geef je ons toestemming
                      om contact met je op te nemen over jouw aanvraag.
                    </p>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group inline-flex h-14 items-center justify-center gap-3 rounded-lg bg-[#2563EB] px-8 text-sm font-semibold text-white shadow-[0_0_30px_rgba(37,99,235,0.2)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                    >
                      <span>
                        {isSubmitting
                          ? "Wordt verstuurd..."
                          : "Verstuur aanvraag"}
                      </span>

                      {!isSubmitting && (
                        <span
                          aria-hidden="true"
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}