"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { createClient } from "@/lib/supabase/clients";

type Project = {
  id: string;
  client: string;
  slug: string;
  project: string;
  status: string;
  progress: number;
  deadline: string;
};

export default function ProjectsPage() {
  const supabase = createClient();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      setErrorMessage("");

      const { data, error } = await supabase
        .from("clients")
        .select(
          "id, client_name, slug, project_name, status, progress, deadline",
        )
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase projects error:", error);
        setErrorMessage(
          error.message || "Projecten konden niet geladen worden.",
        );
        setProjects([]);
        setLoading(false);
        return;
      }

      const formattedProjects: Project[] = (data ?? []).map((item) => ({
        id: item.id,
        client: item.client_name ?? "",
        slug: item.slug ?? "",
        project: item.project_name ?? "Geen projectnaam",
        status: item.status ?? "Discovery",
        progress: Number(item.progress ?? 0),
        deadline: item.deadline ?? "Geen deadline",
      }));

      setProjects(formattedProjects);
      setLoading(false);
    }

    loadProjects();
  }, []);

  return (
    <main className="min-h-screen bg-[#05080D] text-white">
      <div className="flex min-h-screen">
        <AdminSidebar />

        <div className="min-w-0 flex-1">
          <AdminTopbar title="Projecten" />

          <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10">
            <p className="text-[10px] uppercase tracking-[0.28em] text-blue-200/55">
              Projecten
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">
              Alle projecten
            </h1>

            <p className="mt-4 text-white/40">
              Bekijk de voortgang en status van alle klantprojecten.
            </p>

            {errorMessage && (
              <div className="mt-8 rounded-[22px] border border-red-400/20 bg-red-500/[0.06] p-5">
                <p className="text-sm font-semibold text-red-200">
                  Projecten konden niet geladen worden
                </p>

                <p className="mt-2 text-sm text-red-100/60">
                  {errorMessage}
                </p>
              </div>
            )}

            {loading ? (
              <div className="mt-8 rounded-[22px] border border-white/10 bg-[#0A101A] px-5 py-12 text-center">
                <p className="text-sm text-white/40">
                  Projecten laden...
                </p>
              </div>
            ) : (
              <>
                <div className="mt-8 space-y-4">
                  {projects.map((project) => (
                    <Link
                      key={project.id}
                      href={`/admin/client/${project.slug}`}
                      className="block rounded-[22px] border border-white/10 bg-[#0A101A] p-5 transition hover:border-blue-400/30"
                    >
                      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto] lg:items-center">
                        <div>
                          <p className="font-semibold">
                            {project.project}
                          </p>

                          <p className="mt-2 text-sm text-white/35">
                            {project.client}
                          </p>
                        </div>

                        <div>
                          <p className="text-[9px] uppercase tracking-[0.16em] text-white/25">
                            Status
                          </p>

                          <p className="mt-2 text-sm">
                            {project.status}
                          </p>
                        </div>

                        <div>
                          <p className="text-[9px] uppercase tracking-[0.16em] text-white/25">
                            Voortgang
                          </p>

                          <p className="mt-2 text-sm text-blue-200">
                            {project.progress}%
                          </p>
                        </div>

                        <div>
                          <p className="text-[9px] uppercase tracking-[0.16em] text-white/25">
                            Deadline
                          </p>

                          <p className="mt-2 text-sm">
                            {project.deadline}
                          </p>
                        </div>

                        <span className="text-blue-200">→</span>
                      </div>
                    </Link>
                  ))}
                </div>

                {projects.length === 0 && (
                  <div className="mt-8 rounded-[22px] border border-white/10 bg-[#0A101A] px-5 py-14 text-center">
                    <p className="font-semibold">
                      Geen projecten gevonden.
                    </p>

                    <p className="mt-2 text-sm text-white/35">
                      Voeg eerst een klant met een project toe.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}