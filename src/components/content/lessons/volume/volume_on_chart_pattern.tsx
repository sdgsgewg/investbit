"use client";

import { useTranslations } from "next-intl";
import TechAnalysisLessonContent from "../TechAnalysisLessonContent";
import { IMAGES } from "@/app/constants/images";
import ListSection from "../../sections/ListSection";
import ExampleSection from "../../sections/ExampleSection";
import { ExampleData } from "@/app/types/learn/ExampleData";

export default function VolumeOnChartPattern() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter2.lessons.volume_on_chart_pattern.content",
  );

  const example: ExampleData = {
    title: t("example.title"),
    chart: [IMAGES.VOLUME.VOLUME_ON_CHART_PATTERN.EXAMPLE],
    explanation: t.raw("example.explanation"),
  };

  const list = t.raw("list");
  const listTitle = list.title;
  const listPoints: string[] = list.points;

  const getListPoints = () => {
    return listPoints.map((item) => {
      return {
        text: item,
      };
    });
  };

  return (
    <TechAnalysisLessonContent>
      {/* Intro */}
      <p className="prose prose-invert max-w-none text-base leading-relaxed">
        {t("p1")}
      </p>

      {/* Example Section */}
      <ExampleSection example={example} />

      <p className="prose prose-invert max-w-none">{t("p2")}</p>
      <p className="prose prose-invert max-w-none">{t("p3")}</p>

      <ListSection title={listTitle} points={getListPoints()} />
    </TechAnalysisLessonContent>
  );
}
