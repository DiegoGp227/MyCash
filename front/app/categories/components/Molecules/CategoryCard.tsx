"use client";

import { useState } from "react";
import ContentCard from "./ContentCard";
import HeaderCard from "./HeaderCard";
import CategoryDrawer from "./CategoryDrawer";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import CategoryDetailsModal from "./CategoryDetailsModal";
import type { ICategory, IUpdateCategory } from "@/src/categories/types/categories.types";
import type { CategoryFormInput } from "@/src/categories/schemas/category.schema";

interface ICategoryCardProps {
  category: ICategory;
  onEdit: (categoryId: string, data: IUpdateCategory) => Promise<void>;
  onDelete: (categoryId: string) => Promise<void>;
}

export default function CategoryCard({
  category,
  onEdit,
  onDelete,
}: ICategoryCardProps) {
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = async (data: CategoryFormInput) => {
    setIsUpdating(true);
    try {
      await onEdit(category.id, {
        name: data.name,
        color: data.color,
        icon: data.icon,
      });
      setIsEditDrawerOpen(false);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(category.id);
      setIsDeleteModalOpen(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="w-80 p-4 border-2 border-gray-300 bg-white rounded dark:bg-light-purple-bg dark:border-primary-purple">
      <HeaderCard
        titleCategory={category.name}
        subCategoriesNumber={category.subcategoriesCount}
        color={category.color}
        icon={category.icon}
      />
      <ContentCard
        onEdit={() => setIsEditDrawerOpen(true)}
        onView={() => setIsViewModalOpen(true)}
        onDelete={() => setIsDeleteModalOpen(true)}
      />

      <CategoryDrawer
        isOpen={isEditDrawerOpen}
        onClose={() => setIsEditDrawerOpen(false)}
        onSubmit={handleEdit}
        mode="edit"
        type={category.type}
        defaultValues={{
          name: category.name,
          color: category.color,
          icon: category.icon,
        }}
        isLoading={isUpdating}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        categoryName={category.name}
        isDeleting={isDeleting}
      />

      <CategoryDetailsModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        category={category}
      />
    </div>
  );
}
