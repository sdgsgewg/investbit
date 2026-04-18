import { BookText } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import SectionTitle from "./SectionTitle";
import { ConclusionData } from "@/features/learn/types/ConclusionData";

interface ConclusionSectionProps {
  conclusion: ConclusionData;
}

const ConclusionSection = ({ conclusion }: ConclusionSectionProps) => {
  const { title, paragraphs } = conclusion;

  return (
    <SectionWrapper>
      <SectionTitle
        icon={BookText}
        title={title || "Conclusion"}
        fallbackTitle="Conclusion"
      />

      <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground prose-p:leading-relaxed">
        <div className="flex flex-col gap-4">
          {paragraphs.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ConclusionSection;
