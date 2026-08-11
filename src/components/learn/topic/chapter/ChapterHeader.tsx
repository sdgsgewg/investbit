import { motion } from "framer-motion";
import { useRouter } from "@/navigation";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useTranslations } from "next-intl";
import { Chapter } from "@/data/chapters";
import ChapterReferences from "./ChapterReferences";

interface Props {
  chapter: Chapter;
}

const ChapterHeader = ({ chapter }: Props) => {
  const router = useRouter();

  const t = useTranslations("public.learn.technicalAnalysis");

  const handleNavigateBack = () => {
    router.back();
  };

  return (
    <div className="border-b pb-12">
      <button
        onClick={handleNavigateBack}
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8 group cursor-pointer"
      >
        <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Back to Overview
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-4 text-primary font-semibold uppercase tracking-wider text-sm">
          <BookOpen className="h-5 w-5" />
          <span>{t(chapter.titleKey)}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
          {t(chapter.contentTitleKey)}
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          {t(chapter.descriptionKey)}
        </p>

        {/* References & Disclaimer */}
        {chapter.links && chapter.links.length > 0 && (
          <ChapterReferences links={chapter.links} />
        )}
      </motion.div>
    </div>
  );
};

export default ChapterHeader;
