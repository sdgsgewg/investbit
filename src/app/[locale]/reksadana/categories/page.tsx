"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CategoriesManagementPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    id: "",
    name: "",
  });

  const [buttonText, setButtonText] = useState<string>("Create");
  const [isEditing, setIsEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setButtonText(isEditing ? "Update" : "Create");
  }, [isEditing]);

  useEffect(() => {
    if (submitting) {
      setButtonText(isEditing ? "Updating..." : "Creating...");
    } else {
      setButtonText(isEditing ? "Update" : "Create");
    }
  }, [submitting]);

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
    setSubmitting(true);

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
      setSubmitting(false);
    }
  };

  const handleEdit = (item: any) => {
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

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Reksa Dana Categories</h1>

      {/* FORM */}
      <div className="border p-4 rounded space-y-4">
        <h2 className="font-semibold">
          {isEditing ? "Edit Category" : "Add Category"}
        </h2>

        <input
          placeholder="Category name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 w-full"
        />

        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            disabled={submitting || isFormEmpty}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition disabled:opacity-50"
          >
            {buttonText}
          </button>

          {isEditing && (
            <button
              onClick={resetForm}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* TABLE */}
      <table className="w-full border">
        <thead className="bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
          <tr>
            <th className="p-2 text-left">Name</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="border-t">
              <td className="p-2">{category.name}</td>
              <td className="p-2 text-center space-x-2">
                <button
                  onClick={() => handleEdit(category)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
