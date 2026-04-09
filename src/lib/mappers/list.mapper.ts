import { ListData, PointData } from "@/app/types/learn/ListData";

export function mapListWithImages(
  list: any,
  options?: {
    images?: string[];
  },
): ListData {
  const mappedList: ListData = {
    ...list,
    points: list.points.map((point: PointData, pointIndex: number) => ({
      ...point,
      ...(options?.images?.length && { image: options.images[pointIndex] }),
      //   image: images[pointIndex],
    })),
  };

  return mappedList;
}
