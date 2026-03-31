"use client";

import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("HomePage");
  const tNav = useTranslations("Nav");

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Investbit
            </h3>
            <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/learn"
                  className="hover:text-primary transition-colors"
                >
                  Learn
                </Link>
              </li>
              {/*
              <li>
                <Link
                  href="/analyze"
                  className="hover:text-primary transition-colors"
                >
                  Analyze
                </Link>
              </li>
              */}
              <li>
                <Link
                  href="/glossary"
                  className="hover:text-primary transition-colors"
                >
                  {tNav("glossary")}
                </Link>
              </li>
              <li>
                <Link
                  href="/reksadana"
                  className="hover:text-primary transition-colors"
                >
                  {tNav("reksadana")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Investbit. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
