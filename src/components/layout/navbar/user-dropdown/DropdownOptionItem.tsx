import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface DropdownOptionItemProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const DropdownOptionItem = ({
  label,
  active,
  onClick,
}: DropdownOptionItemProps) => {
  return (
    <DropdownMenuItem onClick={onClick} className="flex items-center gap-2">
      <span className="flex w-3 justify-center">
        <span
          className={`h-2 w-2 rounded-full bg-muted-foreground transition-opacity ${
            active ? "opacity-100" : "opacity-0"
          }`}
        />
      </span>

      <span className="text-muted-foreground text-sm! font-medium">{label}</span>
    </DropdownMenuItem>
  );
};

export default DropdownOptionItem;
