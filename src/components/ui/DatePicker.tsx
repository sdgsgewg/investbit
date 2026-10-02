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

  startMonth?: Date;
  endMonth?: Date;

  minDate?: Date;
  maxDate?: Date;

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
  startMonth,
  endMonth,
  minDate,
  maxDate,
  disabled,
  formatStr = "yyyy-MM-dd",
  className,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && <Label label={label} />}

      <Popover
        open={open}
        onOpenChange={(nextOpen) => {
          // if (disabled) return;
          setOpen(nextOpen);
        }}
      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-34 flex items-center justify-start text-left text-sm font-normal",
              !value && "text-muted-foreground",
            )}
          >
            <CalendarIcon />
            {value ? format(value, formatStr) : placeholder}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value}
            defaultMonth={value ?? new Date()}
            captionLayout="dropdown"
            startMonth={startMonth}
            endMonth={endMonth}
            onSelect={(date) => {
              onChange?.(date);

              if (date) {
                onSelectFinal?.(date); // trigger fetch di sini
                setOpen(false); // close popover setelah memilih tanggal
              }
            }}
            disabled={(calendarDate) => {
              if (minDate && calendarDate < minDate) {
                return true;
              }
              if (maxDate && calendarDate > maxDate) {
                return true;
              }
              if (disabled) {
                return disabled(calendarDate);
              }
              return false;
            }}
            required
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
