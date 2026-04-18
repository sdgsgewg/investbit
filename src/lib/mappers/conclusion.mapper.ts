import { ConclusionData } from "@/features/learn/types/ConclusionData";

export function mapConclusion(conclusion: any): ConclusionData {
  const mappedConclusion: ConclusionData = {
    ...conclusion,
  };

  return mappedConclusion;
}
