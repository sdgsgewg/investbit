-- Migration: Update get_performance_analytics_matrix RPC
-- Description:
-- Calculates independent period returns using exact exchange trading dates.
-- Supports daily, weekly, monthly, and yearly timeframes.

DROP FUNCTION IF EXISTS public.get_performance_analytics_matrix(
  date, date, uuid
);

DROP FUNCTION IF EXISTS public.get_performance_analytics_matrix(
  date, date, uuid, text
);

CREATE OR REPLACE FUNCTION public.get_performance_analytics_matrix(
  p_start_date date,
  p_end_date date,
  p_category_id uuid DEFAULT NULL,
  p_time_frame text DEFAULT 'weekly'
)
RETURNS jsonb
LANGUAGE sql
STABLE
AS $$
WITH
calendar_bounds AS (
  SELECT
    CASE
      WHEN p_time_frame = 'yearly'
        THEN (DATE_TRUNC('year', p_start_date) - INTERVAL '1 year')::date

      WHEN p_time_frame IN ('weekly', 'monthly') THEN
        (DATE_TRUNC('month', p_start_date) - INTERVAL '1 month')::date

      ELSE p_start_date - INTERVAL '14 days'
    END AS calendar_start,

    CASE
      WHEN p_time_frame = 'yearly'
        THEN (DATE_TRUNC('year', p_end_date) + INTERVAL '1 year - 1 day')::date

      WHEN p_time_frame IN ('weekly', 'monthly')
        THEN (DATE_TRUNC('month', p_end_date) + INTERVAL '1 month - 1 day')::date
        
      ELSE p_end_date
    END AS calendar_end
),

calendar AS (
  SELECT d::date AS calendar_date
  FROM calendar_bounds cb
  CROSS JOIN LATERAL GENERATE_SERIES(
    cb.calendar_start,
    cb.calendar_end,
    INTERVAL '1 day'
  ) AS d
),

trading_days AS (
  SELECT c.calendar_date
  FROM calendar c
  WHERE EXTRACT(ISODOW FROM c.calendar_date) BETWEEN 1 AND 5
    AND NOT EXISTS (
      SELECT 1
      FROM public.exchange_holidays eh
      WHERE eh.holiday_date = c.calendar_date
    )
),

-- Meniru getMonthWeeks() dari TypeScript.
-- Minggu pertama dimulai pada weekday pertama bulan tersebut.
-- Minggu berikutnya dimulai pada hari Senin berikutnya.
weekly_calendar AS (
  SELECT
    c.calendar_date,
    DATE_TRUNC('month', c.calendar_date)::date AS month_start,
    (
      1 + COUNT(*) FILTER (
        WHERE EXTRACT(ISODOW FROM weekday_dates.calendar_date) = 1
          AND weekday_dates.calendar_date > first_weekday.first_date
          AND weekday_dates.calendar_date <= c.calendar_date
      )
    )::integer AS week_number
  FROM calendar c

  CROSS JOIN LATERAL (
    SELECT MIN(c2.calendar_date) AS first_date
    FROM calendar c2
    WHERE DATE_TRUNC('month', c2.calendar_date)
        = DATE_TRUNC('month', c.calendar_date)
      AND EXTRACT(ISODOW FROM c2.calendar_date) BETWEEN 1 AND 5
  ) first_weekday

  CROSS JOIN LATERAL (
    SELECT c2.calendar_date
    FROM calendar c2
    WHERE DATE_TRUNC('month', c2.calendar_date)
        = DATE_TRUNC('month', c.calendar_date)
      AND c2.calendar_date <= c.calendar_date
      AND EXTRACT(ISODOW FROM c2.calendar_date) BETWEEN 1 AND 5
  ) weekday_dates

  WHERE EXTRACT(ISODOW FROM c.calendar_date) BETWEEN 1 AND 5
  GROUP BY c.calendar_date, first_weekday.first_date
),

period_calendar AS (
  SELECT
    c.calendar_date,

    CASE
      WHEN p_time_frame = 'daily' THEN
        TO_CHAR(c.calendar_date, 'YYYY-MM-DD')

      -- WHEN p_time_frame = 'weekly' THEN
      --   TO_CHAR(w.month_start, 'YYYY-MM')
      --     || '-W'
      --     || w.week_number::text

      WHEN p_time_frame = 'weekly' THEN
        TO_CHAR(w.month_start, 'YYYY-MM')
          || '-W'
          || w.week_number::text
          || '|'
          || TO_CHAR(
            (
              SELECT MIN(w2.calendar_date)
              FROM weekly_calendar w2
              WHERE w2.month_start = w.month_start
                AND w2.week_number = w.week_number
            ),
            'FMDD'
          )
          || '-'
          || TO_CHAR(
            (
              SELECT MAX(w2.calendar_date)
              FROM weekly_calendar w2
              WHERE w2.month_start = w.month_start
                AND w2.week_number = w.week_number
            ),
            'FMDD Mon'
          )

      WHEN p_time_frame = 'monthly' THEN
        TO_CHAR(c.calendar_date, 'YYYY-MM')

      WHEN p_time_frame = 'yearly' THEN
        TO_CHAR(c.calendar_date, 'YYYY')
    END AS period_key,

    CASE
      WHEN p_time_frame = 'daily' THEN c.calendar_date
      WHEN p_time_frame = 'weekly' THEN
        MIN(c.calendar_date) FILTER (
          WHERE EXTRACT(ISODOW FROM c.calendar_date) BETWEEN 1 AND 5
        ) OVER (PARTITION BY w.month_start, w.week_number)
      WHEN p_time_frame = 'monthly' THEN
        DATE_TRUNC('month', c.calendar_date)::date
      WHEN p_time_frame = 'yearly' THEN
        DATE_TRUNC('year', c.calendar_date)::date
    END AS period_start,

    CASE
      WHEN p_time_frame = 'daily' THEN c.calendar_date
      WHEN p_time_frame = 'weekly' THEN
        MAX(c.calendar_date) FILTER (
          WHERE EXTRACT(ISODOW FROM c.calendar_date) BETWEEN 1 AND 5
        ) OVER (PARTITION BY w.month_start, w.week_number)
      WHEN p_time_frame = 'monthly' THEN
        (DATE_TRUNC('month', c.calendar_date) + INTERVAL '1 month - 1 day')::date
      WHEN p_time_frame = 'yearly' THEN
        (DATE_TRUNC('year', c.calendar_date) + INTERVAL '1 year - 1 day')::date
    END AS period_end

  FROM calendar c
  LEFT JOIN weekly_calendar w
    ON w.calendar_date = c.calendar_date
),

periods AS (
  SELECT DISTINCT
    period_key,
    period_start,
    period_end
  FROM period_calendar
  WHERE period_key IS NOT NULL
    AND period_start <= p_end_date
    AND period_end >= p_start_date
),

period_dates AS (
  SELECT
    p.period_key,
    p.period_start,
    p.period_end,

    (
      SELECT MAX(td.calendar_date)
      FROM trading_days td
      WHERE td.calendar_date >= p.period_start
        AND td.calendar_date <= LEAST(p.period_end, p_end_date)
    ) AS end_date,

    (
      SELECT MAX(td.calendar_date)
      FROM trading_days td
      WHERE td.calendar_date < p.period_start
    ) AS baseline_date

  FROM periods p
),

available_periods AS (
  SELECT pd.*
  FROM period_dates pd
  WHERE pd.end_date IS NOT NULL
    AND EXISTS (
      SELECT 1
      FROM public.rd_records r
      WHERE r.date = pd.end_date
    )
),

target_items AS (
  SELECT
    i.id AS item_id,
    i.name AS item_name,
    c.id AS category_id,
    c.name AS category_name
  FROM public.rd_items i
  JOIN public.rd_categories c
    ON c.id = i.category_id
  WHERE p_category_id IS NULL
     OR c.id = p_category_id
),

matrix AS (
  SELECT
    ti.item_id,
    ti.item_name,
    ti.category_id,
    ti.category_name,
    ap.period_key,

    ap.baseline_date,
    ap.end_date,

    baseline_record.nav_1d AS baseline_nav,
    end_record.nav_1d AS end_nav

  FROM target_items ti
  CROSS JOIN available_periods ap

  LEFT JOIN public.rd_records baseline_record
    ON baseline_record.item_id = ti.item_id
   AND baseline_record.date = ap.baseline_date
   AND baseline_record.nav_1d > 0

  LEFT JOIN public.rd_records end_record
    ON end_record.item_id = ti.item_id
   AND end_record.date = ap.end_date
   AND end_record.nav_1d > 0
)

SELECT COALESCE(
  JSONB_AGG(
    JSONB_BUILD_OBJECT(
      'item_id', item_id,
      'item_name', item_name,
      'category_id', category_id,
      'category_name', category_name,
      'period', period_key,
      'baseline_date', TO_CHAR(baseline_date, 'YYYY-MM-DD'),
      'baseline_nav', baseline_nav,
      'end_date', TO_CHAR(end_date, 'YYYY-MM-DD'),
      'end_nav', end_nav
    )
    ORDER BY period_key, item_id
  ),
  '[]'::jsonb
)
FROM matrix;
$$;

COMMENT ON FUNCTION public.get_performance_analytics_matrix(
  date, date, uuid, text
) IS
  'Calculates independent mutual fund returns using exact exchange trading dates for daily, custom weekly, monthly, and yearly periods.';