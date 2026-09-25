import InputNumber from "@/components/ui/InputNumber";
import TableWrapper from "@/components/wrappers/TableWrapper";
import { formatDecimal } from "@/lib/utils/number";
import { GroupedItemListResponse } from "@/types/mutual-fund/items";
import { FieldInput } from "@/types/mutual-fund/records";
import { RecordInputByItemId } from "@/types/mutual-fund/records/RecordInputByItemId";
import { useLocale, useTranslations } from "next-intl";
import React from "react";

interface InputTableProps {
  groupedItems: GroupedItemListResponse[];
  inputs: RecordInputByItemId;
  onInputChange: (itemId: string, field: FieldInput, value: string) => void;
}

const InputTable = ({
  groupedItems,
  inputs,
  onInputChange,
}: InputTableProps) => {
  const tRecords = useTranslations("dashboard.mutualFund.records");

  const locale = useLocale();

  return (
    <TableWrapper
      headerChildren={
        <>
          <th className="py-3 px-4 text-sm md:text-base font-semibold min-w-36">
            {tRecords("table.mutualFund")}
          </th>
          <th className="py-3 px-4 text-sm md:text-base font-semibold w-40 text-center">
            {tRecords("table.nav1d")}
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
                <tr className="sticky top-10.5 md:top-11.5 z-10 bg-zinc-50  dark:bg-zinc-950 border-t border-b border-zinc-200 dark:border-zinc-800">
                  <td
                    colSpan={2}
                    className="py-2 px-4 text-xs sm:text-sm md:text-base font-bold"
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
                      {/* Name */}
                      <td className="py-3 px-4 text-xs sm:text-sm md:text-base">
                        {item.name}
                      </td>

                      {/* NAV 1 Day */}
                      <td className="py-2 px-2 text-xs sm:text-sm md:text-base">
                        <InputNumber
                          value={inputs[item.id]?.nav_1d}
                          placeholder={formatDecimal(1000, 4, locale)}
                          fractionDigits={4}
                          onChange={(val) =>
                            onInputChange(item.id, "nav_1d", val)
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
