import React from "react";
import { LineChart, Target } from "lucide-react";
import ImageWrapper from "../../shared/ImageWrapper";
import { ExampleData } from "@/app/types/learn/ExampleData";

interface ExampleSectionProps {
  example: ExampleData;
}

const ExampleSection = ({ example }: ExampleSectionProps) => {
  return (
    <section className="bg-linear-to-br from-card to-muted/30 rounded-3xl p-6 md:p-8 border border-border/50 overflow-hidden relative shadow-md">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-xl">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">
              {example.title || "Case Study"}
            </h2>
          </div>

          {example.stock && (
            <div className="inline-flex flex-row items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-full font-semibold shadow-inner">
              <LineChart className="h-4 w-4" />
              <span>{example.stock}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 lg:gap-8 items-center">
          {/* Chart Area */}
          {example.chart && (
            <div className="bg-background rounded-lg p-2 border border-border/50 shadow-sm">
              {example.chart.map((chart, index) => (
                <ImageWrapper
                  key={index}
                  src={chart}
                  alt={`Chart ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Explanation Area */}
          {example.explanation.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4 border-b border-border/50 pb-2">
                Analysis
              </h3>
              <div className="space-y-4">
                {example.explanation.map((exp, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="shrink-0 mt-1 flex items-center justify-center h-6 w-6 rounded-full bg-primary/20 text-primary text-xs font-bold ring-2 ring-background">
                      {index + 1}
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {exp}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ExampleSection;
