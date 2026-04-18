import React from "react";
import { HighlightData } from "@/features/learn/types/HighlightData";
import HighlightSection from "../sections/HighlightSection";
import ParagraphSection from "../sections/ParagraphSection";
import ExampleSection from "../sections/ExampleSection";
import { ExampleData } from "@/features/learn/types/ExampleData";

interface TradingTacticLessonContentProps {
  highlight?: HighlightData;
  paragraphs?: string[];
  example?: ExampleData;
  children?: React.ReactNode;
}

const TradingTacticLessonContent = ({
  highlight,
  paragraphs,
  example,
  children,
}: TradingTacticLessonContentProps) => {
  return (
    <div className="space-y-6">
      {highlight && <HighlightSection highlight={highlight} />}
      {paragraphs && <ParagraphSection paragraphs={paragraphs} />}
      {example && <ExampleSection example={example} />}
      {children}
    </div>
  );
};

export default TradingTacticLessonContent;
