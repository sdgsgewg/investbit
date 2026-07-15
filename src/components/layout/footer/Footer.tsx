"use client";

import Copyright from "./Copyright";
import LegalSection from "./LegalSection";
import FooterLogo from "./FooterLogo";
import FooterLinks from "./FooterLinks";

export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FooterLogo />

          <FooterLinks />

          <LegalSection />
        </div>

        <Copyright />
      </div>
    </footer>
  );
}
