"use client";

import ItemForm from "@/components/forms/mutual-fund/items/ItemForm";
import FormPageLayout from "@/components/layout/dashboard/FormPageLayout";
import { ENTITY_CONFIG } from "@/config/entities";
import { useCrudPageTitle } from "@/hooks/crud/useCrudPageTitle";
import { useItemSubmit } from "@/hooks/dashboard/mutual-fund/items";
import { useRouter } from "@/navigation";

export default function CreateItemPage() {
  const router = useRouter();

  const { getTitle } = useCrudPageTitle();

  const { submit, isSubmitting } = useItemSubmit();

  return (
    <FormPageLayout
      title={getTitle("create", "rdItem")}
      formSize="small"
      form={
        <ItemForm
          mode="create"
          loading={isSubmitting}
          onSubmit={(payload) =>
            submit({
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
}
