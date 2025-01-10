import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";
import {
  Bell,
  Download,
  Share2,
  Heart,
  Bookmark,
  ThumbsUp,
  MessageCircle,
  Copy,
  Send,
  RefreshCw,
  Filter,
  Search,
  Settings,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Save,
  Upload,
  Trash
} from "lucide-react";

export const InteractiveElementsSection = () => {
  const [likes, setLikes] = useState<{ [key: string]: boolean }>({});
  const [bookmarks, setBookmarks] = useState<{ [key: string]: boolean }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Workflow 1: Like functionality
  const handleLike = (id: string) => {
    setLikes(prev => ({ ...prev, [id]: !prev[id] }));
    toast({
      title: likes[id] ? "Removed like" : "Added like",
      description: "Your preference has been saved",
    });
  };

  // Workflow 2: Bookmark functionality
  const handleBookmark = (id: string) => {
    setBookmarks(prev => ({ ...prev, [id]: !prev[id] }));
    toast({
      title: bookmarks[id] ? "Removed from bookmarks" : "Added to bookmarks",
      description: "Your bookmarks have been updated",
    });
  };

  // Workflow 3: Share functionality
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Dev Mentor Hub',
        text: 'Check out this awesome mentorship platform!',
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Share link has been copied to clipboard",
      });
    }
  };

  // Workflow 4: Search functionality
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate search
    setTimeout(() => {
      toast({
        title: "Search completed",
        description: `Found results for: ${searchQuery}`,
      });
      setIsLoading(false);
    }, 1000);
  };

  // Workflow 5: Download simulation
  const handleDownload = () => {
    setIsLoading(true);
    setTimeout(() => {
      toast({
        title: "Download started",
        description: "Your file will be ready soon",
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="container mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-light text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800"
        >
          Interactive Elements
        </motion.h2>

        <ScrollArea className="h-[600px] rounded-lg border p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Group 1: Social Interactions */}
            <Card className="p-4 space-y-4">
              <h3 className="text-lg font-medium">Social Interactions</h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleLike('1')}
                  className={likes['1'] ? 'text-red-500' : ''}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Like
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBookmark('1')}
                  className={bookmarks['1'] ? 'text-blue-500' : ''}
                >
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </Card>

            {/* Group 2: Content Actions */}
            <Card className="p-4 space-y-4">
              <h3 className="text-lg font-medium">Content Actions</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button variant="outline" size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Comment
                </Button>
              </div>
            </Card>

            {/* Group 3: Search and Filter */}
            <Card className="p-4 space-y-4">
              <h3 className="text-lg font-medium">Search and Filter</h3>
              <form onSubmit={handleSearch} className="flex gap-2">
                <Input
                  type="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="sm" disabled={isLoading}>
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </form>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </Card>

            {/* Group 4: User Actions */}
            <Card className="p-4 space-y-4">
              <h3 className="text-lg font-medium">User Actions</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
                <Button variant="outline" size="sm">
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </Button>
              </div>
            </Card>

            {/* Group 5: Form Elements */}
            <Card className="p-4 space-y-4">
              <h3 className="text-lg font-medium">Form Elements</h3>
              <div className="space-y-2">
                <Input placeholder="Username" icon={<User className="w-4 h-4" />} />
                <Input placeholder="Email" icon={<Mail className="w-4 h-4" />} />
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    icon={<Lock className="w-4 h-4" />}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </Card>

            {/* Group 6: File Operations */}
            <Card className="p-4 space-y-4">
              <h3 className="text-lg font-medium">File Operations</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
                <Button variant="outline" size="sm">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" size="sm">
                  <Trash className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </Card>
          </div>
        </ScrollArea>
      </div>
    </section>
  );
};