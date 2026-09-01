import EditItemPage from "@/components/dashboard/mutual-fund/items/EditItemPage";
import { getItemLookupService } from "@/lib/services/reksadana/items.service";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const itemLookup = await getItemLookupService(slug);

  if (!itemLookup) {
    return notFound();
  }

  return <EditItemPage itemLookup={itemLookup} />;
}
