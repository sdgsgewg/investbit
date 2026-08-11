import { ROUTES } from "@/constants/routes";
import { Chapter } from "@/data/chapters";
import { getSlugKey } from "@/lib/utils/string";
import { useRouter } from "@/navigation";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
  index: number;
  sectionSlug: string;
  chapter: Chapter;
}

const ChapterCard = ({ index, sectionSlug, chapter }: Props) => {
  const router = useRouter();

  const slugKey = getSlugKey(sectionSlug as string);

  const t = useTranslations(`public.learn.${slugKey}`);

  const Icon = chapter.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      key={chapter.slug}
      onClick={() =>
        router.push(`${ROUTES.LEARN}/${sectionSlug}/${chapter.slug}`)
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
};

export default ChapterCard;
