-- Enable extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table
CREATE TABLE IF NOT EXISTS public.rd_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Items table
CREATE TABLE IF NOT EXISTS public.rd_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category_id UUID REFERENCES public.rd_categories(id) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Records table
CREATE TABLE IF NOT EXISTS public.rd_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  item_id UUID REFERENCES public.rd_items(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  yield_1d NUMERIC(10,4),
  yield_ytd NUMERIC(10,4),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(item_id, date)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_rd_records_date ON public.rd_records(date);
CREATE INDEX IF NOT EXISTS idx_rd_records_item_id ON public.rd_records(item_id);

-- RLS
ALTER TABLE public.rd_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rd_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rd_records ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE public.rd_categories IS 'Reksa dana categories';
COMMENT ON TABLE public.rd_items IS 'Individual reksa dana investment items';
COMMENT ON TABLE public.rd_records IS 'Daily/periodic yield records per item';
