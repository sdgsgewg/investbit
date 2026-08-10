import { Input } from "@/components/ui/input";
import Label from "./Label";

interface TextFieldProps {
  label: string;
  name: string;

  value: string;

  onChange: (value: string) => void;

  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;

  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;

  className?: string;
}

export default function TextField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  readOnly,
  disabled,
  className,
}: TextFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label label={label} required={required} readOnly={readOnly} />

      <Input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
        className={className}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
