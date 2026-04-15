import React from "react";
import { HighlightData } from "@/types/learn/HighlightData";
import HighlightSection from "../sections/HighlightSection";
import ParagraphSection from "../sections/ParagraphSection";
import { ExampleData } from "@/types/learn/ExampleData";
import ExampleSection from "../sections/ExampleSection";

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
