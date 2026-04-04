"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslations } from "next-intl";

type ReksaDanaItem = {
  id: string;
  name: string;
};

type Category = {
  id: string;
  name: string;
  rd_items: ReksaDanaItem[];
};

export default function InputPage() {
  const tCommon = useTranslations("Common");
  const tRecapDaily = useTranslations("RdnRecap.daily");
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // yyyy-mm-dd format
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0],
  );

  const [inputs, setInputs] = useState<
    Record<string, { yield_1d: string; yield_ytd: string }>
  >({});

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    fetchRecordsForDate(selectedDate);
  }, [selectedDate]);

  const fetchRecordsForDate = async (date: string) => {
    try {
      const { data } = await axios.get(
        `/api/reksadana/records?startDate=${date}&endDate=${date}`,
      );

      const newInputs: Record<string, { yield_1d: string; yield_ytd: string }> =
        {};
      data.forEach(
        (record: {
          item_id: string;
          yield_1d: number | null;
          yield_ytd: number | null;
        }) => {
          newInputs[record.item_id] = {
            yield_1d: record.yield_1d !== null ? String(record.yield_1d) : "",
            yield_ytd:
              record.yield_ytd !== null ? String(record.yield_ytd) : "",
          };
        },
      );
      setInputs(newInputs);
    } catch (error) {
      console.error("Failed to load records", error);
    }
  };

  const fetchItems = async () => {
    try {
      const { data } = await axios.get<Category[]>("/api/reksadana/items");
      setCategories(data);
    } catch (error) {
      console.error("Failed to load categories", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    itemId: string,
    field: "yield_1d" | "yield_ytd",
    value: string,
  ) => {
    setInputs((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [field]: value,
      },
    }));
  };

  const formatToTwoDecimals = (value: string) => {
    const parsed = parseFloat(value.replace(",", "."));
    return isNaN(parsed) ? "" : parsed.toFixed(2);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Prepare payload
      const payload = Object.entries(inputs)
        .map(([itemId, values]) => {
          const parsed1d = parseFloat(values.yield_1d.replace(",", "."));
          const parsedYtd = parseFloat(values.yield_ytd.replace(",", "."));

          return {
            item_id: itemId,
            date: selectedDate,
            yield_1d: isNaN(parsed1d) ? null : parsed1d,
            yield_ytd: isNaN(parsedYtd) ? null : parsedYtd,
          };
        })
        .filter((doc) => doc.yield_1d !== null || doc.yield_ytd !== null);

      if (payload.length === 0) {
        alert(tRecapDaily("errorSaveData"));
        setSaving(false);
        return;
      }

      await axios.post("/api/reksadana/records", payload);
      alert(tRecapDaily("successSaveData") + selectedDate);
      // Fetch the latest records again to ensure fields are populated correctly
      fetchRecordsForDate(selectedDate);
    } catch (error) {
      console.error("Error saving data", error);
      alert(tRecapDaily("errorSaveDataFailed"));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-4">{tRecapDaily("loading")}</div>;
  }

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">{tRecapDaily("title")}</h2>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">{tRecapDaily("selectDate")}:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border p-2 rounded text-zinc-800 dark:text-zinc-200 dark:bg-zinc-800"
            />
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded transition disabled:opacity-50"
        >
          {saving ? tRecapDaily("saving") : tRecapDaily("saveData")}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <thead className="bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
            <tr>
              <th className="py-3 px-4 font-semibold">{tCommon("reksadana")}</th>
              <th className="py-3 px-4 font-semibold w-40 text-center">
                {tRecapDaily("yield1d")}
              </th>
              <th className="py-3 px-4 font-semibold w-40 text-center">
                {tRecapDaily("yieldYtd")}
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <React.Fragment key={category.id}>
                {/* Category Header */}
                <tr className="bg-zinc-50 dark:bg-zinc-950 border-t border-b border-zinc-200 dark:border-zinc-800">
                  <td colSpan={3} className="py-2 px-4 font-bold">
                    {category.name}
                  </td>
                </tr>

                {/* Items */}
                {category.rd_items.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-zinc-100 dark:border-zinc-800 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                  >
                    <td className="py-3 px-4">{item.name}</td>
                    <td className="py-2 px-2">
                      <input
                        className={`w-full text-center border p-1 rounded focus:outline-blue-500 dark:bg-zinc-800 dark:border-zinc-700 ${parseFloat((inputs[item.id]?.yield_1d || "").replace(",", ".")) < 0 ? "text-red-600 dark:text-red-400 font-medium" : ""}`}
                        placeholder="0.00"
                        value={inputs[item.id]?.yield_1d || ""}
                        onChange={(e) =>
                          handleInputChange(item.id, "yield_1d", e.target.value)
                        }
                        onBlur={(e) =>
                          handleInputChange(
                            item.id,
                            "yield_1d",
                            formatToTwoDecimals(e.target.value),
                          )
                        }
                      />
                    </td>
                    <td className="py-2 px-2">
                      <input
                        className={`w-full text-center border p-1 rounded focus:outline-blue-500 dark:bg-zinc-800 dark:border-zinc-700 ${parseFloat((inputs[item.id]?.yield_ytd || "").replace(",", ".")) < 0 ? "text-red-600 dark:text-red-400 font-medium" : ""}`}
                        placeholder="0.00"
                        value={inputs[item.id]?.yield_ytd || ""}
                        onChange={(e) =>
                          handleInputChange(
                            item.id,
                            "yield_ytd",
                            e.target.value,
                          )
                        }
                        onBlur={(e) =>
                          handleInputChange(
                            item.id,
                            "yield_ytd",
                            formatToTwoDecimals(e.target.value),
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
