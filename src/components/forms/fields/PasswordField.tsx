"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import type { AnyFieldApi } from "@tanstack/react-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Eye, EyeOff, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordFieldProps {
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

export default function PasswordField({
  field,
  label,
  placeholder,
  required,
  readOnly,
  disabled,
  autoComplete = "current-password",
  className,
  inputClassName,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid} className={className}>
      <FieldLabel htmlFor={field.name}>
        {label}
        {required && <span className="text-destructive">*</span>}
      </FieldLabel>

      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
          <Lock className="h-4 w-4" />
        </span>

        <Input
          id={field.name}
          name={field.name}
          type={showPassword ? "text" : "password"}
          autoComplete={autoComplete}
          value={field.state.value ?? ""}
          placeholder={placeholder}
          readOnly={readOnly}
          disabled={disabled}
          className={cn("pl-10 pr-10", inputClassName)}
          aria-invalid={isInvalid}
          onBlur={field.handleBlur}
          onChange={(event) => {
            field.handleChange(event.target.value);
          }}
        />

        <button
          type="button"
          tabIndex={-1}
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3.5 text-muted-foreground transition-colors hover:text-foreground focus:outline-none"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>

      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
