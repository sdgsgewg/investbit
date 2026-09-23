import React from "react";

interface LabelProps {
  label: string;
  name?: string;
  required?: boolean;
  optional?: boolean;
  readOnly?: boolean;
}

const Label = ({
  label,
  name,
  required,
  optional = false,
  readOnly,
}: LabelProps) => {
  return (
    <div className="flex items-center gap-1 text-sm font-medium">
      <label
        {...(name ? { htmlFor: name } : {})}
        className="text-muted-foreground ml-1"
      >
        {label}
      </label>
      {!readOnly && (
        <>
          {required ? <span className="text-red-500">*</span> : null}
          {optional ? (
            <span className="text-gray-500">{"(optional)"}</span>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Label;
