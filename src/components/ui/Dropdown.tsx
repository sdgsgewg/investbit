"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { useClickOutside } from "@/hooks/uceClickOutside";
import { Option } from "@/types/option";
import { Label } from "../forms/fields";
import { useCallback, useEffect, useRef, useState } from "react";

interface DropdownProps {
  label?: string;

  value: string;
  options: Option[];
  onChange: (val: string) => void;

  placeholder?: string;

  required?: boolean;

  className?: string;
}

export default function Dropdown({
  label,
  value,
  onChange,
  options,
  placeholder = "Select...",
  className = "",
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<"top" | "bottom">("bottom");

  const ref = useRef<HTMLDivElement>(null);

  const updatePlacement = useCallback(() => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const dropdownHeight = Math.min(options.length * 40, 320);
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
      setPlacement("top");
    } else {
      setPlacement("bottom");
    }
  }, [options.length]);

  useEffect(() => {
    if (!open) return;

    updatePlacement();

    window.addEventListener("resize", updatePlacement);
    window.addEventListener("scroll", updatePlacement, true);

    return () => {
      window.removeEventListener("resize", updatePlacement);
      window.removeEventListener("scroll", updatePlacement, true);
    };
  }, [open, updatePlacement]);

  useClickOutside(ref, () => setOpen(false));

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className={`relative flex flex-col gap-2 ${className}`}>
      {label && <Label label={label} />}

      {/* Trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center gap-2 justify-between px-4 py-2 rounded-full bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition shadow-sm"
      >
        <span className="text-sm font-medium">
          {selected?.label || placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: placement === "bottom" ? -8 : 8,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: placement === "bottom" ? -8 : 8,
              scale: 0.98,
            }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 w-full max-h-80 rounded-2xl bg-white dark:bg-zinc-900 shadow-lg border border-zinc-200 dark:border-zinc-700 overflow-y-auto ${
              placement === "bottom" ? "top-full mt-2" : "bottom-full mb-2"
            }`}
          >
            {options.map((opt) => {
              const isActive = opt.value === value;

              return (
                <button
                  key={String(opt.value)}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2 text-sm transition ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                      : "hover:bg-gray-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  <span>{opt.label}</span>
                  {isActive && <Check className="h-4 w-4" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
