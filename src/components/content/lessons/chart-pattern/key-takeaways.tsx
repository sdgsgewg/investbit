import { useTranslations } from "next-intl";

export default function KeyTakeaways() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter1.lessons.key_takeaways_c1.content",
  );

  const text: string[] = t.raw("text");

  return (
    <div className="space-y-6">
      {text &&
        text.map((item, index) => (
          <p key={index} className="prose prose-invert max-w-none">
            {item}
          </p>
        ))}
    </div>
  );
}
