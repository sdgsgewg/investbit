import { ExampleData } from "@/app/types/learn/ExampleData";
import DefinitionSection from "../sections/DefinitionSection";
import ExampleSection from "../sections/ExampleSection";

interface TechAnalysisTopicContentProps {
  definition: {
    image?: string[];
    sideBySideImage?: string[];
    text: string[];
  };
  example?: ExampleData;
}

const TechAnalysisTopicContent = ({
  definition,
  example,
}: TechAnalysisTopicContentProps) => {
  return (
    <div className="space-y-12">
      <DefinitionSection definition={definition} />
      {example && <ExampleSection example={example} />}
    </div>
  );
};

export default TechAnalysisTopicContent;
