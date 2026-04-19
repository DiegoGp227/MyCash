"use client";

import { useState } from "react";
import ContentCategories from "../Molecules/ContentCategories";
import HeaderCategories from "../Molecules/HeaderCategories";

interface ICategoriesSecctionProps {
  title: string;
  type: "EXPENSE" | "INCOME";
}

export default function CategoriesSecction({
  title,
  type,
}: ICategoriesSecctionProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="flex flex-col w-full p-4 rounded border-2 border-primary-purple bg-gray-bg dark:bg-light-purple-bg gap-5">
      <HeaderCategories
        title={title}
        onNewCategory={() => setIsDrawerOpen(true)}
      />
      <ContentCategories
        type={type}
        isDrawerOpen={isDrawerOpen}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onDrawerClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}
