"use client";

import React from "react";
import { useNumberFormatter } from "@/hooks/useNumberFormatter";

interface InputNumberProps {
  value?: string;
  onChange: (value: string) => void;

  placeholder?: string;
  fractionDigits?: number;

  allowNegative?: boolean;
  showColor?: boolean;

  className?: string;
}

const InputNumber: React.FC<InputNumberProps> = ({
  value = "",
  onChange,
  placeholder,
  fractionDigits = 2,
  allowNegative = true,
  showColor = true,
  className = "",
}) => {
  const { parseNumber, formatDecimal } = useNumberFormatter();

  // parse current value (for styling only)
  const parsed = parseNumber(value);

  const isNegative = parsed !== null && parsed < 0;

  return (
    <input
      value={value}
      placeholder={placeholder ?? formatDecimal(0, fractionDigits)}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      onBlur={(e) => {
        const val = e.target.value.trim();

        if (!val) {
          onChange("");
          return;
        }

        const parsed = parseNumber(val);

        if (parsed === null) {
          onChange(""); // invalid → reset
          return;
        }

        if (!allowNegative && parsed < 0) {
          onChange("");
          return;
        }

        onChange(formatDecimal(parsed, fractionDigits));
      }}
      className={`
        w-full text-center border p-1 rounded 
        focus:outline-blue-500 
        dark:bg-zinc-800 dark:border-zinc-700
        ${showColor && isNegative ? "text-red-600 dark:text-red-400 font-medium" : ""}
        ${className}
      `}
    />
  );
};

export default InputNumber;
