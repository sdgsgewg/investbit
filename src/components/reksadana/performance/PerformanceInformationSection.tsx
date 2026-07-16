import { useTranslations } from "next-intl";

const PerformanceInformationSection = () => {
  const t = useTranslations("reksadana.performance.analytics.legend");

  return (
    <div className="">
      <h4 className="font-semibold mb-2">{t("title")}:</h4>
      <div className="flex gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-4 bg-green-500/30 rounded border border-green-500"></div>
          <span className="text-sm">{t("highestYield")}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-4 bg-red-500/30 rounded border border-red-500"></div>
          <span className="text-sm">{t("lowestYield")}</span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceInformationSection;
