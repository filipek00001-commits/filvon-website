"use client";

import Image from "next/image";
import Link from "next/link";

type AdminSidebarProps = {
  activeSection?: string;
};

const navigation = [
  { label: "Overzicht", href: "/admin", icon: "⌂" },
  { label: "Klanten", href: "/admin/clients", icon: "◉" },
  { label: "Projecten", href: "/admin/projects", icon: "□" },
  { label: "Workspace", href: "/dashboard", icon: "◇" },
  { label: "Instellingen", href: "/admin/settings", icon: "⚙" },
];

export default function AdminSidebar({
  activeSection = "Overzicht",
}: AdminSidebarProps) {
  return (
    <aside className="hidden w-[270px] shrink-0 border-r border-white/10 bg-[#060A12]/95 lg:flex lg:min-h-screen lg:flex-col">
      <div className="flex h-[82px] items-center border-b border-white/10 px-7">
        <Link href="/" className="group flex items-center gap-3">
          <Image
            src="/filvon-mark-final.svg"
            alt="FILVON"
            width={48}
            height={42}
            priority
            className="h-[42px] w-auto transition-opacity duration-300 group-hover:opacity-80"
          />

          <div>
            <p className="text-[17px] font-medium tracking-[0.27em] text-white">
              FILVON
            </p>

            <p className="mt-1 text-[8px] uppercase tracking-[0.22em] text-blue-200/45">
              Admin
            </p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6">
        <p className="mb-4 px-3 text-[9px] font-semibold uppercase tracking-[0.24em] text-white/25">
          Workspace
        </p>

        <div className="space-y-1">
          {navigation.map((item) => {
            const active = activeSection === item.label;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-sm transition ${
                  active
                    ? "border-blue-400/20 bg-blue-500/[0.08] text-white"
                    : "border-transparent text-white/45 hover:bg-white/[0.035] hover:text-white"
                }`}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.025] text-xs text-blue-200">
                  {item.icon}
                </span>

                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-white/10 p-5">
        <div className="rounded-2xl border border-white/10 bg-[#07101D] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-400/25 bg-blue-500/[0.08] text-xs font-semibold text-blue-100">
              FP
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                Filip Piotrowski
              </p>

              <p className="mt-1 text-[9px] uppercase tracking-[0.14em] text-white/30">
                CEO & Project Manager
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}