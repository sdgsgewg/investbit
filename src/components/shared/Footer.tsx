"use client";

import { ROUTES } from "@/app/constants/routes";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

export function Footer() {
  const tHome = useTranslations("HomePage");
  const tNav = useTranslations("Nav");
  const tReksadana = useTranslations("Nav.reksadana");
  const tFooter = useTranslations("Footer");

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Investbit
            </h3>
            <p className="text-sm text-muted-foreground">{tHome("subtitle")}</p>
          </div>
          <div>
            <h4 className="font-medium mb-4">{tFooter("links")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  {tNav("home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/learn"
                  className="hover:text-primary transition-colors"
                >
                  {tNav("learn")}
                </Link>
              </li>
              {/*
              <li>
                <Link
                  href="/analyze"
                  className="hover:text-primary transition-colors"
                >
                  {tNav("analyze")}
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
                  href={ROUTES.REKSADANA.RECAP.INPUT}
                  className="hover:text-primary transition-colors"
                >
                  {tReksadana("recap")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  {tFooter("privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  {tFooter("termsOfService")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Investbit.{" "}
          {tFooter("allRightsReserved")}
        </div>
      </div>
    </footer>
  );
}
