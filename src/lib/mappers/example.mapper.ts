import { ExampleData } from "@/app/types/learn/ExampleData";
import { ExplanationData } from "@/app/types/learn/ExplanationData";

export function mapExamplesWithCharts(
  examples: any[],
  charts: string[][][],
): ExampleData[] {
  if (!Array.isArray(examples)) return [];

  return examples.map((example, exampleIndex) => ({
    ...example,
    explanation: example.explanation.map(
      (exp: ExplanationData, expIndex: number) => ({
        ...exp,
        chart:
          charts?.[exampleIndex]?.[expIndex] &&
          charts[exampleIndex][expIndex].length > 0
            ? charts[exampleIndex][expIndex]
            : [],
        type: exp.type || "numbered-list",
      }),
    ),
  }));
}

export function mapExampleWithCharts(
  example: any,
  charts: string[][],
): ExampleData {
  return {
    ...example,
    explanation: example.explanation.map(
      (exp: ExplanationData, expIndex: number) => ({
        ...exp,
        chart: charts[expIndex] || [],
        type: exp.type || "numbered-list",
      }),
    ),
  };
}
