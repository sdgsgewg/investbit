import { ArrowLeft, Database } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface Props {
  title: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

export const CrudPageHeader = ({
  title,
  showBackButton = false,
  onBack,
}: Props) => {
  const router = useRouter();
  const tCommon = useTranslations("common.actions");

  const hasBackButton = showBackButton || onBack;

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }

    router.back();
  };

  return (
    <div className="flex items-center gap-4 pb-4 border-b border-border/40">
      {hasBackButton && (
        <button
          className="bg-primary flex items-center gap-1 text-primary-foreground px-4 py-1 rounded-lg hover:bg-primary/80 cursor-pointer"
          onClick={handleBack}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{tCommon("back")}</span>
        </button>
      )}

      {/* Icon and Title */}
      <div className="flex items-center gap-3">
        {!hasBackButton && (
          <div className="p-2.5 bg-primary/10 rounded-xl">
            <Database className="w-6 h-6 text-primary" />
          </div>
        )}
        <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/80">
          {title}
        </h1>
      </div>
    </div>
  );
};
