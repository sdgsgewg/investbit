import { useTranslations } from "next-intl";
import { Entity } from "@/config/entities";
import PageNotFound from "./PageNotFound";

interface Props {
  entity: Entity;
}

export default function EntityNotFound({ entity }: Props) {
  const tCommon = useTranslations("common.states");
  const tEntities = useTranslations("entities");

  return (
    <PageNotFound
      message={tCommon("notFoundEntity", {
        entity: tEntities(entity),
      })}
    />
  );
}
