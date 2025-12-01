import { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { WifiOff, Wifi } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getNetworkStatus, onNetworkChange } from '@/utils/pwaInstall';

export const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(getNetworkStatus());
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    const handleNetworkChange = (online: boolean) => {
      setIsOnline(online);
      
      if (online) {
        setShowReconnected(true);
        setTimeout(() => setShowReconnected(false), 3000);
      }
    };

    onNetworkChange(handleNetworkChange);
  }, []);

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          className="fixed top-0 left-0 right-0 z-50 safe-area-top"
        >
          <Alert variant="destructive" className="rounded-none border-0 border-b">
            <WifiOff className="h-4 w-4" />
            <AlertDescription>
              You're offline. Some features may be limited.
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
      
      {showReconnected && isOnline && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          className="fixed top-0 left-0 right-0 z-50 safe-area-top"
        >
          <Alert className="rounded-none border-0 border-b bg-success text-success-foreground">
            <Wifi className="h-4 w-4" />
            <AlertDescription>
              You're back online!
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
