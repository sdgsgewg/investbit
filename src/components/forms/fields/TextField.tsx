"use client";

import { Input } from "@/components/ui/input";
import Label from "./Label";
import ErrorMessage from "./ErrorMessage";

interface TextFieldProps {
  label: string;
  name: string;

  value: string;
  onChange: (value: string) => void;

  placeholder?: string;

  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;

  className?: string;
  error?: string;
}

export default function TextField({
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
  readOnly,
  disabled,
  className,
  error,
}: TextFieldProps) {
  const errorId = error ? `${name}-error` : undefined;

  return (
    <div className="flex flex-col gap-2">
      <Label label={label} required={required} readOnly={readOnly} />

      <Input
        type="text"
        name={name}
        aria-invalid={!!error}
        aria-describedby={errorId}
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
        className={className}
        onChange={(e) => onChange(e.target.value)}
      />

      {error && <ErrorMessage id={errorId} message={error} />}
    </div>
  );
}
