import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { MANAGE_ROUTE_PERMISSIONS } from "@/lib/auth/permissions";

const intlMiddleware = createMiddleware({
  locales: ["en", "id"],
  defaultLocale: "id",
});

export default async function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );

          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const pathname = request.nextUrl.pathname;

  const locale = pathname.match(/^\/(en|id)/)?.[1] ?? "id";

  // Hilangkan locale supaya bisa dibandingkan dengan ROUTES
  const normalizedPath = pathname.replace(/^\/(en|id)/, "") || "/";

  const matchedPermission = MANAGE_ROUTE_PERMISSIONS.find(({ routes }) =>
    routes.some(
      (route) =>
        normalizedPath === route || normalizedPath.startsWith(`${route}/`),
    ),
  );

  // Bukan halaman yang membutuhkan permission khusus
  if (!matchedPermission) {
    return response;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Guest only (auth pages)
  if (matchedPermission.type === "guest") {
    if (user) {
      return NextResponse.redirect(new URL(`/${locale}`, request.url));
    }

    return response;
  }

  // Guest -> Login
  if (!user) {
    const loginUrl = new URL(`/${locale}/login`, request.url);

    loginUrl.searchParams.set("next", pathname);

    return NextResponse.redirect(loginUrl);
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!matchedPermission.check(profile)) {
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  return response;
}

export const config = {
  matcher: ["/", "/(id|en)/:path*"],
};
