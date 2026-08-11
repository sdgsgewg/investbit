import { LucideIcon, Search } from "lucide-react";
import { Input } from "../ui/input";
import { ChangeEvent } from "react";

interface Props {
  title: string;
  icon?: LucideIcon;
  subtitle?: string;
  search?: {
    placeholder: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => void;
  };
}

const PageHeader = ({ title, icon, subtitle, search }: Props) => {
  const Icon = icon;

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          {Icon && <Icon className="h-10 w-10 text-primary" />}

          <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/80">
            {title}
          </h1>
        </div>

        <p className="text-muted-foreground mt-2">{subtitle}</p>
      </div>

      {/* Search */}
      {search && (
        <div className="relative w-full md:w-80">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={search.placeholder}
            className="pl-8"
            value={search.value}
            onChange={search.onChange}
          />
        </div>
      )}
    </div>
  );
};

export default PageHeader;
