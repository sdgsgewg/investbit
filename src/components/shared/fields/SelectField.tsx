"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Option } from "@/types/option";
import { cn } from "@/lib/utils";
import { Field, FieldLabel } from "@/components/ui/field";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface SelectFieldProps {
  label?: string;
  name: string;

  value?: string;
  onValueChange: (value: string) => void;
  options: Option[];

  placeholder?: string;
  allLabel?: string;

  loading?: boolean;
  disabled?: boolean;

  className?: string;
}

const ALL_VALUE = "__all__";

const SelectField = ({
  label,
  name,

  value,
  onValueChange,
  options,

  placeholder = "Select option",
  allLabel,

  disabled = false,
  loading = false,

  className,
}: SelectFieldProps) => {
  const tCommonStates = useTranslations("common.states");

  const selectValue = value || (allLabel ? ALL_VALUE : undefined);

  const handleValueChange = (selectedValue: string) => {
    onValueChange(selectedValue === ALL_VALUE ? "" : selectedValue);
  };

  return (
    <Field className={cn(className)}>
      {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}

      <Select
        name={name}
        value={selectValue}
        disabled={disabled || loading}
        onValueChange={handleValueChange}
      >
        <SelectTrigger id={name} className="w-full rounded-xl">
          {loading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="size-4 shrink-0 animate-spin opacity-50" />

              <span className="truncate text-muted-foreground">
                {tCommonStates("loading")}
              </span>
            </div>
          ) : (
            <SelectValue placeholder={placeholder} />
          )}
        </SelectTrigger>

        <SelectContent
          position="popper"
          sideOffset={4}
          className={cn("w-(--radix-select-trigger-width) max-h-60")}
        >
          {allLabel && <SelectItem value={ALL_VALUE}>{allLabel}</SelectItem>}

          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <span className="truncate">{option.label}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  );
};

export default SelectField;
