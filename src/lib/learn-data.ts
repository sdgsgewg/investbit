export type LearnSection = {
  title: string;
  description: string;
  content: string;
};

export type LearnTab = {
  key: "basics" | "analysis" | "indonesia";
  label: string;
  sections: LearnSection[];
};

export type LearnData = Record<"en" | "id", LearnTab[]>;

export const LEARN_DATA: LearnData = {
  en: [
    {
      key: "basics",
      label: "Stock Basics",
      sections: [
        {
          title: "What is a Stock?",
          description: "Understanding ownership in a company.",
          content:
            "A stock (also known as equity) is a security that represents the ownership of a fraction of a corporation...",
        },
        {
          title: "Why Invest in Stocks?",
          description: "The power of compounding and growth.",
          content:
            "Investing in stocks provides an opportunity to grow your money over time...",
        },
      ],
    },
    {
      key: "analysis",
      label: "Analysis 101",
      sections: [
        {
          title: "Fundamental Analysis",
          description: "Evaluating a company's intrinsic value.",
          content:
            "Fundamental analysis involves looking at financial ratios like PER, PBV, and ROE...",
        },
        {
          title: "Technical Analysis",
          description: "Studying price patterns and trends.",
          content:
            "Technical analysis is a trading discipline used to evaluate investments...",
        },
      ],
    },
    {
      key: "indonesia",
      label: "IDX Guide",
      sections: [
        {
          title: "Indonesia Stock Exchange (IDX)",
          description: "Getting started with investing in Indonesia.",
          content:
            "The Indonesia Stock Exchange (IDX) is the stock exchange based in Jakarta...",
        },
        {
          title: "Blue Chip Stocks (LQ45)",
          description: "The most liquid and large-cap stocks.",
          content: "In Indonesia, the LQ45 index consists of 45 companies...",
        },
      ],
    },
  ],

  id: [
    {
      key: "basics",
      label: "Dasar Saham",
      sections: [
        {
          title: "Apa itu Saham?",
          description: "Memahami kepemilikan dalam perusahaan.",
          content:
            "Saham adalah surat berharga yang menunjukkan kepemilikan atas sebagian perusahaan...",
        },
        {
          title: "Kenapa Investasi Saham?",
          description: "Kekuatan compounding dan pertumbuhan.",
          content:
            "Investasi saham memberikan peluang untuk mengembangkan uang dalam jangka panjang...",
        },
      ],
    },
    {
      key: "analysis",
      label: "Analisis 101",
      sections: [
        {
          title: "Analisis Fundamental",
          description: "Menilai nilai intrinsik perusahaan.",
          content:
            "Analisis fundamental melihat rasio keuangan seperti PER, PBV, dan ROE...",
        },
        {
          title: "Analisis Teknikal",
          description: "Mempelajari pola dan tren harga.",
          content:
            "Analisis teknikal digunakan untuk mengidentifikasi peluang trading dari pergerakan harga...",
        },
      ],
    },
    {
      key: "indonesia",
      label: "Panduan IDX",
      sections: [
        {
          title: "Bursa Efek Indonesia (BEI)",
          description: "Memulai investasi di Indonesia.",
          content:
            "BEI adalah bursa saham di Indonesia. Untuk mulai investasi, kamu perlu membuka RDN...",
        },
        {
          title: "Saham Blue Chip (LQ45)",
          description: "Saham likuid dengan kapitalisasi besar.",
          content:
            "Indeks LQ45 berisi 45 saham dengan likuiditas tinggi dan kapitalisasi besar...",
        },
      ],
    },
  ],
};
