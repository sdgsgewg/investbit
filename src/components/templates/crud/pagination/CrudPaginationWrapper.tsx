import { cn } from "@/lib/utils";

export default function CrudPaginationWrapper({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:items-center md:justify-between gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
