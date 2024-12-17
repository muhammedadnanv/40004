import { useState } from "react";
import { ContentItem } from "@/types/cms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

interface CMSContentProps {
  selectedItem: ContentItem | null;
  onCreateItem: (item: Omit<ContentItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdateItem: (item: ContentItem) => void;
  onDeleteItem: (id: string) => void;
}

export const CMSContent = ({
  selectedItem,
  onCreateItem,
  onUpdateItem,
  onDeleteItem,
}: CMSContentProps) => {
  const [formData, setFormData] = useState<Partial<ContentItem>>(
    selectedItem || {
      title: "",
      content: "",
      type: "blog",
      status: "draft",
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.type || !formData.status) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (selectedItem) {
      onUpdateItem({ ...selectedItem, ...formData });
      toast({
        title: "Success",
        description: "Content updated successfully",
      });
    } else {
      onCreateItem(formData as Omit<ContentItem, 'id' | 'createdAt' | 'updatedAt'>);
      toast({
        title: "Success",
        description: "Content created successfully",
      });
    }
  };

  return (
    <div className="flex-1 p-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {selectedItem ? "Edit Content" : "Create New Content"}
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                value={formData.title || ""}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter title"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Content</label>
              <Textarea
                value={formData.content || ""}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                placeholder="Enter content"
                rows={10}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, type: value as ContentItem["type"] })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blog">Blog</SelectItem>
                    <SelectItem value="program">Program</SelectItem>
                    <SelectItem value="faq">FAQ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value as ContentItem["status"] })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            {selectedItem && (
              <Button
                type="button"
                variant="destructive"
                onClick={() => {
                  onDeleteItem(selectedItem.id);
                  toast({
                    title: "Success",
                    description: "Content deleted successfully",
                  });
                }}
              >
                Delete
              </Button>
            )}
            <div className="flex space-x-2">
              <Button type="submit">
                {selectedItem ? "Update" : "Create"}
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};