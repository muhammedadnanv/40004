import { ContentItem } from "@/types/cms";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";

interface CMSSidebarProps {
  items: ContentItem[];
  selectedItem: ContentItem | null;
  onSelectItem: (item: ContentItem | null) => void;
}

export const CMSSidebar = ({ items, selectedItem, onSelectItem }: CMSSidebarProps) => {
  return (
    <div className="w-64 bg-white border-r min-h-screen">
      <div className="p-4 border-b">
        <Button className="w-full" onClick={() => onSelectItem(null)}>
          <Plus className="h-4 w-4 mr-2" />
          New Content
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-5rem)]">
        <div className="p-4 space-y-2">
          {items.map((item) => (
            <Button
              key={item.id}
              variant={selectedItem?.id === item.id ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => onSelectItem(item)}
            >
              {item.title || "Untitled"}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};