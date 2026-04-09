import { ExplanationData } from "./ExplanationData";
import { HighlightData } from "./HighlightData";

export type ExampleData = {
  title?: string;
  stock?: string;
  highlight?: HighlightData;
  explanation: ExplanationData[];
};
