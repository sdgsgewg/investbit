import { FunctionData } from "@/app/types/learn/FunctionData";

export function mapFunction(func: any): FunctionData {
  const mappedFunction: FunctionData = {
    ...func,
  };

  return mappedFunction;
}
