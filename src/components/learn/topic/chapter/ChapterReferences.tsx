import { Link } from "@/data/chapters";
import { BookOpen, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
  links: Link[];
}

const ChapterReferences = ({ links }: Props) => {
  const t = useTranslations("public.learn.section.chapter.referencesAndDisclaimer");

  return (
    <div className="mt-8">
      <details className="group rounded-2xl border border-border bg-muted/30 p-5 transition-all">
        <summary className="flex items-center justify-between cursor-pointer list-none">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>

            <div>
              <h3 className="font-semibold text-primary">{t("title")}</h3>
              <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
            </div>
          </div>

          {/* Arrow */}
          <div className="transition-transform group-open:rotate-180">
            <svg
              className="h-5 w-5 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </summary>

        {/* Content */}
        <div className="mt-4 pt-4 border-t border-border space-y-3">
          <p className="text-sm text-muted-foreground">{t("contentText")}</p>

          <ul className="space-y-2">
            {links.map((link, index) => (
              <li key={index}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <span className="truncate">{link.label}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </details>
    </div>
  );
};

export default ChapterReferences;
