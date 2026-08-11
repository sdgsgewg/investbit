import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GlossaryTerm } from "@/lib/glossary-data";
import { Badge } from "../ui/badge";
import { useTranslations } from "next-intl";

interface Props {
  item: GlossaryTerm;
}

const GlossaryCard = ({ item }: Props) => {
  const t = useTranslations("public.glossary");

  return (
    <Card className="hover:shadow-md transition-all border-l-4 border-l-primary/50">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold">{item.term}</CardTitle>
          <Badge variant="outline" className="text-xs">
            {item.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-medium mb-2">{item.definition}</p>
        <p className="text-xs text-muted-foreground bg-muted p-2 rounded-md">
          <span className="font-semibold text-primary">
            {t("fields.implication")}
          </span>
          <span className="ml-1">{item.implication}</span>
        </p>
      </CardContent>
    </Card>
  );
};

export default GlossaryCard;
