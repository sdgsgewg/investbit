"use client";

import { useLocale, useTranslations } from "next-intl";
import { LEARN_DATA } from "@/lib/learn-data";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import PageHeader from "@/components/templates/PageHeader";
import { LearnCard, LearnTabs } from "@/components/learn";

export default function LearnPage() {
  const tNav = useTranslations("navigation");
  const locale = useLocale();

  const data = LEARN_DATA[locale as keyof typeof LEARN_DATA] || LEARN_DATA.en;

  return (
    <>
      <PageHeader title={tNav("learn")} />

      <Tabs defaultValue="basics" className="w-full">
        <LearnTabs />

        {data.map((tab) => (
          <TabsContent key={tab.key} value={tab.key} className="space-y-6">
            {tab.sections.map((section, idx) => (
              <LearnCard key={idx} section={section} />
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}
