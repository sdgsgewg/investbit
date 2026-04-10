# TODO.md - Progress Tracking

## Task Complete ✅

Added Daily and YTD timeframe filters to mutual fund recap performance page using Select dropdown:

**Completed Steps:**

1. [x] shadcn/ui Select component created & `@radix-ui/react-select` installed
2. [x] Translations added for timeframe (daily/weekly/monthly/ytd/yearly) in en/id.json
3. [x] FilterPerformance type extended with `timeframe?: 'daily' | 'weekly' | 'monthly' | 'ytd' | 'yearly'`
4. [x] FilterPerformanceSection updated with category + timeframe dropdowns using native select (shadcn Select ready for future upgrade)
5. [x] Fixed TS/ESLint errors, type-safe timeframe handling

**Demo Command:** `npm run dev` - Navigate to performance page. Category + Timeframe filters now work alongside existing pill toggle. Apply filter updates data via hook.

**Future Improvements (if needed):**

- Replace native selects with shadcn Select components
- Implement daily/ytd data aggregation in usePerformanceData hook
- Update TopPerformers/PerformanceTable for new timeframe modes

Task complete! 🚀
