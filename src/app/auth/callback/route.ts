import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

function getSafeNext(next: string | null) {
  if (!next || !next.startsWith("/") || next.startsWith("//")) {
    return "/dashboard";
  }

  return next;
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  const locale = searchParams.get("locale") ?? "en";
  // prevent external urls and to ensure the next only store relative internal paths
  const next = getSafeNext(searchParams.get("next"));

  const redirectPath = `/${locale}${next}`;

  if (code) {
    const cookieStore = await cookies();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (supabaseUrl && supabaseKey) {
      const supabase = createServerClient(supabaseUrl, supabaseKey, {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options),
              );
            } catch {
              // Server component / callback headers update ignore
            }
          },
        },
      });

      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        return NextResponse.redirect(`${origin}${redirectPath}`);
      }
    }
  }

  const localeMatch = next.match(/^\/(en|id)/);
  const localePrefix = localeMatch ? localeMatch[0] : "";

  // return the user to an error page with instructions
  return NextResponse.redirect(
    `${origin}${localePrefix}/login?error=auth-callback-failed`,
  );
}
