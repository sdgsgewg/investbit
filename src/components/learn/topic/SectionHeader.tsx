import React from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { getSlugKey } from "@/lib/utils/string";
import { useTranslations } from "next-intl";

interface Props {
  sectionSlug: string;
}

const SectionHeader = ({ sectionSlug }: Props) => {
  const slugKey = getSlugKey(sectionSlug as string);

  const t = useTranslations(`public.learn.${slugKey}`);

  return (
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
  );
};

export default SectionHeader;
