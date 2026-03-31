"use client";

import { useTranslations, useLocale } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { GLOSSARY_TERMS } from "@/lib/glossary-data";
import { useState } from "react";
import { Search, BookOpen } from "lucide-react";

export default function GlossaryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const locale = useLocale();
  const terms =
    GLOSSARY_TERMS[locale as keyof typeof GLOSSARY_TERMS] || GLOSSARY_TERMS.en;

  const filteredTerms = terms.filter(
    (item) =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <BookOpen className="h-10 w-10 text-primary" />
            Stock Glossary
          </h1>
          <p className="text-muted-foreground mt-2">
            Understand the language of the stock market.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search term..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTerms.map((item, index) => (
          <Card
            key={index}
            className="hover:shadow-md transition-all border-l-4 border-l-primary/50"
          >
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
                <span className="font-semibold text-primary">Implication:</span>{" "}
                {item.implication}
              </p>
            </CardContent>
          </Card>
        ))}

        {filteredTerms.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No terms found matching &quot;{searchTerm}&quot;
          </div>
        )}
      </div>
    </div>
  );
}
