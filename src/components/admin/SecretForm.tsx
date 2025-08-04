import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle } from "lucide-react";

interface SecretFormProps {
  isOpen: boolean;
  onClose: () => void;
  secretName: string;
  description: string;
}

export const SecretForm = ({ isOpen, onClose, secretName, description }: SecretFormProps) => {
  const [secretValue, setSecretValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real implementation, this would securely submit to Supabase secrets
      // For now, we'll just show a message to the user
      toast({
        title: "Secret Configuration Required",
        description: `Please configure the ${secretName} secret in your Supabase dashboard under Project Settings > Edge Functions > Secrets`,
        variant: "default",
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to configure secret. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Secret Configuration Required
          </DialogTitle>
          <DialogDescription>
            The {secretName} secret needs to be configured for this feature to work properly.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">
              {description}
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="secret-value">{secretName}</Label>
              <Input
                id="secret-value"
                type="password"
                value={secretValue}
                onChange={(e) => setSecretValue(e.target.value)}
                placeholder="Enter your API key..."
                required
              />
            </div>
            
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting || !secretValue} className="flex-1">
                {isSubmitting ? "Configuring..." : "Configure"}
              </Button>
            </div>
          </form>
          
          <div className="text-xs text-gray-600">
            <p className="font-medium mb-1">Manual Setup Instructions:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Go to your Supabase Dashboard</li>
              <li>Navigate to Project Settings → Edge Functions</li>
              <li>Add a new secret named "{secretName}"</li>
              <li>Paste your API key as the value</li>
            </ol>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};