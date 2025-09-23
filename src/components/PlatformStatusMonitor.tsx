import React, { useEffect, useState } from 'react';
import { toast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';

interface PlatformStatus {
  isOnline: boolean;
  databaseConnected: boolean;
  emailServiceHealthy: boolean;
  lastChecked: Date;
}

export const PlatformStatusMonitor: React.FC = () => {
  const [status, setStatus] = useState<PlatformStatus>({
    isOnline: navigator.onLine,
    databaseConnected: false,
    emailServiceHealthy: false,
    lastChecked: new Date()
  });

  const checkPlatformHealth = async () => {
    const newStatus = { ...status, lastChecked: new Date() };

    // Check network connection
    newStatus.isOnline = navigator.onLine;

    // Check database connection
    try {
      const { error } = await supabase.from('payments').select('count').limit(1);
      newStatus.databaseConnected = !error || error.code === 'PGRST116';
    } catch (error) {
      newStatus.databaseConnected = false;
    }

    // Check email service health
    try {
      const { data, error } = await supabase.functions.invoke('send-notification', {
        body: { test: true }
      });
      newStatus.emailServiceHealthy = data?.status === 'healthy';
    } catch (error) {
      newStatus.emailServiceHealthy = false;
    }

    // Show notifications for critical issues
    if (!newStatus.isOnline && status.isOnline) {
      toast({
        title: "Connection Lost",
        description: "You appear to be offline. Some features may not work properly.",
        variant: "destructive",
      });
    }

    if (newStatus.isOnline && !status.isOnline) {
      toast({
        title: "Connection Restored",
        description: "You're back online. All features should work normally.",
      });
    }

    if (!newStatus.databaseConnected && status.databaseConnected) {
      toast({
        title: "Database Connection Lost",
        description: "Unable to connect to database. Please refresh the page.",
        variant: "destructive",
      });
    }

    setStatus(newStatus);
  };

  useEffect(() => {
    // Initial check
    checkPlatformHealth();

    // Set up periodic health checks every 30 seconds
    const healthCheckInterval = setInterval(checkPlatformHealth, 30000);

    // Listen for online/offline events
    const handleOnline = () => setStatus(prev => ({ ...prev, isOnline: true }));
    const handleOffline = () => setStatus(prev => ({ ...prev, isOnline: false }));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Listen for visibility change to check when user returns to tab
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkPlatformHealth();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(healthCheckInterval);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // This component doesn't render anything visible
  return null;
};