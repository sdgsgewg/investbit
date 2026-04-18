import { HighlightData } from "@/features/learn/types/HighlightData";
import HighlightSection from "./HighlightSection";

const HighlightExplanationText = ({
  highlight,
}: {
  highlight: HighlightData;
}) => {
  return <HighlightSection highlight={highlight} />;
};

export default HighlightExplanationText;
