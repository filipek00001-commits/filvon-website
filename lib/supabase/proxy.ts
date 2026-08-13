import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          response = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  const isAdminRoute = pathname.startsWith("/admin");
  const isAdminLogin = pathname === "/admin/login";

  const isWorkspaceRoute = pathname.startsWith("/workspace");
  const isWorkspaceLogin = pathname === "/workspace/login";

  let isAdmin = false;

  if (user) {
    const { data: adminUser } = await supabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();

    isAdmin = !!adminUser;
  }

  // ADMIN — brak logowania
  if (isAdminRoute && !isAdminLogin && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";

    return NextResponse.redirect(url);
  }

  // ADMIN — zalogowany klient próbuje wejść do panelu admina
  if (isAdminRoute && !isAdminLogin && user && !isAdmin) {
    const url = request.nextUrl.clone();
    url.pathname = "/workspace";

    return NextResponse.redirect(url);
  }

  // ADMIN LOGIN — użytkownik już jest zalogowany
  if (isAdminLogin && user) {
    const url = request.nextUrl.clone();
    url.pathname = isAdmin ? "/admin" : "/workspace";

    return NextResponse.redirect(url);
  }

  // WORKSPACE — brak logowania
  if (isWorkspaceRoute && !isWorkspaceLogin && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/workspace/login";

    return NextResponse.redirect(url);
  }

  // WORKSPACE LOGIN — użytkownik już jest zalogowany
  if (isWorkspaceLogin && user) {
    const url = request.nextUrl.clone();
    url.pathname = isAdmin ? "/admin" : "/workspace";

    return NextResponse.redirect(url);
  }

  return response;
}