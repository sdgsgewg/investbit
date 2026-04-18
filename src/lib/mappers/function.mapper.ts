import { FunctionData } from "@/features/learn/types/FunctionData";

export function mapFunction(func: any): FunctionData {
  const mappedFunction: FunctionData = {
    ...func,
  };

  return mappedFunction;
}
