import { useTranslations } from "next-intl";
import { BookText, Target, LineChart } from "lucide-react";
import { IMAGES } from "@/app/constants/images";
import ImageWrapper from "@/components/shared/ImageWrapper";

export default function FalseBreak() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter1.lessons.false_break.content",
  );

  const definition: { text: string[] } = {
    text: t.raw("definition.text"),
  };

  const example: { stock: string; chart: string[]; explanation: string[] } = {
    stock: t("example.stock"),
    chart: [IMAGES.CHART_PATTERN.FALSE_BREAK.EXAMPLE],
    explanation: t.raw("example.explanation"),
  };

  return (
    <div className="space-y-12">
      {/* Definition Section */}
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
            {definition.text.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Example Section */}
      <section className="bg-linear-to-br from-card to-muted/30 rounded-3xl p-6 md:p-8 border border-border/50 overflow-hidden relative shadow-md">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary/10 rounded-xl">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Case Study</h2>
            </div>

            <div className="inline-flex flex-row items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-full font-semibold shadow-inner">
              <LineChart className="h-4 w-4" />
              <span>{example.stock}</span>
            </div>
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
          </div>
        </div>
      </section>
    </div>
  );
}
