"use client";

import { useTranslations, useLocale } from "next-intl";
import { GLOSSARY_TERMS } from "@/lib/glossary-data";
import { useState } from "react";
import { BookOpen, Search } from "lucide-react";
import { GlossaryCard } from "@/components/glossary";
import PageHeader from "@/components/shared/PageHeader";
import { useDebounce } from "@/hooks/useDebounce";
import { Input } from "@/components/ui/input";

export default function GlossaryPage() {
  const t = useTranslations("public.glossary");
  const locale = useLocale();

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const terms =
    GLOSSARY_TERMS[locale as keyof typeof GLOSSARY_TERMS] || GLOSSARY_TERMS.en;

  const filteredTerms = terms.filter((item) => {
    const query = debouncedSearch.toLowerCase();

    return (
      item.term.toLowerCase().includes(query) ||
      item.definition.toLowerCase().includes(query)
    );
  });

  return (
    <>
      <PageHeader
        title={t("title")}
        icon={<BookOpen className="h-6 w-6" />}
        subtitle={t("subtitle")}
        rightAction={
          <>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={`${t("search.placeholder")}`}
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTerms.map((item, index) => (
          <GlossaryCard key={index} item={item} />
        ))}

        {filteredTerms.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            {t("search.noResults", { searchTerm })}
          </div>
        )}
      </div>
    </>
  );
}
