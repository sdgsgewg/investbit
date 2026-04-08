import React from "react";
import { HighlightData } from "@/app/types/learn/HighlightData";
import { Info } from "lucide-react";

interface HighlightSectionProps {
  highlight: HighlightData;
}

const HighlightSection = ({ highlight }: HighlightSectionProps) => {
  if (!highlight) return null;

  return (
    <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
      <div className="flex items-start space-x-3">
        <Info className="w-5 h-5 text-primary mt-1 shrink-0" />

        <div className="space-y-2">
          {highlight.text && (
            <p className="font-semibold text-primary">{highlight.text}</p>
          )}

          {highlight.points && highlight.points.length > 0 && (
            <ul className="space-y-1">
              {highlight.points.map((point, i) => (
                <li key={i} className="text-sm text-muted-foreground">
                  • {point}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default HighlightSection;
