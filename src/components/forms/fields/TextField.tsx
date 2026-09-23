"use client";

import { Input } from "@/components/ui/input";
import type { AnyFieldApi } from "@tanstack/react-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { LucideIcon } from "lucide-react";

interface TextFieldProps {
  field: AnyFieldApi;

  label: string;
  icon?: LucideIcon;
  placeholder?: string;

  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;

  className?: string;
  inputClassName?: string;
}

export default function TextField({
  field,
  label,
  icon: Icon,
  placeholder,
  required,
  readOnly,
  disabled,
  className,
  inputClassName,
}: TextFieldProps) {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid} className={className}>
      <FieldLabel htmlFor={field.name}>
        {label}
        {required && <span className="text-destructive">*</span>}
      </FieldLabel>

      <div className="relative">
        {Icon && (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
            <Icon className="h-4 w-4" />
          </span>
        )}

        <Input
          id={field.name}
          name={field.name}
          type="text"
          value={field.state.value}
          placeholder={placeholder}
          readOnly={readOnly}
          disabled={disabled}
          className={inputClassName}
          aria-invalid={isInvalid}
          onBlur={field.handleBlur}
          onChange={(event) => {
            field.handleChange(event.target.value);
          }}
        />
      </div>

      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
