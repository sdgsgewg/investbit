"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { createClient } from "@/utils/supabase/client";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const t = useTranslations("auth");
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/manage/clubs";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    // Basic Validation
    if (!email || !password || !confirmPassword) {
      setErrorMsg(t("errorOccurred"));
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg(t("passwordsDoNotMatch"));
      return;
    }

    if (password.length < 6) {
      setErrorMsg(t("passwordMinLength"));
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const emailRedirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;

      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo,
        },
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        // If Supabase is configured to auto-confirm users (or not), data.user will exist.
        // If email confirmation is required, we tell the user.
        if (data.session) {
          setSuccessMsg(t("loginSuccess"));
          window.location.href = next;
        } else {
          setSuccessMsg(t("registerSuccess"));
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        }
      }
    } catch {
      setErrorMsg(t("errorOccurred"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center px-4 py-12 overflow-hidden bg-background">
      {/* Background glowing decorations */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full filter blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-card/40 backdrop-blur-xl border border-border/40 shadow-2xl rounded-3xl p-8 relative overflow-hidden">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-primary via-indigo-500 to-indigo-400 mb-2">
              {t("createNewAccount")}
            </h1>
            <p className="text-muted-foreground text-sm">
              {t("registerDescription")}
            </p>
          </div>

          {/* Messages */}
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 flex items-start gap-3 text-destructive text-sm"
            >
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </motion.div>
          )}

          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3 text-emerald-500 text-sm"
            >
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80 block">
                {t("email")}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-muted/30 border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80 block">
                {t("password")}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-muted/30 border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80 block">
                {t("confirmPassword")}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-muted/30 border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-6 rounded-xl bg-linear-to-r from-primary to-indigo-600 hover:from-primary/95 hover:to-indigo-600/95 text-white shadow-lg shadow-primary/10 transition-all font-semibold flex justify-center items-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white" />
                  {t("signingUp")}
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  {t("register")}
                </>
              )}
            </Button>
          </form>

          {/* Footer Navigation */}
          <div className="text-center mt-8 pt-6 border-t border-border/30 text-sm">
            <span className="text-muted-foreground mr-1.5">
              {t("alreadyHaveAccount")}
            </span>
            <Link
              href={`/login?next=${encodeURIComponent(next)}`}
              className="font-semibold text-primary hover:text-indigo-400 transition-colors"
            >
              {t("login")}
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
