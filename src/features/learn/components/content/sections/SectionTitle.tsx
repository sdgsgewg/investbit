import { LucideIcon } from "lucide-react";
import React from "react";

interface SectionTitleProps {
  icon: LucideIcon;
  title: string;
  fallbackTitle?: string;
}

const SectionTitle = ({ icon, title, fallbackTitle }: SectionTitleProps) => {
  const IconComponent = icon;

  return (
    <div className="flex items-center gap-3">
      <div className="p-2.5 bg-primary/10 rounded-xl">
        <IconComponent className="h-6 w-6 text-primary" />
      </div>
      <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/80">
        {title || fallbackTitle}
      </h2>
    </div>
  );
};

export default SectionTitle;
