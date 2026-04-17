type YieldInput = {
  yield_1d: string;
  yield_ytd: string;
};

export type YieldInputByItemId = Record<string, YieldInput>;