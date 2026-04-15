import { BookText } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import SectionTitle from "./SectionTitle";
import { FunctionData } from "@/types/learn/FunctionData";

interface FunctionSectionProps {
  functionData: FunctionData;
}

const FunctionSection = ({ functionData }: FunctionSectionProps) => {
  const { title, paragraphs } = functionData;

  return (
    <SectionWrapper>
      <SectionTitle
        icon={BookText}
        title={title || "Function"}
        fallbackTitle="Function"
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

export default FunctionSection;
