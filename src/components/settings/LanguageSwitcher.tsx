"use client";

import { usePathname } from "@/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";
import { useTranslations } from "next-intl";

export function LanguageSwitcher() {
  const tLang = useTranslations("lang");
  const tLangOptions = useTranslations("lang.options");

  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    window.location.href = `/${newLocale}${pathname}`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{tLang("title")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => switchLocale("en")}>
          {tLangOptions("english")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLocale("id")}>
          {tLangOptions("indonesia")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
