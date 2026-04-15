import { HighlightData } from "@/types/learn/HighlightData";
import { Info } from "lucide-react";

interface HighlightSectionProps {
  highlight: HighlightData;
}

const BulletedPoints = ({ points }: { points: string[] }) => {
  return (
    <ul className="space-y-1">
      {points.map((point, i) => (
        <li key={i} className="text-sm text-muted-foreground">
          • {point}
        </li>
      ))}
    </ul>
  );
};

const NumberedPoints = ({ points }: { points: string[] }) => {
  return (
    <ol className="space-y-1">
      {points.map((point, i) => (
        <li key={i} className="text-sm text-muted-foreground">
          {i + 1}. {point}
        </li>
      ))}
    </ol>
  );
};

const HighlightSection = ({ highlight }: HighlightSectionProps) => {
  if (!highlight) return null;

  const isNumbered = highlight.pointsType === "numbering";

  return (
    <div className="flex flex-col">
      {/* Title */}
      {highlight.title && (
        <div>
          <h3 className="text-xl font-semibold mb-4 border-b border-border/50 pb-2">
            {highlight.title}
          </h3>
        </div>
      )}

      {/* Box */}
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-primary shrink-0" />

          <div className="space-y-2">
            {highlight.text &&
              highlight.text.map((text, i) => (
                <p key={i} className="text-sm text-muted-foreground">
                  {text}
                </p>
              ))}

            {highlight?.points?.length ? (
              isNumbered ? (
                <NumberedPoints points={highlight.points} />
              ) : (
                <BulletedPoints points={highlight.points} />
              )
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighlightSection;
