export type GlossaryTerm = {
  term: string;
  definition: string;
  implication: string;
  category: "Fundamental" | "Technical" | "General";
};

export const GLOSSARY_TERMS: Record<"en" | "id", GlossaryTerm[]> = {
  en: [
    {
      term: "PER (Price to Earnings Ratio)",
      definition:
        "Valuation ratio of a company's current share price compared to its per-share earnings.",
      implication:
        "A high PER suggests a stock is expensive or high-growth. A low PER implies it might be undervalued or struggling.",
      category: "Fundamental",
    },
    {
      term: "PBV (Price to Book Value)",
      definition:
        "Ratio used to compare a stock's market value to its book value.",
      implication:
        "PBV < 1 usually indicates a stock is undervalued relative to its assets.",
      category: "Fundamental",
    },
    {
      term: "ROE (Return on Equity)",
      definition:
        "Measure of financial performance calculated by dividing net income by shareholders' equity.",
      implication:
        "Higher ROE indicates a company is efficient at generating profits from its capital.",
      category: "Fundamental",
    },
    {
      term: "Dividend Yield",
      definition: "Dividend-only return of a stock investment.",
      implication:
        "High yield is attractive for income investors, but check if it's sustainable.",
      category: "Fundamental",
    },
    {
      term: "Market Cap (Market Capitalization)",
      definition: "The total value of a company's outstanding shares of stock.",
      implication:
        "Classifies companies as Large Cap (Big Caps), Mid Cap, or Small Cap. Big Caps are generally more stable.",
      category: "General",
    },
    {
      term: "IHSG (Indeks Harga Saham Gabungan)",
      definition:
        "The main stock market index of the Indonesia Stock Exchange (IDX).",
      implication: "Reflects the overall market sentiment in Indonesia.",
      category: "General",
    },
    {
      term: "Support & Resistance",
      definition:
        "Price levels where the stock historically has difficulty falling below (support) or rising above (resistance).",
      implication:
        "Used to determine entry and exit points in technical analysis.",
      category: "Technical",
    },
    {
      term: "Bullish",
      definition:
        "Market condition where prices are rising or expected to rise.",
      implication: "Good time to buy or hold stocks.",
      category: "General",
    },
    {
      term: "Bearish",
      definition:
        "Market condition where prices are falling or expected to fall.",
      implication: "Investors might sell or wait for lower prices.",
      category: "General",
    },
    {
      term: "ARA (Auto Rejection Atas)",
      definition: "Maximum daily price increase limit set by the exchange.",
      implication: "Indicates very strong buying interest.",
      category: "General",
    },
    {
      term: "ARB (Auto Rejection Bawah)",
      definition: "Maximum daily price decrease limit set by the exchange.",
      implication: "Indicates strong selling pressure/panic.",
      category: "General",
    },
  ],
  id: [
    {
      term: "PER (Price to Earnings Ratio)",
      definition:
        "Rasio valuasi harga saham perusahaan saat ini dibandingkan dengan laba per sahamnya.",
      implication:
        "PER tinggi menunjukkan saham mahal atau bertumbuh pesat. PER rendah menyiratkan saham mungkin undervalued atau sedang kesulitan.",
      category: "Fundamental",
    },
    {
      term: "PBV (Price to Book Value)",
      definition:
        "Rasio yang digunakan untuk membandingkan nilai pasar saham dengan nilai bukunya.",
      implication:
        "PBV < 1 biasanya menunjukkan saham undervalued relatif terhadap asetnya.",
      category: "Fundamental",
    },
    {
      term: "ROE (Return on Equity)",
      definition:
        "Ukuran kinerja keuangan yang dihitung dengan membagi laba bersih dengan ekuitas pemegang saham.",
      implication:
        "ROE yang lebih tinggi menunjukkan perusahaan efisien dalam menghasilkan laba dari modalnya.",
      category: "Fundamental",
    },
    {
      term: "Dividend Yield",
      definition: "Pengembalian investasi saham hanya dari dividen.",
      implication:
        "Yield tinggi menarik bagi investor pendapatan, tetapi periksa apakah berkelanjutan.",
      category: "Fundamental",
    },
    {
      term: "Market Cap (Kapitalisasi Pasar)",
      definition: "Total nilai saham beredar perusahaan.",
      implication:
        "Mengklasifikasikan perusahaan sebagai Big Cap, Mid Cap, atau Small Cap. Big Cap umumnya lebih stabil.",
      category: "General",
    },
    {
      term: "IHSG (Indeks Harga Saham Gabungan)",
      definition: "Indeks pasar saham utama Bursa Efek Indonesia (BEI).",
      implication:
        "Mencerminkan sentimen pasar secara keseluruhan di Indonesia.",
      category: "General",
    },
    {
      term: "Support & Resistance",
      definition:
        "Level harga di mana saham secara historis sulit turun di bawahnya (support) atau naik di atasnya (resistance).",
      implication:
        "Digunakan untuk menentukan titik masuk dan keluar dalam analisis teknikal.",
      category: "Technical",
    },
    {
      term: "Bullish",
      definition:
        "Kondisi pasar di mana harga sedang naik atau diperkirakan akan naik.",
      implication: "Waktu yang baik untuk membeli atau menahan saham.",
      category: "General",
    },
    {
      term: "Bearish",
      definition:
        "Kondisi pasar di mana harga sedang turun atau diperkirakan akan turun.",
      implication: "Investor mungkin menjual atau menunggu harga lebih rendah.",
      category: "General",
    },
    {
      term: "ARA (Auto Rejection Atas)",
      definition:
        "Batas kenaikan harga harian maksimum yang ditetapkan oleh Bursa.",
      implication: "Menunjukkan minat beli yang sangat kuat.",
      category: "General",
    },
    {
      term: "ARB (Auto Rejection Bawah)",
      definition:
        "Batas penurunan harga harian maksimum yang ditetapkan oleh Bursa.",
      implication: "Menunjukkan tekanan jual/panik yang kuat.",
      category: "General",
    },
  ],
};
