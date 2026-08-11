import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Lesson } from "@/data/chapters";
import LessonRenderer from "@/features/learn/components/LessonRenderer";
import { Layers } from "lucide-react";
import TopicRenderer from "@/features/learn/components/TopicRenderer";

interface Props {
  lesson: Lesson;
}

const ChapterLesson = ({ lesson }: Props) => {
  const t = useTranslations("public.learn.technicalAnalysis");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative pl-8 md:pl-12"
    >
      <div className="absolute left-0 top-1 h-full w-px bg-border group-last:bg-transparent"></div>
      <div className="absolute -left-1.25 top-2 h-3 w-3 rounded-full bg-primary ring-4 ring-background"></div>

      <div className="mb-8">
        <h2 className="text-3xl font-bold flex items-center gap-3 mb-4 text-foreground">
          {t(lesson.titleKey)}
        </h2>
        {t(lesson.descriptionKey) && (
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t(lesson.descriptionKey)}
          </p>
        )}
      </div>

      {lesson.contentKey && (
        <div className="prose prose-lg dark:prose-invert max-w-none mb-12 prose-headings:text-foreground prose-p:text-muted-foreground bg-card p-6 md:p-8 rounded-2xl border shadow-sm">
          <LessonRenderer contentKey={lesson.contentKey} />
        </div>
      )}

      {lesson.topics && lesson.topics.length > 0 && (
        <div className="space-y-8 mt-8">
          {lesson.topics.map((topic, j) => (
            <div
              key={j}
              className="bg-muted/20 rounded-2xl p-6 md:p-8 border border-border/50"
            >
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <Layers className="h-6 w-6 text-primary" />
                {t(topic.titleKey)}
              </h3>
              <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
                <TopicRenderer contentKey={topic.contentKey} />
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ChapterLesson;
