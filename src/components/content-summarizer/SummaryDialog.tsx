
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { generateAndDownloadPDF } from "@/utils/generatePDF";

interface SummaryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  summary: string;
}

export const SummaryDialog = ({
  isOpen,
  onClose,
  summary
}: SummaryDialogProps) => {
  const handleDownload = () => {
    generateAndDownloadPDF();
    toast({
      title: "Summary Downloaded",
      description: "Your summarized content has been downloaded as a text file.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Summarized Content</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Textarea 
            value={summary} 
            readOnly 
            rows={15} 
            className="font-mono text-sm whitespace-pre-wrap"
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={handleDownload} variant="outline">
            Download Summary
          </Button>
          <Button onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
