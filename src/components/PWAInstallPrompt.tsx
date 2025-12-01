import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Download, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { installPWA, canInstallPWA, getInstallInstructions } from '@/utils/pwaInstall';

export const PWAInstallPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const instructions = getInstallInstructions();

  useEffect(() => {
    // Check if we should show the prompt
    const checkPrompt = () => {
      const dismissed = localStorage.getItem('pwa-install-dismissed');
      const dismissedTime = dismissed ? parseInt(dismissed) : 0;
      const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);
      
      // Show prompt if it can be installed and hasn't been dismissed in the last 7 days
      if (canInstallPWA() && daysSinceDismissed > 7) {
        // Delay showing the prompt for better UX
        setTimeout(() => setShowPrompt(true), 5000);
      }
    };

    checkPrompt();

    // Listen for the beforeinstallprompt event
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      checkPrompt();
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstall = async () => {
    setIsInstalling(true);
    const success = await installPWA();
    
    if (success) {
      setShowPrompt(false);
    }
    setIsInstalling(false);
  };

  const handleDismiss = () => {
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
    setShowPrompt(false);
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 safe-area-bottom"
        >
          <Card className="p-4 shadow-2xl border-2 border-primary/20 bg-background/95 backdrop-blur-lg">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-primary" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg mb-1">
                  Install Dev Mentor Hub
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Get the app experience! Access offline, faster loading, and quick access from your home screen.
                </p>
                
                {instructions.platform !== 'Browser' && (
                  <p className="text-xs text-muted-foreground mb-3 p-2 bg-accent/30 rounded">
                    <strong>{instructions.platform}:</strong> {instructions.instructions}
                  </p>
                )}
                
                <div className="flex gap-2">
                  <Button
                    onClick={handleInstall}
                    disabled={isInstalling}
                    className="flex-1 touch-manipulation"
                    size="sm"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {isInstalling ? 'Installing...' : 'Install'}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleDismiss}
                    size="sm"
                    className="touch-manipulation"
                  >
                    Not now
                  </Button>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDismiss}
                className="flex-shrink-0 touch-manipulation"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
