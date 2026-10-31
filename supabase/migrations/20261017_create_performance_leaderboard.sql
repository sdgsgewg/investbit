-- Migration: Add get_performance_leaderboard RPC and performance index
-- Description: Efficiently computes period performance (yield) for mutual funds by comparing end date NAV and baseline NAV strictly from the previous exchange trading day.

-- 1. Index optimization for fast lookups on rd_records
CREATE INDEX IF NOT EXISTS idx_rd_records_item_date_nav 
ON public.rd_records (item_id, date DESC) 
WHERE nav_1d IS NOT NULL AND nav_1d > 0;

CREATE INDEX IF NOT EXISTS idx_exchange_holidays_date
ON public.exchange_holidays (holiday_date);

-- 2. Drop previous version if exists
DROP FUNCTION IF EXISTS public.get_performance_leaderboard(date, date, uuid);

-- 3. Create get_performance_leaderboard RPC
CREATE OR REPLACE FUNCTION public.get_performance_leaderboard(
  p_start_date date,
  p_end_date date,
  p_category_id uuid DEFAULT NULL
)
RETURNS TABLE (
  item_id uuid,
  item_name text,
  category_id uuid,
  category_name text,
  baseline_date date,
  baseline_nav numeric,
  end_date date,
  end_nav numeric,
  yield_value numeric
)
LANGUAGE sql
STABLE
AS $$
WITH target_items AS (
  SELECT 
    i.id AS item_id,
    i.name AS item_name,
    c.id AS category_id,
    c.name AS category_name
  FROM public.rd_items i
  JOIN public.rd_categories c ON c.id = i.category_id
  WHERE (p_category_id IS NULL OR c.id = p_category_id)
),
prev_trading_day AS (
  -- Cari hari bursa aktif terakhir sebelum p_start_date
  SELECT d::date AS baseline_date
  FROM generate_series(p_start_date - interval '20 days', p_start_date - interval '1 day', interval '1 day') AS d
  WHERE EXTRACT(DOW FROM d) NOT IN (0, 6)
    AND d::date NOT IN (SELECT holiday_date FROM public.exchange_holidays)
  ORDER BY d DESC
  LIMIT 1
),
end_records AS (
  SELECT DISTINCT ON (r.item_id)
    r.item_id,
    r.date AS end_date,
    r.nav_1d AS end_nav
  FROM public.rd_records r
  JOIN target_items ti ON ti.item_id = r.item_id
  WHERE r.date >= p_start_date 
    AND r.date <= p_end_date
    AND r.nav_1d IS NOT NULL 
    AND r.nav_1d > 0
  ORDER BY r.item_id, r.date DESC
),
baseline_records AS (
  -- Hanya ambil baseline jika record persis ada pada hari bursa aktif sebelum p_start_date
  SELECT
    r.item_id,
    r.date AS baseline_date,
    r.nav_1d AS baseline_nav
  FROM prev_trading_day ptd
  JOIN public.rd_records r ON r.date = ptd.baseline_date
  JOIN target_items ti ON ti.item_id = r.item_id
  WHERE r.nav_1d IS NOT NULL 
    AND r.nav_1d > 0
)
SELECT
  ti.item_id,
  ti.item_name,
  ti.category_id,
  ti.category_name,
  b.baseline_date,
  b.baseline_nav,
  e.end_date,
  e.end_nav,
  ((e.end_nav - b.baseline_nav) / b.baseline_nav) * 100 AS yield_value
FROM target_items ti
JOIN end_records e ON e.item_id = ti.item_id
JOIN baseline_records b ON b.item_id = ti.item_id
ORDER BY ti.category_name ASC, yield_value DESC, ti.item_name ASC;
$$;

COMMENT ON FUNCTION public.get_performance_leaderboard IS 'Computes mutual fund performance yields between strictly validated baseline and end of period in SQL.';
