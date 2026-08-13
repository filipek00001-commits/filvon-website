import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-[#05080E] text-white">
      <div className="relative z-10 flex min-h-screen">
        <AdminSidebar activeSection="Instellingen" />

        <div className="min-w-0 flex-1">
          <AdminTopbar title="Instellingen" />

          <div className="mx-auto max-w-[1100px] px-5 py-8 sm:px-8 lg:px-10">
            <p className="text-[10px] uppercase tracking-[0.28em] text-blue-200/55">
              Instellingen
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">
              FILVON Admin instellingen
            </h1>

            <div className="mt-8 space-y-6">
              <section className="rounded-[28px] border border-white/10 bg-[#0A101A] p-6">
                <h2 className="text-xl font-semibold">Profiel</h2>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <label>
                    <span className="text-sm text-white/40">Naam</span>
                    <input
                      defaultValue="Filip Piotrowski"
                      className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-[#07101D] px-4 outline-none"
                    />
                  </label>

                  <label>
                    <span className="text-sm text-white/40">Rol</span>
                    <input
                      defaultValue="CEO & Project Manager"
                      className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-[#07101D] px-4 outline-none"
                    />
                  </label>
                </div>
              </section>

              <section className="rounded-[28px] border border-white/10 bg-[#0A101A] p-6">
                <h2 className="text-xl font-semibold">Bedrijf</h2>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <label>
                    <span className="text-sm text-white/40">Bedrijfsnaam</span>
                    <input
                      defaultValue="FILVON"
                      className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-[#07101D] px-4 outline-none"
                    />
                  </label>

                  <label>
                    <span className="text-sm text-white/40">E-mail</span>
                    <input
                      defaultValue="filvon@outlook.com"
                      className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-[#07101D] px-4 outline-none"
                    />
                  </label>
                </div>
              </section>

              <button
                type="button"
                className="h-12 rounded-lg bg-[#2563EB] px-6 text-sm font-semibold transition hover:bg-[#1D4ED8]"
              >
                Wijzigingen opslaan
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}