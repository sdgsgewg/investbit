import { useEffect, useState } from "react";
import axios from "axios";
import { ItemData } from "../types/reksadana/items/ItemData";
import { UpsertItem } from "../types/reksadana/items/UpsertItem";
import { useTranslations } from "next-intl";

interface UseItemDataReturn {
  items: ItemData[];
  loading: boolean;
  isEditing: boolean;
  buttonText: string;
  isSubmitting: boolean;
  isFormEmpty: boolean;
  form: UpsertItem;
  setForm: React.Dispatch<React.SetStateAction<UpsertItem>>;
  handleSubmit: () => Promise<void>;
  handleEdit: (item: ItemData) => void;
  handleDelete: (id: string) => Promise<void>;
  resetForm: () => void;
}

export const useItemData = (): UseItemDataReturn => {
  const tCommon = useTranslations("Common");

  const [items, setItems] = useState<ItemData[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState<UpsertItem>({
    id: "",
    name: "",
    category_id: "",
  });

  const [buttonText, setButtonText] = useState<string>(tCommon("create"));
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setButtonText(isEditing ? tCommon("update") : tCommon("create"));
  }, [isEditing]);

  useEffect(() => {
    if (isSubmitting) {
      setButtonText(isEditing ? tCommon("updating") : tCommon("creating"));
    } else {
      setButtonText(isEditing ? tCommon("update") : tCommon("create"));
    }
  }, [isSubmitting, isEditing]);

  const fetchData = async () => {
    try {
      const [itemsRes] = await Promise.all([axios.get("/api/reksadana/items")]);

      setItems(itemsRes.data);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  const isFormEmpty = !form.name.trim();

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      if (!form.name) {
        alert("Name is required");
        return;
      }

      if (!form.category_id) {
        alert("Category is required");
        return;
      }

      const payload = [
        {
          id: form.id || undefined,
          name: form.name,
          category_id: form.category_id,
        },
      ];

      if (payload.length === 0) {
        alert("Please fill in the required fields");
        setIsSubmitting(false);
        return;
      }

      if (isEditing) {
        // UPDATE
        await axios.put(`/api/reksadana/items/${form.id}`, payload[0]);

        alert("Item updated");
      } else {
        // CREATE
        await axios.post("/api/reksadana/items", payload);

        alert("Item created");
      }

      resetForm();
      fetchData();
    } catch (error: any) {
      console.error("Save failed", error);

      if (error.response?.data?.error?.includes("exists")) {
        alert("Item name already exists");
      } else {
        alert("Failed to save item");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (item: ItemData) => {
    setForm({
      id: item.id,
      name: item.name,
      category_id: item.category_id,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this item?")) return;

    try {
      await axios.delete(`/api/reksadana/items/${id}`);
      alert("Item successfully deleted");
      fetchData();
    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete item");
    }
  };

  const resetForm = () => {
    setForm({ id: "", name: "", category_id: "" });
    setIsEditing(false);
  };

  return {
    items,
    loading,
    isEditing,
    buttonText,
    isSubmitting,
    isFormEmpty,
    form,
    setForm,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
  };
};
