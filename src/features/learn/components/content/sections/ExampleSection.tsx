import React from "react";
import { LineChart, Target } from "lucide-react";
import HighlightSection from "./HighlightSection";
import NumberedListExplanationText from "./NumberedListExplanationText";
import HighlightExplanationText from "./HighlightExplanationText";
import { ExampleData } from "@/features/learn/types/ExampleData";
import ImageWrapper from "@/components/wrappers/ImageWrapper";

interface ExampleSectionProps {
  example: ExampleData;
}

const ExampleSection = ({ example }: ExampleSectionProps) => {
  const title = example.title || "Case Study";
  const explanation = example.explanation || [];

  return (
    <section className="bg-linear-to-br from-card to-muted/30 rounded-3xl p-6 md:p-8 border border-border/50 overflow-hidden relative shadow-md">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex flex-col justify-between gap-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-xl">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">{title}</h2>
          </div>

          {example.highlight && (
            <HighlightSection highlight={example.highlight} />
          )}

          {example.stock && (
            <div className="inline-flex flex-row items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-full font-semibold shadow-inner">
              <LineChart className="h-4 w-4" />
              <span>{example.stock}</span>
            </div>
          )}
        </div>
        {explanation.length > 0 && (
          <div className="space-y-6">
            {explanation.map((exp, index) => (
              <div
                key={index}
                className="grid grid-cols-1 gap-4 lg:gap-8 items-center"
              >
                {/* Chart Area */}
                {exp.chart && (
                  <div className="bg-background rounded-lg p-2 border border-border/50 shadow-sm">
                    {exp.chart.map((chart, index) => (
                      <ImageWrapper
                        key={index}
                        src={chart}
                        alt={`Chart ${index + 1}`}
                      />
                    ))}
                  </div>
                )}

                {/* Explanation Area */}
                {exp.text && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold mb-4 border-b border-border/50 pb-2">
                      Analysis
                    </h3>
                    <div className="space-y-4">
                      {exp.text.map((text, index) =>
                        exp.type === "highlight" ? (
                          <HighlightExplanationText
                            key={index}
                            highlight={{ text: [text] }}
                          />
                        ) : (
                          <NumberedListExplanationText
                            key={index}
                            index={index}
                            text={text}
                          />
                        ),
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ExampleSection;
