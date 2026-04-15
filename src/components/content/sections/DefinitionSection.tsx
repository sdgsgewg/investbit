import { BookText } from "lucide-react";
import { DefinitionData } from "@/types/learn/DefinitionData";
import ImageWrapper from "@/components/shared/ImageWrapper";
import SectionWrapper from "./SectionWrapper";
import SectionTitle from "./SectionTitle";

interface DefinitionSectionProps {
  definition: DefinitionData;
  children?: React.ReactNode;
}

const DefinitionSection = ({
  definition,
  children,
}: DefinitionSectionProps) => {
  return (
    <SectionWrapper>
      <SectionTitle
        icon={BookText}
        title={definition.title || "Definition"}
        fallbackTitle="Definition"
      />

      <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground prose-p:leading-relaxed">
        <div className="flex flex-col gap-4">
          {definition.images &&
            definition.images.map((image, index) => (
              <ImageWrapper
                key={index}
                src={image}
                alt={`Definition ${index + 1}`}
              />
            ))}

          <div className="w-full flex flex-col sm:flex-row gap-2">
            {definition.sideBySideImages &&
              definition.sideBySideImages.map((image, index) => (
                <ImageWrapper
                  key={index}
                  src={image}
                  alt={`Definition side by side ${index + 1}`}
                />
              ))}
          </div>

          {definition.paragraphs &&
            definition.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

          {definition.children}

          {children}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default DefinitionSection;
