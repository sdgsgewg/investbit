"use client";

import React from "react";

import Label from "./Label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Option } from "@/types/option";
import Image from "next/image";
import ErrorMessage from "./ErrorMessage";
import { cn } from "@/lib/utils";

interface SelectFieldProps {
  label?: string;
  name: string;

  value: string;
  options: Option[];
  onChange: (value: string) => void;

  placeholder?: string;
  allLabel?: string;

  required?: boolean;
  disabled?: boolean;

  className?: string;
  error?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,

  value,
  options,
  onChange,

  placeholder = "Select option",
  allLabel,

  disabled = false,
  required = false,

  className,
  error,
}) => {
  const errorId = error ? `${name}-error` : undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && <Label label={label} required={required} />}

      <Select
        name={name}
        aria-invalid={!!error}
        aria-describedby={errorId}
        value={value || undefined}
        disabled={disabled}
        onValueChange={onChange}
      >
        <SelectTrigger className="w-full rounded-xl">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent
          position="popper"
          sideOffset={4}
          className="w-(--radix-select-trigger-width) max-h-60"
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

      {error && <ErrorMessage id={errorId} message={error} />}
    </div>
  );
};

export default SelectField;
