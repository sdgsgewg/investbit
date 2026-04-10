"use client";

import { useTranslations } from "next-intl";
import { CHAPTER_DATA } from "@/data/chapters";
import TopicRenderer from "@/components/content/TopicRenderer";
import { useParams, useRouter } from "next/navigation";
import LessonRenderer from "@/components/content/LessonRenderer";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, ExternalLink, Layers } from "lucide-react";

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale;
  const slug = params.slug;
  const chapter = CHAPTER_DATA.find(
    (chapter) => chapter.slug === params.chapter,
  );

  // Notice we use the slug as the namespace, but fallback to technicalAnalysis if it is the only one we have for now.
  const t = useTranslations("learn.technicalAnalysis");

  if (!chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Chapter not found</h2>
          <button
            onClick={() => router.push(`/${locale}/learn/${slug}`)}
            className="text-primary hover:underline flex items-center justify-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Chapters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Chapter Hero */}
      <div className="bg-muted/30 border-b border-border">
        <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => router.push(`/${locale}/learn/${slug}`)}
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8 group"
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
              <div className="mt-8">
                <details className="group rounded-2xl border border-border bg-muted/30 p-5 transition-all">
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>

                      <div>
                        <h3 className="font-semibold text-primary">
                          References & Disclaimer
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          View sources used in this chapter
                        </p>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="transition-transform group-open:rotate-180">
                      <svg
                        className="h-5 w-5 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>
                  </summary>

                  {/* Content */}
                  <div className="mt-4 pt-4 border-t border-border space-y-3">
                    <p className="text-sm text-muted-foreground">
                      The materials and examples in this chapter are based on
                      publicly available data and educational resources.
                    </p>

                    <ul className="space-y-2">
                      {chapter.links.map((link, index) => (
                        <li key={index}>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-primary hover:underline"
                          >
                            <span className="truncate">{link.label}</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Chapter Content */}
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {chapter.lessons.map((lesson, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative pl-8 md:pl-12"
            >
              <div className="absolute left-0 top-1 h-full w-px bg-border group-last:bg-transparent"></div>
              <div className="absolute left-[-5px] top-2 h-3 w-3 rounded-full bg-primary ring-4 ring-background"></div>

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
          ))}
        </div>
      </div>
    </div>
  );
}
