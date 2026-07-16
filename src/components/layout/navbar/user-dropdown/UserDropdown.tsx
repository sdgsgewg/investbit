import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/providers/auth-provider";
import { User } from "@supabase/supabase-js";
import { LogOut } from "lucide-react";
import { usePathname, useRouter } from "@/navigation";
import { useTheme } from "next-themes";
import { useLocale, useTranslations } from "next-intl";
import DropdownOptionItem from "./DropdownOptionItem";

interface Props {
  user: User;
}

const MenuSectionHeader = ({ title }: { title: string }) => {
  return (
    <div className="px-2 py-2">
      <p className="text-muted-foreground text-xs font-normal">{title}</p>
    </div>
  );
};

const UserDropdown = ({ user }: Props) => {
  const initials = user?.email?.charAt(0).toUpperCase() ?? "U";

  //   Themes
  const { theme, setTheme } = useTheme();
  const tTheme = useTranslations("theme");
  const tThemeOptions = useTranslations("theme.options");

  //   Localization
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const tLang = useTranslations("lang");
  const tLangOptions = useTranslations("lang.options");

  const switchLocale = (locale: string) => {
    router.push(pathname, { locale });
  };

  const tAuth = useTranslations("auth");

  const { signOut } = useAuth();

  const themes = [
    { value: "light", label: tThemeOptions("light") },
    { value: "dark", label: tThemeOptions("dark") },
    { value: "system", label: tThemeOptions("system") },
  ];

  const languages = [
    { value: "en", label: tLangOptions("english") },
    { value: "id", label: tLangOptions("indonesia") },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex rounded-full focus:outline-none cursor-pointer">
          <Avatar className="h-9 w-9">
            <AvatarImage src="" />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-2">
          <p className="text-sm font-medium truncate">{user.email}</p>
        </div>

        <DropdownMenuSeparator />

        {/* Toggle Theme */}
        <MenuSectionHeader title={tTheme("title")} />

        {themes.map((item) => (
          <DropdownOptionItem
            key={item.value}
            label={item.label}
            active={theme === item.value}
            onClick={() => setTheme(item.value)}
          />
        ))}

        <DropdownMenuSeparator />

        {/* Switch Language */}
        <MenuSectionHeader title={tLang("title")} />

        {languages.map((item) => (
          <DropdownOptionItem
            key={item.value}
            label={item.label}
            active={locale === item.value}
            onClick={() => switchLocale(item.value)}
          />
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={signOut}
          className="text-red-500 focus:text-red-500"
        >
          <LogOut className="h-4 w-4" />
          {tAuth("logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
