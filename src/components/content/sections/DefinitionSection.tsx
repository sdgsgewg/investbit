import { BookText } from "lucide-react";
import { DefinitionData } from "@/app/types/learn/DefinitionData";
import ImageWrapper from "@/components/shared/ImageWrapper";

interface DefinitionSectionProps {
  definition: DefinitionData;
}

const DefinitionSection = ({ definition }: DefinitionSectionProps) => {
  return (
    <section className="bg-card/50 rounded-2xl p-6 md:p-8 border border-border shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-primary/10 rounded-xl">
          <BookText className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/80">
          Definition
        </h2>
      </div>
      <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground prose-p:leading-relaxed">
        <div className="flex flex-col gap-4">
          {definition.image &&
            definition.image.map((image, index) => (
              <ImageWrapper
                key={index}
                src={image}
                alt={`Definition ${index + 1}`}
              />
            ))}

          <div className="w-full flex flex-col sm:flex-row gap-2">
            {definition.sideBySideImage &&
              definition.sideBySideImage.map((image, index) => (
                <ImageWrapper
                  key={index}
                  src={image}
                  alt={`Definition side by side ${index + 1}`}
                />
              ))}
          </div>

          {definition.text.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DefinitionSection;
