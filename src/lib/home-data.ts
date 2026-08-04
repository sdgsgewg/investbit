import { ROUTES } from "@/constants/routes";

export type HomeFeatureKey = "learn" | "glossary" | "performance";

export type HomeFeature = {
  key: HomeFeatureKey;
  title: string;
  description: string;
  href: string;
};

export type HomeData = Record<"en" | "id", HomeFeature[]>;

export const HOME_FEATURES: HomeData = {
  en: [
    {
      key: "learn",
      title: "Learn Investing",
      description:
        "Explore concise learning modules covering investment fundamentals and technical analysis.",
      href: ROUTES.LEARN,
    },
    {
      key: "glossary",
      title: "Investment Glossary",
      description:
        "Understand common investment terms such as PBV, PER, ROE, and other market concepts.",
      href: ROUTES.GLOSSARY,
    },
    {
      key: "performance",
      title: "Mutual Fund Performance",
      description:
        "Compare mutual fund returns across 1 day, 1 month, 3 months, YTD, and 1 year.",
      href: ROUTES.MUTUAL_FUND.PERFORMANCE,
    },
  ],

  id: [
    {
      key: "learn",
      title: "Belajar Investasi",
      description:
        "Pelajari dasar-dasar investasi melalui modul singkat, termasuk materi analisis teknikal.",
      href: ROUTES.LEARN,
    },
    {
      key: "glossary",
      title: "Glosarium Investasi",
      description:
        "Pahami istilah investasi seperti PBV, PER, ROE, dan berbagai konsep pasar lainnya.",
      href: ROUTES.GLOSSARY,
    },
    {
      key: "performance",
      title: "Performa Reksa Dana",
      description:
        "Lihat dan bandingkan return reksa dana dalam periode 1 hari, 1 bulan, 3 bulan, YTD, dan 1 tahun.",
      href: ROUTES.MUTUAL_FUND.PERFORMANCE,
    },
  ],
};
