import InputNumber from "@/components/ui/InputNumber";
import { CategoryWithItems } from "@/features/reksadana/recap/input/types/CategoryWithItems";
import { YieldInputByItemId } from "@/features/reksadana/recap/input/types/YieldInputByItemId";
import { useTranslations } from "next-intl";
import React from "react";

interface InputTableProps {
  categoriesWithItems: CategoryWithItems[];
  inputs: YieldInputByItemId;
  onInputChange: (
    itemId: string,
    field: "yield_1d" | "yield_ytd",
    value: string,
  ) => void;
}

const InputTable = ({
  categoriesWithItems,
  inputs,
  onInputChange,
}: InputTableProps) => {
  const tRecapInput = useTranslations("reksadana.recap.input");

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <thead className="bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
          <tr>
            <th className="py-3 px-4 font-semibold">
              {tRecapInput("table.mutualFund")}
            </th>
            <th className="py-3 px-4 font-semibold w-40 text-center">
              {tRecapInput("table.yield1d")}
            </th>
            <th className="py-3 px-4 font-semibold w-40 text-center">
              {tRecapInput("table.yieldYtd")}
            </th>
          </tr>
        </thead>
        <tbody>
          {categoriesWithItems.map((category) => (
            <React.Fragment key={category.id}>
              {/* Category Header */}
              <tr className="bg-zinc-50 dark:bg-zinc-950 border-t border-b border-zinc-200 dark:border-zinc-800">
                <td colSpan={3} className="py-2 px-4 font-bold">
                  {category.name}
                </td>
              </tr>

              {/* Items */}
              {category.rd_items.map((item) => {
                return (
                  <tr
                    key={item.id}
                    className="border-b border-zinc-100 dark:border-zinc-800 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                  >
                    <td className="py-3 px-4">{item.name}</td>
                    <td className="py-2 px-2">
                      <InputNumber
                        value={inputs[item.id]?.yield_1d}
                        onChange={(val) =>
                          onInputChange(item.id, "yield_1d", val)
                        }
                      />
                    </td>
                    <td className="py-2 px-2">
                      <InputNumber
                        value={inputs[item.id]?.yield_ytd}
                        onChange={(val) =>
                          onInputChange(item.id, "yield_ytd", val)
                        }
                      />
                    </td>
                  </tr>
                );
              })}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InputTable;
