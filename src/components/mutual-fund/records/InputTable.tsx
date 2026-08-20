import InputNumber from "@/components/ui/InputNumber";
import TableWrapper from "@/components/ui/TableWrapper";
import { GroupedItemListItem } from "@/types/mutual-fund/items";
import { YieldInputByItemId } from "@/types/mutual-fund/records/YieldInputByItemId";
import { useTranslations } from "next-intl";
import React from "react";

interface InputTableProps {
  groupedItems: GroupedItemListItem[];
  inputs: YieldInputByItemId;
  onInputChange: (
    itemId: string,
    field: "yield_1d" | "yield_ytd",
    value: string,
  ) => void;
}

const InputTable = ({
  groupedItems,
  inputs,
  onInputChange,
}: InputTableProps) => {
  const tRecords = useTranslations("dashboard.mutualFund.records");

  return (
    <TableWrapper
      headerChildren={
        <>
          <th className="py-3 px-4 text-sm sm:text-base font-semibold min-w-36">
            {tRecords("table.mutualFund")}
          </th>
          <th className="py-3 px-4 text-sm sm:text-base font-semibold w-40 text-center">
            {tRecords("table.yield1d")}
          </th>
          <th className="py-3 px-4 text-sm sm:text-base font-semibold w-40 text-center">
            {tRecords("table.yieldYtd")}
          </th>
        </>
      }
      bodyChildren={
        <>
          {groupedItems.map((grouped) => {
            const { category, items } = grouped;

            return (
              <React.Fragment key={category.id}>
                {/* Category Header */}
                <tr className="bg-zinc-50 dark:bg-zinc-950 border-t border-b border-zinc-200 dark:border-zinc-800">
                  <td
                    colSpan={3}
                    className="py-2 px-4 text-sm sm:text-base font-bold"
                  >
                    {category.name}
                  </td>
                </tr>

                {/* Items */}
                {items.map((item) => {
                  return (
                    <tr
                      key={item.id}
                      className="border-b border-zinc-100 dark:border-zinc-800 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                    >
                      <td className="py-3 px-4 text-sm sm:text-base">
                        {item.name}
                      </td>
                      <td className="py-2 px-2 text-sm sm:text-base">
                        <InputNumber
                          value={inputs[item.id]?.yield_1d}
                          onChange={(val) =>
                            onInputChange(item.id, "yield_1d", val)
                          }
                        />
                      </td>
                      <td className="py-2 px-2 text-sm sm:text-base">
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
            );
          })}
        </>
      }
    />
  );
};

export default InputTable;
