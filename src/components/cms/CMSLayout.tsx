import { useState } from "react";
import { ContentItem } from "@/types/cms";
import { CMSNavigation } from "./CMSNavigation";
import { CMSContent } from "./CMSContent";
import { CMSSidebar } from "./CMSSidebar";

export const CMSLayout = () => {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);

  const handleCreateItem = (item: Omit<ContentItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newItem: ContentItem = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setItems([...items, newItem]);
  };

  const handleUpdateItem = (updatedItem: ContentItem) => {
    setItems(items.map(item => 
      item.id === updatedItem.id 
        ? { ...updatedItem, updatedAt: new Date() }
        : item
    ));
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <CMSNavigation />
      <div className="flex">
        <CMSSidebar 
          items={items}
          onSelectItem={setSelectedItem}
          selectedItem={selectedItem}
        />
        <CMSContent
          selectedItem={selectedItem}
          onCreateItem={handleCreateItem}
          onUpdateItem={handleUpdateItem}
          onDeleteItem={handleDeleteItem}
        />
      </div>
    </div>
  );
};