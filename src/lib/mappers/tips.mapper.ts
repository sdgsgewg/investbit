import { TipsData } from "@/app/types/learn/TipsData";

export function mapTips(tips: any): TipsData {
  const mappedTips: TipsData = {
    ...tips,
  };

  return mappedTips;
}
