import { useState } from "react";

export function useCrudFilterDialog<T extends object>(
  filters: T,
  updateFiltersPartial: (filters: T) => void,
  defaultFilters: T,
) {
  const [open, setOpen] = useState(false);
  const [draftFilters, setDraftFilters] = useState<T>(filters);

  const openFilter = () => {
    setDraftFilters(filters);
    setOpen(true);
  };

  const updateDraftFilter = <K extends keyof T>(key: K, value: T[K]) => {
    setDraftFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const applyFilter = () => {
    updateFiltersPartial(draftFilters);
    setOpen(false);
  };

  const resetFilter = () => {
    setDraftFilters(defaultFilters);
  };

  return {
    filterOpen: open,
    setFilterOpen: setOpen,

    draftFilters,
    setDraftFilters,
    updateDraftFilter,

    openFilter,
    applyFilter,
    resetFilter,
  };
}
