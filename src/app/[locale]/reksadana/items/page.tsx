"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ItemsManagementPage() {
  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    id: "",
    name: "",
    category_id: "",
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
      const [itemsRes, categoriesRes] = await Promise.all([
        axios.get("/api/reksadana/items"),
        axios.get("/api/reksadana/categories"),
      ]);

      // flatten items (because API grouped by category)
      const flatItems: any[] = [];
      itemsRes.data.forEach((cat: any) => {
        cat.rd_items.forEach((item: any) => {
          flatItems.push({
            ...item,
            category_id: cat.id,
            category_name: cat.name,
          });
        });
      });

      setItems(flatItems);
      setCategories(categoriesRes.data);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);

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
        setSubmitting(false);
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
      setSubmitting(false);
    }
  };

  const handleEdit = (item: any) => {
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

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Reksa Dana Items</h1>

      {/* FORM */}
      <div className="border p-4 rounded space-y-4">
        <h2 className="font-semibold">
          {isEditing ? "Edit Item" : "Add Item"}
        </h2>

        <input
          placeholder="Item name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 w-full"
        />

        <select
          value={form.category_id}
          onChange={(e) => setForm({ ...form, category_id: e.target.value })}
          className="border p-2 w-full"
        >
          <option value="" className="bg-zinc-100 dark:bg-zinc-800">
            Select Category
          </option>
          {categories.map((c) => (
            <option
              key={c.id}
              value={c.id}
              className="bg-zinc-100 dark:bg-zinc-800"
            >
              {c.name}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            disabled={submitting}
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
            <th className="p-2 text-left">Category</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-2">{item.name}</td>
              <td className="p-2">{item.category_name}</td>
              <td className="p-2 text-center space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
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
