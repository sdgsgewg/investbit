import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

interface Props {
  onCreate: () => void;
  loading?: boolean;
}

const CrudPageManagement = ({ onCreate, loading = false }: Props) => {
  const tCommonActions = useTranslations("common.actions");

  return (
    <div>
      {/* Create Button */}
      <Button
        variant="default"
        size="lg"
        onClick={onCreate}
        disabled={loading}
        className="flex-1"
      >
        <PlusCircle className="w-4 h-4" />
        {tCommonActions("add")}
      </Button>

      {/* Search and Filter */}
    </div>
  );
};

export default CrudPageManagement;
