import { ActionRowProps, DataRow } from "@/types/table";
import { Edit2, Trash2, View } from "lucide-react";
import { useTranslations } from "next-intl";

export function ActionRow<T extends DataRow>({
  item,
  onView,
  onEdit,
  onDelete,
}: ActionRowProps<T>) {
  const tCommonActions = useTranslations("common.actions");

  return (
    <>
      {onView && (
        <button
          onClick={() => onView(item)}
          className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
          title={tCommonActions("view")}
        >
          <View className="w-4 h-4" />
        </button>
      )}

      {onEdit && (
        <button
          onClick={() => onEdit(item)}
          className="p-2 text-yellow-500 hover:bg-yellow-500/10 rounded-lg transition-colors"
          title={tCommonActions("edit")}
        >
          <Edit2 className="w-4 h-4" />
        </button>
      )}

      {onDelete && (
        <button
          onClick={() => onDelete(item)}
          className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
          title={tCommonActions("delete")}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </>
  );
}
