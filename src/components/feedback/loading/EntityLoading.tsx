import { useTranslations } from "next-intl";
import PageLoading from "./PageLoading";
import { Entity } from "@/config/entities";

interface Props {
  entity: Entity;
}

export default function EntityLoading({ entity }: Props) {
  const tCommon = useTranslations("common.states");
  const tEntities = useTranslations("entities");

  return (
    <PageLoading
      message={tCommon("loadingEntity", {
        entity: tEntities(entity).toLowerCase(),
      })}
    />
  );
}
