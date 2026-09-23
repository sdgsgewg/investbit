"use client";

import React from "react";
import { motion } from "framer-motion";
import { Link } from "@/navigation";

export interface AuthCardFooter {
  prompt: string;
  href: string;
  label: string;
}

export interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: AuthCardFooter;
}

export default function AuthCard({
  title,
  description,
  children,
  footer,
}: AuthCardProps) {
  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-background px-4 py-12">
      {/* Background glowing decorations */}
      <div className="absolute top-1/4 left-1/4 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl filter" />
      <div className="absolute right-1/4 bottom-1/4 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl filter" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="z-10 w-full max-w-md"
      >
        <div className="relative overflow-hidden rounded-3xl border border-border/40 bg-card/40 p-8 shadow-2xl backdrop-blur-xl space-y-8">
          {/* Header */}
          <div className="flex flex-col gap-2 text-center">
            <h1 className="bg-linear-to-r from-primary via-indigo-500 to-indigo-400 bg-clip-text text-3xl font-extrabold text-transparent">
              {title}
            </h1>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>

          {/* Form Content */}
          {children}

          {/* Footer Navigation */}
          {footer && (
            <div className="border-t border-border/30 pt-6 text-center text-sm">
              <span className="mr-1.5 text-muted-foreground">
                {footer.prompt}
              </span>
              <Link
                href={footer.href}
                className="font-semibold text-primary transition-colors hover:text-indigo-400"
              >
                {footer.label}
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
