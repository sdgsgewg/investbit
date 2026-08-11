import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LEARN_DATA } from "@/lib/learn-data";
import { useLocale } from "next-intl";

const LearnTabs = () => {
  const locale = useLocale();

  const data = LEARN_DATA[locale as keyof typeof LEARN_DATA] || LEARN_DATA.en;

  return (
    <TabsList className="grid w-full grid-cols-3 mb-8">
      {data.map((tab) => (
        <TabsTrigger key={tab.key} value={tab.key}>
          {tab.label}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default LearnTabs;
