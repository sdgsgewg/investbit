import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Link } from "@/navigation";
import { HomeExploreFeature } from "@/constants/home/explore";
import { useTranslations } from "next-intl";

interface Props {
  feature: HomeExploreFeature;
  icon: LucideIcon;
}

export default function ExploreCard({ feature, icon: Icon }: Props) {
  const t = useTranslations("public.home.explore.features");
  const tCommonActions = useTranslations("common.actions");

  return (
    <Link
      href={feature.href}
      className="group rounded-2xl border bg-background p-8 shadow-xs transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-transform group-hover:scale-110 dark:bg-blue-900/30 dark:text-blue-400">
        <Icon className="size-6" />
      </div>

      <h3 className="mb-3 text-xl font-bold"> {t(`${feature.key}.title`)} </h3>

      <p className="mb-6 text-muted-foreground">
        {t(`${feature.key}.description`)}
      </p>

      <div className="flex items-center gap-2 text-sm font-semibold text-primary">
        {tCommonActions("explore")}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
