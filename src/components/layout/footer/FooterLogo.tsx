import { useTranslations } from "next-intl";
import React from "react";

const FooterLogo = () => {
  const tHome = useTranslations("home");

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-bold text-lg bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
        Investbit
      </h3>
      <p className="text-sm text-muted-foreground">{tHome("subtitle")}</p>
    </div>
  );
};

export default FooterLogo;
