import { HighlightData } from "@/app/types/learn/HighlightData";
import HighlightSection from "./HighlightSection";

const HighlightExplanationText = ({
  highlight,
}: {
  highlight: HighlightData;
}) => {
  return <HighlightSection highlight={highlight} />;
};

export default HighlightExplanationText;
