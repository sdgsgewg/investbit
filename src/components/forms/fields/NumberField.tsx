"use client";

import { NumericFormat } from "react-number-format";
import { Input } from "@/components/ui/input";
import Label from "./Label";
import ErrorMessage from "./ErrorMessage";

interface NumberFieldProps {
  label: string;
  name: string;

  value: number | null | undefined;
  onChange: (value: number | null) => void;

  placeholder?: string;

  required?: boolean;
  readOnly?: boolean;

  thousandSeparator?: string | boolean;
  decimalScale?: number;
  allowNegative?: boolean;

  className?: string;
  error?: string;
}

export default function NumberField({
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
  readOnly,
  thousandSeparator = ",",
  decimalScale,
  allowNegative = false,
  className,
  error,
}: NumberFieldProps) {
  const errorId = error ? `${name}-error` : undefined;

  return (
    <div className="flex flex-col gap-2">
      <Label label={label} required={required} readOnly={readOnly} />

      <NumericFormat
        customInput={Input}
        name={name}
        aria-invalid={!!error}
        aria-describedby={errorId}
        value={value ?? ""}
        placeholder={placeholder}
        readOnly={readOnly}
        thousandSeparator={thousandSeparator}
        decimalScale={decimalScale}
        allowNegative={allowNegative}
        allowLeadingZeros={false}
        className={className}
        onValueChange={({ floatValue }) => {
          onChange(floatValue ?? null);
        }}
      />

      {error && <ErrorMessage id={errorId} message={error} />}
    </div>
  );
}
