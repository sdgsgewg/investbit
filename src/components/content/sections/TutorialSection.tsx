import HighlightSection from "./HighlightSection";
import ImageWrapper from "@/components/shared/ImageWrapper";
import { ListChecks } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import SectionTitle from "./SectionTitle";
import { TutorialData } from "@/app/types/learn/TutorialData";

interface TutorialSectionProps {
  tutorial: TutorialData;
}

const TutorialSection = ({ tutorial }: TutorialSectionProps) => {
  const { title, highlight, chart } = tutorial;

  return (
    <SectionWrapper>
      <SectionTitle icon={ListChecks} title={title} fallbackTitle="Tutorial" />

      <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground prose-p:leading-relaxed">
        <div className="flex flex-col gap-4">
          <HighlightSection highlight={highlight} />
        </div>
      </div>

      {/* Chart Area */}
      {chart && (
        <div className="bg-background rounded-lg p-2 border border-border/50 shadow-sm">
          <ImageWrapper src={chart} alt={`Tutorial Chart`} />
        </div>
      )}
    </SectionWrapper>
  );
};

export default TutorialSection;
