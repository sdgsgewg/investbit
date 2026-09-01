import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FormSectionProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function FormSection({
  title,
  subtitle,
  action,
  children,
  className,
}: FormSectionProps) {
  return (
    <section
      className={cn("space-y-5 rounded-xl border border-border p-4", className)}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>

          {subtitle && (
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>

        {action}
      </div>

      {children}
    </section>
  );
}
