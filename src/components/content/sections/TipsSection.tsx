import { BookText } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import SectionTitle from "./SectionTitle";
import { TipsData } from "@/types/learn/TipsData";

interface TipsSectionProps {
  tipsData: TipsData;
}

const TipsSection = ({ tipsData }: TipsSectionProps) => {
  const { title, paragraphs } = tipsData;

  return (
    <SectionWrapper>
      <SectionTitle
        icon={BookText}
        title={title || "Tips"}
        fallbackTitle="Tips"
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

export default TipsSection;
