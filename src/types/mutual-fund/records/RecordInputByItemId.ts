type YieldInput = {
  nav_1d: string;
  yield_1d: string;
  yield_ytd: string;
};

export type RecordInputByItemId = Record<string, YieldInput>;
