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
import { useTranslations } from "next-intl";
import { ROUTES } from "@/constants/routes";

interface Props {
  section: LearnSection;
}

const LearnCard = ({ section }: Props) => {
  const router = useRouter();

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
            onClick={() => router.push(`${ROUTES.LEARN}/${section.slug}`)}
          >
            {tCommonActions("explore")}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default LearnCard;
