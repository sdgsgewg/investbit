"use client";

import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import FormPageLayout from "@/components/layout/dashboard/FormPageLayout";
import { useRouter } from "@/navigation";
import { ENTITY_CONFIG } from "@/config/entities";
import { ItemLookupResponse } from "@/types/mutual-fund/items";
import { useCrudPageTitle } from "@/hooks/crud/useCrudPageTitle";
import {
  useItemEdit,
  useItemSubmit,
} from "@/hooks/dashboard/mutual-fund/items";
import ItemForm from "@/components/forms/mutual-fund/items/ItemForm";

interface Props {
  itemLookup: ItemLookupResponse;
}

const EditItemPage = ({ itemLookup }: Props) => {
  const router = useRouter();

  const { getTitle } = useCrudPageTitle();

  const { item, isLoading, error, refetch } = useItemEdit(itemLookup.id);

  const { submit, isSubmitting } = useItemSubmit();

  // Initial request is still loading and no cached item data is available yet.
  if (!item && isLoading) {
    return <EntityLoading entity="rdItem" />;
  }

  // Initial request failed before any item data could be loaded.
  if (!item && error) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  // Fallback: no item data is available even though loading has finished.
  if (!item) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  return (
    <FormPageLayout
      title={getTitle("edit", "rdItem")}
      formSize="small"
      form={
        <ItemForm
          mode="edit"
          item={item}
          loading={isSubmitting}
          onSubmit={(payload) =>
            submit({
              id: item.id,
              payload,
              onSuccess: () => {
                router.push(ENTITY_CONFIG["rdItem"]["dashboardRoute"]);
              },
            })
          }
        />
      }
    />
  );
};

export default EditItemPage;
