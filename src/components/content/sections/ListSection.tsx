import React from "react";
import { Target } from "lucide-react";
import ImageWrapper from "@/components/shared/ImageWrapper";

interface ListSectionProps {
  title?: string;
  points: {
    text: string;
    image?: string;
  }[];
}

const ListSection = ({ title, points }: ListSectionProps) => {
  return (
    <section className="bg-linear-to-br from-card to-muted/30 rounded-3xl p-6 md:p-8 border border-border/50 overflow-hidden relative shadow-md">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10">
        {title && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/80">
              {title}
            </h2>
          </div>
        )}
        <div className="grid grid-cols-1 gap-4 lg:gap-8 items-center">
          {points.map((item, index) => (
            <div
              key={index}
              className="bg-background rounded-lg py-2 px-4 border border-border/50 shadow-sm space-y-6"
            >
              <div className="flex gap-3">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/80">
                  {index + 1}.
                </h2>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/80">
                  {item.text}
                </h2>
              </div>
              {item.image && <ImageWrapper src={item.image} alt={item.text} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ListSection;
