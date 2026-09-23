"use client";

import { Input } from "@/components/ui/input";
import type { AnyFieldApi } from "@tanstack/react-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmailFieldProps {
  field: AnyFieldApi;

  label: string;
  placeholder?: string;

  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  autoComplete?: string;

  className?: string;
  inputClassName?: string;
}

export default function EmailField({
  field,
  label,
  placeholder,
  required,
  readOnly,
  disabled,
  autoComplete = "email",
  className,
  inputClassName,
}: EmailFieldProps) {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid} className={className}>
      <FieldLabel htmlFor={field.name}>
        {label}
        {required && <span className="text-destructive">*</span>}
      </FieldLabel>

      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
          <Mail className="h-4 w-4" />
        </span>

        <Input
          id={field.name}
          name={field.name}
          type="email"
          autoComplete={autoComplete}
          value={field.state.value ?? ""}
          placeholder={placeholder}
          readOnly={readOnly}
          disabled={disabled}
          className={cn("pl-10", inputClassName)}
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
