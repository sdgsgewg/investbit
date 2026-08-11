"use client";

import { CHAPTER_DATA } from "@/data/chapters";
import { useParams } from "next/navigation";
import { ChapterCard } from "@/components/learn/topic/chapter";
import { SectionHeader } from "@/components/learn/topic";

export default function Page() {
  const params = useParams();
  const slug = params.section as string;

  const chapters = CHAPTER_DATA;

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionHeader sectionSlug={slug} />

        <div className="grid md:grid-cols-2 gap-6">
          {chapters.map((chapter, index) => (
            <ChapterCard
              key={index}
              index={index}
              sectionSlug={slug}
              chapter={chapter}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
