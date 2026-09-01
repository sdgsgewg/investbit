"use client";

import { User } from "@supabase/supabase-js";
import { Profile } from "@/types/profile";
import {
  AuthProvider,
  QueryProvider,
  ThemeProvider,
  ToastProvider,
} from "@/providers";

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
      <ToastProvider>
        <AuthProvider initialUser={initialUser} initialProfile={initialProfile}>
          <QueryProvider>{children}</QueryProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
