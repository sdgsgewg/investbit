import { TipsData } from "@/features/learn/types/TipsData";

export function mapTips(tips: any): TipsData {
  const mappedTips: TipsData = {
    ...tips,
  };

  return mappedTips;
}
