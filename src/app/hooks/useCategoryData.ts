import { useEffect, useState } from "react";
import { CategoryData } from "../types/reksadana/categories/CategoryData";
import { UpsertCategory } from "../types/reksadana/categories/UpsertCategory";
import axios from "axios";

interface UseCategoryDataReturn {
  categories: CategoryData[];
  loading: boolean;
  isEditing: boolean;
  buttonText: string;
  isSubmitting: boolean;
  isFormEmpty: boolean;
  form: UpsertCategory;
  setForm: React.Dispatch<React.SetStateAction<UpsertCategory>>;
  handleSubmit: () => Promise<void>;
  handleEdit: (item: CategoryData) => void;
  handleDelete: (id: string) => Promise<void>;
  resetForm: () => void;
}

export const useCategoryData = (): UseCategoryDataReturn => {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState<UpsertCategory>({
    id: "",
    name: "",
  });

  const [buttonText, setButtonText] = useState<string>("Create");
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setButtonText(isEditing ? "Update" : "Create");
  }, [isEditing]);

  useEffect(() => {
    if (isSubmitting) {
      setButtonText(isEditing ? "Updating..." : "Creating...");
    } else {
      setButtonText(isEditing ? "Update" : "Create");
    }
  }, [isSubmitting]);

  const fetchData = async () => {
    try {
      const [categoriesRes] = await Promise.all([
        axios.get("/api/reksadana/categories"),
      ]);

      setCategories(categoriesRes.data);
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

      if (isEditing) {
        // UPDATE
        await axios.put(`/api/reksadana/categories/${form.id}`, {
          name: form.name,
        });

        alert("Category updated");
      } else {
        // CREATE
        await axios.post("/api/reksadana/categories", [
          {
            name: form.name,
          },
        ]);

        alert("Category created");
      }

      resetForm();
      fetchData();
    } catch (error: any) {
      console.error("Save failed", error);

      if (error.response?.data?.error?.includes("exists")) {
        alert("Category name already exists");
      } else {
        alert("Failed to save category");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (item: CategoryData) => {
    setForm({
      id: item.id,
      name: item.name,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category?")) return;

    try {
      await axios.delete(`/api/reksadana/categories/${id}`);
      alert("Category successfully deleted");
      fetchData();
    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete category");
    }
  };

  const resetForm = () => {
    setForm({ id: "", name: "" });
    setIsEditing(false);
  };

  return {
    categories,
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
