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
import Image from "next/image";

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

  return (
    <Field className={cn(className)}>
      {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}

      <Select
        name={name}
        value={value || undefined}
        disabled={disabled || loading}
        onValueChange={onValueChange}
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
          {allLabel && <SelectItem value="">{allLabel}</SelectItem>}

          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.imageUrl && (
                <Image
                  src={option.imageUrl}
                  alt={option.label}
                  width={20}
                  height={20}
                  className="size-5 shrink-0 rounded-full object-cover"
                />
              )}

              <span className="truncate">{option.label}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  );
};

export default SelectField;
