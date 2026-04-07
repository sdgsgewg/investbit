"use client";

import { useLocale, useTranslations } from "next-intl";
import { LEARN_DATA } from "@/lib/learn-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LearnPage() {
  const router = useRouter();
  const t = useTranslations("Nav");
  const locale = useLocale();

  const data = LEARN_DATA[locale as keyof typeof LEARN_DATA] || LEARN_DATA.en;

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">{t("learn")}</h1>

      <Tabs defaultValue="basics" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          {data.map((tab) => (
            <TabsTrigger key={tab.key} value={tab.key}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {data.map((tab) => (
          <TabsContent key={tab.key} value={tab.key} className="space-y-6">
            {tab.sections.map((section, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle>{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="leading-7">{section.content}</p>
                </CardContent>
                {section.seeMore && (
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() =>
                        router.push(`/${locale}/learn/${section.slug}`)
                      }
                    >
                      See More
                    </Button>
                  </CardFooter>
                )}
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
