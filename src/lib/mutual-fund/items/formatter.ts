export function formatTotalAum(totalAum: number | null): string {
  if (totalAum === null || !Number.isFinite(totalAum)) {
    return "-";
  }

  const units = [
    { value: 1_000_000_000_000, suffix: "T" },
    { value: 1_000_000_000, suffix: "B" },
    { value: 1_000_000, suffix: "M" },
    { value: 1_000, suffix: "Rb" },
  ];

  const unit = units.find(({ value }) => Math.abs(totalAum) >= value);

  if (!unit) {
    return totalAum.toLocaleString("id-ID", {
      maximumFractionDigits: 2,
    });
  }

  return `${(totalAum / unit.value).toLocaleString("id-ID", {
    maximumFractionDigits: 2,
  })}${unit.suffix}`;
}
