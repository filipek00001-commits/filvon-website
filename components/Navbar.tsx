"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const navigation = [
  { label: "Diensten", href: "#expertise" },
  { label: "Werkwijze", href: "#process" },
  { label: "Samenwerking", href: "#samenwerking" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#030712]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-6 sm:h-[84px] sm:px-8 lg:px-[72px]">
          {/* Logo */}
          <a
            href="#top"
            onClick={closeMenu}
            className="relative z-50 flex items-center gap-3"
          >
            <Image
              src="/filvon-mark-final.svg"
              alt="FILVON"
              width={62}
              height={52}
              priority
              className="h-[42px] w-auto sm:h-[48px]"
            />

            <span className="text-[20px] font-medium tracking-[0.28em] text-white">
              FILVON
            </span>
          </a>

          {/* Desktop */}
          <nav className="hidden items-center gap-10 lg:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-zinc-300 transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="hidden h-11 items-center rounded-lg bg-[#2563EB] px-5 text-sm font-semibold text-white transition hover:bg-[#1D4ED8] lg:inline-flex"
          >
            Offerte aanvragen
          </a>

          {/* Mobile button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-50 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white lg:hidden"
          >
            {isOpen ? (
              <span className="text-2xl">✕</span>
            ) : (
              <div className="space-y-1.5">
                <div className="h-0.5 w-6 bg-white" />
                <div className="h-0.5 w-6 bg-white" />
                <div className="h-0.5 w-6 bg-white" />
              </div>
            )}
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-40 bg-[#030712]/98 backdrop-blur-2xl transition-all duration-300 lg:hidden ${
          isOpen
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(37,99,235,.15),transparent_35%)]" />

        <div className="relative flex h-full flex-col px-8 pt-32 pb-10">

          <nav className="space-y-2">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="flex items-center justify-between border-b border-white/10 py-5 transition hover:border-blue-400/30"
              >
                <span className="text-[32px] font-semibold tracking-[-0.03em] text-white">
                  {item.label}
                </span>

                <span className="text-lg text-blue-300/60">→</span>
              </a>
            ))}
          </nav>

          <div className="mt-auto">
            <a
              href="#contact-form"
              onClick={closeMenu}
              className="flex h-12 w-full items-center justify-center rounded-lg bg-[#2563EB] text-sm font-semibold text-white transition hover:bg-[#1D4ED8]"
            >
              Laten we beginnen →
            </a>

            <a
              href="mailto:filvon@outlook.com"
              className="mt-5 block text-center text-sm text-blue-200"
            >
              filvon@outlook.com
            </a>

            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-6 text-[10px] uppercase tracking-[0.22em] text-white/30">
              <span>FILVON</span>
              <span>WEB • AI • AUTOMATION</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}