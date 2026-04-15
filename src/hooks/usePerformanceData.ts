import { useState, useEffect } from "react";
import axios from "axios";
import { FilterPerformance } from "@/types/reksadana/recap/performance/FilterPerformance";
import { CategoryStats } from "@/types/reksadana/recap/CategoryStats";
import { DataType } from "../types/reksadana/recap/performance/DataType";
import { TimeFrameType } from "@/types/reksadana/recap/performance/TimeFrameType";

interface UsePerformanceDataProps {
  timeFrame: TimeFrameType;
  initialForm?: FilterPerformance;
}

interface UsePerformanceDataReturn {
  data: DataType;
  timePeriods: string[];
  loading: boolean;
  form: FilterPerformance;
  setForm: React.Dispatch<React.SetStateAction<FilterPerformance>>;
  categoryStats: CategoryStats;
  getCellColor: (
    val: number | undefined,
    catName: string,
    timeKey: string,
  ) => string;
  handleApplyFilter: () => void;
  fetchPerformanceData: () => Promise<void>;
}

export const usePerformanceData = ({
  timeFrame,
  initialForm = { category_id: "" },
}: UsePerformanceDataProps): UsePerformanceDataReturn => {
  const [data, setData] = useState<DataType>([]);
  const [timePeriods, setTimePeriods] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FilterPerformance>(initialForm);
  const [categoryStats, setCategoryStats] = useState<CategoryStats>({});

  const fetchPerformanceData = async () => {
    setLoading(true);

    try {
      const res = await axios.get("/api/reksadana/recap/performance", {
        params: {
          timeFrame,
          categoryId: form.category_id || undefined,
        },
      });

      const { data, timePeriods, categoryStats } = res.data;

      setData(data);
      setTimePeriods(timePeriods);
      setCategoryStats(categoryStats);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Function to get cell color based on performance value
  const getCellColor = (
    val: number | undefined,
    catName: string,
    timeKey: string,
  ) => {
    if (val === undefined || isNaN(val)) return "";

    const stat = categoryStats[catName]?.[timeKey];
    if (!stat || stat.min === stat.max) return ""; // No comparison possible

    const normalized = (val - stat.min) / (stat.max - stat.min);

    // 3-color divergent scale: Red -> Transparent -> Green
    if (normalized < 0.5) {
      // 0 to 0.5 maps to Red dissipating into Transparent
      const intensity = 1 - normalized / 0.5; // 1 to 0
      return `rgba(239, 68, 68, ${Math.max(intensity * 0.8, 0.05)})`;
    } else {
      // 0.5 to 1 maps to Transparent building into Green
      const intensity = (normalized - 0.5) / 0.5; // 0 to 1
      return `rgba(34, 197, 94, ${Math.max(intensity * 0.8, 0.05)})`;
    }
  };

  // Handle apply filter
  const handleApplyFilter = () => {
    fetchPerformanceData();
  };

  // Initial data fetch
  useEffect(() => {
    fetchPerformanceData();
  }, [timeFrame, form.category_id]);

  return {
    data,
    timePeriods,
    loading,
    form,
    setForm,
    categoryStats,
    getCellColor,
    handleApplyFilter,
    fetchPerformanceData,
  };
};
