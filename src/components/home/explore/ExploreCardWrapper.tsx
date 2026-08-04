import { HomeExploreFeature } from "@/constants/home/explore";
import ExploreCard from "./ExploreCard";
import { BookMarked, BookOpen, ChartNoAxesCombined } from "lucide-react";

interface Props {
  features: readonly HomeExploreFeature[];
}

const ICON_MAP = {
  learn: BookOpen,
  glossary: BookMarked,
  performance: ChartNoAxesCombined,
};

const ExploreCardWrapper = ({ features }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {features.map((feature) => (
        <ExploreCard
          key={feature.key}
          feature={feature}
          icon={ICON_MAP[feature.key]}
        />
      ))}
    </div>
  );
};

export default ExploreCardWrapper;
