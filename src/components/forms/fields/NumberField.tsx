"use client";

import { NumericFormat } from "react-number-format";
import { Input } from "@/components/ui/input";
import { AnyFieldApi } from "@tanstack/react-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

interface NumberFieldProps {
  field: AnyFieldApi;

  label: string;
  placeholder?: string;

  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;

  thousandSeparator?: string | boolean;
  decimalScale?: number;
  allowNegative?: boolean;

  className?: string;
}

export default function NumberField({
  field,
  label,
  placeholder,
  required,
  readOnly,
  disabled,
  thousandSeparator = ",",
  decimalScale,
  allowNegative = false,
  className,
}: NumberFieldProps) {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>
        {label}
        {required && <span className="text-destructive">*</span>}
      </FieldLabel>

      <NumericFormat
        id={field.name}
        name={field.name}
        customInput={Input}
        aria-invalid={isInvalid}
        value={field.state.value}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
        thousandSeparator={thousandSeparator}
        decimalScale={decimalScale}
        allowNegative={allowNegative}
        allowLeadingZeros={false}
        className={className}
        onValueChange={({ floatValue }) => {
          field.handleChange(floatValue ?? null);
        }}
      />

      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
