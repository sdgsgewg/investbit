import { useTranslations } from "next-intl";
import React from "react";

const PerformanceInformationSection = () => {
  const tCommon = useTranslations("Common");

  return (
    <div className="mt-8">
      <h4 className="font-semibold mb-2">{tCommon("legend")}:</h4>
      <div className="flex gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-4 bg-green-500/30 rounded border border-green-500"></div>
          <span className="text-sm">{tCommon("highestYield")}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-4 bg-red-500/30 rounded border border-red-500"></div>
          <span className="text-sm">{tCommon("lowestYield")}</span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceInformationSection;
