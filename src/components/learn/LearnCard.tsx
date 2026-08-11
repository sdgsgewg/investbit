import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LearnSection } from "@/lib/learn-data";
import { Button } from "../ui/button";
import { useRouter } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";

interface Props {
  section: LearnSection;
}

const LearnCard = ({ section }: Props) => {
  const router = useRouter();
  const locale = useLocale();

  const tCommonActions = useTranslations("common.actions");

  const { title, description, content } = section;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="leading-7">{content}</p>
      </CardContent>
      {section.slug && (
        <CardFooter>
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => router.push(`/${locale}/learn/${section.slug}`)}
          >
            {tCommonActions("explore")}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default LearnCard;
