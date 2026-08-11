"use client";

import { CHAPTER_DATA } from "@/data/chapters";
import { ArrowLeft } from "lucide-react";
import { ChapterHeader, ChapterLesson } from "@/components/learn/topic/chapter";
import { useParams } from "next/navigation";
import { useRouter } from "@/navigation";
import { ROUTES } from "@/constants/routes";

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const slug = params.chapter;

  const chapter = CHAPTER_DATA.find(
    (chapter) => chapter.slug === params.chapter,
  );

  if (!chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Chapter not found</h2>
          <button
            onClick={() => router.push(`${ROUTES.LEARN}/${slug}`)}
            className="text-primary hover:underline flex items-center justify-center cursor-pointer"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Chapters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ChapterHeader chapter={chapter} />

      {/* Chapter Content */}
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {chapter.lessons.map((lesson, index) => (
            <ChapterLesson key={index} lesson={lesson} />
          ))}
        </div>
      </div>
    </div>
  );
}
