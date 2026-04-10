"use client";

import { useTranslations } from "next-intl";
import { CHAPTER_DATA } from "@/data/chapters";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronRight, GraduationCap } from "lucide-react";

export default function Page() {
  const params = useParams();
  const slug = params.slug;
  const locale = params.locale;
  const router = useRouter();

  const modifyWord = (word: string) => {
    const firstChar = word.slice(0, 1).toUpperCase();
    const remainingChar = word.slice(1);
    return firstChar + remainingChar;
  };

  const getSlugKey = (slug: string) => {
    const slugKey = slug
      .split("-")
      .map((word, index) => (index > 0 ? modifyWord(word) : word))
      .join("");

    return slugKey;
  };

  const slugKey = getSlugKey(slug as string);

  const t = useTranslations(`learn.${slugKey}`);

  const chapters = CHAPTER_DATA;

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-secondary/20 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 space-y-6"
        >
          <div className="flex justify-center mb-6">
            <div className="p-5 bg-primary/10 rounded-full shadow-lg shadow-primary/5 ring-1 ring-primary/20">
              <GraduationCap className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70">
            {t("title")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {chapters.map((chapter, index) => {
            const Icon = chapter.icon;

            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={chapter.slug}
                onClick={() =>
                  router.push(`/${locale}/learn/${slug}/${chapter.slug}`)
                }
                className="group relative bg-card hover:bg-accent/5 transition-all duration-300 rounded-3xl border border-border/50 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 p-8 cursor-pointer overflow-hidden flex flex-col justify-between h-full"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500 transform origin-center">
                  <Icon className="h-32 w-32" />
                </div>

                <div className="relative max-w-md z-10 flex-1">
                  <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full uppercase tracking-widest mb-4">
                    {t("chapter")} {index + 1}
                  </div>
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {t(chapter.titleKey)}
                  </h2>
                  <p className="text-muted-foreground line-clamp-3">
                    {t(chapter.descriptionKey)}
                  </p>
                </div>

                <div className="relative z-10 mt-8 flex items-center text-sm font-semibold text-primary/80 group-hover:text-primary transition-colors">
                  {t("startChapter")}
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
