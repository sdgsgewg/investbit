-- Migration: Add get_performance_analytics_matrix RPC
-- Description: Efficiently fetches analytics performance records including baseline in a single fast indexed query, returning JSONB to avoid PostgREST 1000-row limit.

DROP FUNCTION IF EXISTS public.get_performance_analytics_matrix(date, date, uuid);

CREATE OR REPLACE FUNCTION public.get_performance_analytics_matrix(
  p_start_date date,
  p_end_date date,
  p_category_id uuid DEFAULT NULL
)
RETURNS jsonb
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
baseline_records AS (
  SELECT DISTINCT ON (r.item_id)
    r.item_id,
    ti.item_name,
    ti.category_id,
    ti.category_name,
    r.date,
    r.nav_1d
  FROM public.rd_records r
  JOIN target_items ti ON ti.item_id = r.item_id
  WHERE r.date < p_start_date
    AND r.nav_1d IS NOT NULL 
    AND r.nav_1d > 0
  ORDER BY r.item_id, r.date DESC
),
period_records AS (
  SELECT
    r.item_id,
    ti.item_name,
    ti.category_id,
    ti.category_name,
    r.date,
    r.nav_1d
  FROM public.rd_records r
  JOIN target_items ti ON ti.item_id = r.item_id
  WHERE r.date >= p_start_date
    AND r.date <= p_end_date
    AND r.nav_1d IS NOT NULL 
    AND r.nav_1d > 0
),
all_records AS (
  SELECT * FROM baseline_records
  UNION ALL
  SELECT * FROM period_records
  ORDER BY date ASC, item_id ASC
)
SELECT coalesce(
  jsonb_agg(
    jsonb_build_object(
      'item_id', item_id,
      'item_name', item_name,
      'category_id', category_id,
      'category_name', category_name,
      'date', date,
      'nav_1d', nav_1d
    )
  ),
  '[]'::jsonb
)
FROM all_records;
$$;

COMMENT ON FUNCTION public.get_performance_analytics_matrix IS 'Fetches mutual fund NAV records for analytics time-series with automatic pre-period baseline in one indexed query returning JSONB.';
