import { ConclusionData } from "@/types/learn/ConclusionData";

export function mapConclusion(conclusion: any): ConclusionData {
  const mappedConclusion: ConclusionData = {
    ...conclusion,
  };

  return mappedConclusion;
}
