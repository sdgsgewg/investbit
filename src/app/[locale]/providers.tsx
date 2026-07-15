"use client";

import { ThemeProvider } from "@/providers/theme-provider";
import { QueryProvider } from "@/providers/query-provider";
import { User } from "@supabase/supabase-js";
import { Profile } from "@/types/profile";
import { AuthProvider } from "@/providers/auth-provider";

interface ProvidersProps {
  children: React.ReactNode;
  initialUser: User | null;
  initialProfile: Profile | null;
}

export default function Providers({
  children,
  initialUser,
  initialProfile,
}: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider initialUser={initialUser} initialProfile={initialProfile}>
        <QueryProvider>{children}</QueryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
