"use client";

import { Input } from "@/components/ui/input";
import type { AnyFieldApi } from "@tanstack/react-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

interface TextFieldProps {
  field: AnyFieldApi;

  label: string;
  placeholder?: string;

  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;

  className?: string;
}

export default function TextField({
  field,
  label,
  placeholder,
  required,
  readOnly,
  disabled,
  className,
}: TextFieldProps) {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>
        {label}
        {required && <span className="text-destructive">*</span>}
      </FieldLabel>

      <Input
        id={field.name}
        name={field.name}
        type="text"
        value={field.state.value}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
        className={className}
        aria-invalid={isInvalid}
        onBlur={field.handleBlur}
        onChange={(event) => {
          field.handleChange(event.target.value);
        }}
      />

      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
