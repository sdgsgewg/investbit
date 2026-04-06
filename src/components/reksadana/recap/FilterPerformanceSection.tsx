import { CategoryData } from "@/app/types/reksadana/categories/CategoryData";
import { FilterPerformance } from "@/app/types/reksadana/recap/FilterPerformance";
import React from "react";

interface FilterPerformanceSectionProps {
  categories: CategoryData[];
  form: {
    category_id: string;
  };
  setForm: React.Dispatch<React.SetStateAction<FilterPerformance>>;
  handleApplyFilter: () => void;
}

const FilterPerformanceSection = ({
  categories,
  form,
  setForm,
  handleApplyFilter,
}: FilterPerformanceSectionProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
      <div className="flex flex-col sm:flex-row w-full sm:w-80 gap-2 sm:gap-0">
        <label htmlFor="category">Select Category:</label>
        <select
          id="category"
          value={form.category_id}
          onChange={(e) => setForm({ ...form, category_id: e.target.value })}
          onLoad={() => {
            setForm({ ...form, category_id: "" });
          }}
          className="border p-2 w-full"
        >
          <option value="" className="bg-zinc-100 dark:bg-zinc-800">
            All
          </option>
          {categories.map((c) => (
            <option
              key={c.id}
              value={c.id}
              className="bg-zinc-100 dark:bg-zinc-800"
            >
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <button
          onClick={handleApplyFilter}
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded cursor-pointer"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterPerformanceSection;
