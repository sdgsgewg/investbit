import { useNavLinks } from "@/hooks/useNavLinks";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import React from "react";

const FooterLinks = () => {
  const tFooter = useTranslations("footer");

  const { navLinks } = useNavLinks();

  return (
    <div>
      <h4 className="font-medium mb-4">{tFooter("links")}</h4>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {navLinks.map((link) => (
          <li key={link.path}>
            <Link
              href={link.path}
              className="hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinks;
