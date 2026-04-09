import { DefinitionData } from "@/app/types/learn/DefinitionData";

export function mapDefinitionWithImages(
  definition: any,
  options?: {
    images?: string[];
    sideBySideImages?: string[];
    children?: React.ReactNode;
  },
): DefinitionData {
  return {
    ...definition,
    ...(options?.images?.length && { images: options.images }),
    ...(options?.sideBySideImages?.length && {
      sideBySideImages: options.sideBySideImages,
      ...(options?.images?.length && { images: options.images }),
    }),
    ...(options?.children && { children: options.children }),
  };
}
