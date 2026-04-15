import React from "react";
import { HighlightData } from "@/types/learn/HighlightData";
import HighlightSection from "../sections/HighlightSection";
import ParagraphSection from "../sections/ParagraphSection";

interface TechAnalysisLessonContentProps {
  paragraphs?: string[];
  highlight?: HighlightData;
  children?: React.ReactNode;
}

const TechAnalysisLessonContent = ({
  paragraphs,
  highlight,
  children,
}: TechAnalysisLessonContentProps) => {
  return (
    <div className="space-y-6">
      {paragraphs && <ParagraphSection paragraphs={paragraphs} />}

      {highlight && <HighlightSection highlight={highlight} />}

      {children}
    </div>
  );
};

export default TechAnalysisLessonContent;
