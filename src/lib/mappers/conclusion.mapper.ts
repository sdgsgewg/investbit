import { ConclusionData } from "@/app/types/learn/ConclusionData";

export function mapConclusion(conclusion: any): ConclusionData {
  const mappedConclusion: ConclusionData = {
    ...conclusion,
  };

  return mappedConclusion;
}
