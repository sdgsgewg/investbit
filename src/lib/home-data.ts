export type HomeFeature = {
  key: "feature1" | "feature2" | "feature3";
  title: string;
  description: string;
};

export type HomeData = Record<"en" | "id", HomeFeature[]>;

export const HOME_FEATURES: HomeData = {
  en: [
    {
      key: "feature1",
      title: "Learn the Basics",
      description:
        "Comprehensive guides and tutorials to help you understand the Indonesian stock market from scratch.",
    },
    {
      key: "feature2",
      title: "Reksa Dana Recap",
      description:
        "Easily log and manage your daily Reksa Dana yields. Groups your items securely by category entirely online.",
    },
    {
      key: "feature3",
      title: "Dynamic Reporting",
      description:
        "Automatically generate gorgeous Weekly and Monthly conditional heatmaps tracking your best and worst performers.",
    },
  ],
  id: [
    {
      key: "feature1",
      title: "Belajar Dasar",
      description:
        "Panduan lengkap untuk memahami pasar saham Indonesia dari nol.",
    },
    {
      key: "feature2",
      title: "Rekap Reksa Dana",
      description:
        "Catat dan kelola hasil Reksa Dana harian dengan mudah dan terorganisir.",
    },
    {
      key: "feature3",
      title: "Laporan Dinamis",
      description:
        "Buat laporan mingguan dan bulanan secara otomatis dengan visualisasi menarik.",
    },
  ],
};
