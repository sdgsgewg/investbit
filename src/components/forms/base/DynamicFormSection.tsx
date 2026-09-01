import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import FormSection from "./FormSection";
import { useEffect } from "react";

interface DynamicFormSectionProps<T> {
  title: string;
  noData: string;

  items: T[];

  minItems?: number;
  maxItems?: number;

  createItem: () => T;

  onChange: (items: T[]) => void;

  renderItem: (
    item: T,
    index: number,
    updateItem: <K extends keyof T>(index: number, key: K, value: T[K]) => void,
  ) => React.ReactNode;
}

export default function DynamicFormSection<T>({
  title,
  noData,
  items,
  minItems = 0,
  maxItems,
  createItem,
  onChange,
  renderItem,
}: DynamicFormSectionProps<T>) {
  const tCommonActions = useTranslations("common.actions");

  const addItem = () => {
    if (maxItems !== undefined && items.length >= maxItems) return;

    onChange([...items, createItem()]);
  };

  const removeItem = (index: number) => {
    if (items.length <= minItems) return;

    onChange(items.filter((_, i) => i !== index));
  };

  const updateItem = <K extends keyof T>(
    index: number,
    key: K,
    value: T[K],
  ) => {
    const newItems = [...items];

    newItems[index] = {
      ...newItems[index],
      [key]: value,
    };

    onChange(newItems);
  };

  useEffect(() => {
    if (items.length < minItems) {
      onChange(
        Array.from({ length: minItems }, (_, i) => items[i] ?? createItem()),
      );
    }
  }, [items, minItems]);

  const modifiedTitle =
    minItems > 0 ? `${title} (min ${minItems})` : `${title} (optional)`;

  return (
    <FormSection
      title={modifiedTitle}
      action={
        <Button type="button" onClick={addItem}>
          <Plus className="mr-2 h-4 w-4" />
          {tCommonActions("add")}
        </Button>
      }
    >
      {items.length === 0 && (
        <div className="rounded-xl border border-dashed p-6 text-center">
          {noData}
        </div>
      )}

      {items.map((item, index) => (
        <div key={index} className="rounded-xl border p-4 space-y-4">
          {renderItem(item, index, updateItem)}

          {items.length > minItems && (
            <div className="flex justify-end">
              <Button
                type="button"
                variant="destructive"
                disabled={maxItems !== undefined && items.length >= maxItems}
                onClick={() => removeItem(index)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                {tCommonActions("remove")}
              </Button>
            </div>
          )}
        </div>
      ))}
    </FormSection>
  );
}
