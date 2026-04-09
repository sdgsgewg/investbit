import { ExampleData } from "@/app/types/learn/ExampleData";
import DefinitionSection from "../sections/DefinitionSection";
import ExampleSection from "../sections/ExampleSection";
import { TutorialData } from "@/app/types/learn/TutorialData";
import { FunctionData } from "@/app/types/learn/FunctionData";
import TutorialSection from "../sections/TutorialSection";
import FunctionSection from "../sections/FunctionSection";
import { DefinitionData } from "@/app/types/learn/DefinitionData";
import { ConclusionData } from "@/app/types/learn/ConclusionData";
import ConclusionSection from "../sections/ConclusionSection";
import { TipsData } from "@/app/types/learn/TipsData";
import TipsSection from "../sections/TipsSection";

interface TechAnalysisTopicContentProps {
  definition?: DefinitionData;
  tutorial?: TutorialData;
  functionData?: FunctionData;
  examples?: ExampleData[];
  tips?: TipsData;
  conclusion?: ConclusionData;
  children?: React.ReactNode;
}

const TechAnalysisTopicContent = ({
  definition,
  tutorial,
  functionData,
  examples,
  tips,
  conclusion,
  children,
}: TechAnalysisTopicContentProps) => {
  return (
    <div className="space-y-12">
      {definition && <DefinitionSection definition={definition} />}
      {tutorial && <TutorialSection tutorial={tutorial} />}
      {functionData && <FunctionSection functionData={functionData} />}
      {examples && (
        <div className="space-y-8">
          {examples.map((ex, index) => (
            <ExampleSection key={index} example={ex} />
          ))}
        </div>
      )}
      {tips && <TipsSection tipsData={tips} />}
      {conclusion && <ConclusionSection conclusion={conclusion} />}
      {children}
    </div>
  );
};

export default TechAnalysisTopicContent;
