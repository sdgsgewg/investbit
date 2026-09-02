"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "../forms/fields";

interface DatePickerProps {
  label?: string;

  value?: Date;
  onChange?: (date: Date | undefined) => void;
  onSelectFinal?: (date: Date) => void;

  placeholder?: string;

  disabled?: (date: Date) => boolean; // custom disable logic
  formatStr?: string; // default: yyyy-MM-dd

  className?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  onSelectFinal,
  placeholder = "Pick a date",
  disabled,
  formatStr = "yyyy-MM-dd",
  className,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && <Label label={label} />}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-40 justify-start text-left font-normal",
              !value && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-1 h-4 w-4" />
            {value ? format(value, formatStr) : placeholder}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value}
            defaultMonth={value ?? new Date()}
            onSelect={(date) => {
              onChange?.(date);

              if (date) {
                onSelectFinal?.(date); // trigger fetch di sini
                setOpen(false); // close popover setelah memilih tanggal
              }
            }}
            disabled={disabled}
            required
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
