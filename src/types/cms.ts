export interface ContentItem {
  id: string;
  title: string;
  content: string;
  type: 'blog' | 'program' | 'faq';
  status: 'draft' | 'published';
  createdAt: Date;
  updatedAt: Date;
}

export interface CMSState {
  items: ContentItem[];
  selectedItem: ContentItem | null;
}