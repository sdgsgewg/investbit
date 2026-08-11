"use client";

import { useTranslations, useLocale } from "next-intl";
import { GLOSSARY_TERMS } from "@/lib/glossary-data";
import { useState } from "react";
import { BookOpen } from "lucide-react";
import { GlossaryCard } from "@/components/glossary";
import PageHeader from "@/components/templates/PageHeader";
import { useDebounce } from "@/hooks/useDebounce";

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
        icon={BookOpen}
        subtitle={t("subtitle")}
        search={{
          placeholder: `${t("search.placeholder")}`,
          value: searchTerm,
          onChange: (e) => setSearchTerm(e.target.value),
        }}
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
