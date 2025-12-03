import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Bell, BellOff, BellRing, Sparkles, Megaphone, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  isPushSupported,
  getNotificationPermission,
  subscribeToPush,
  unsubscribeFromPush,
  getCurrentSubscription,
  updateNotificationPreferences,
  getStoredPreferences,
  NotificationPreferences,
  showLocalNotification
} from '@/utils/pushNotifications';

const NotificationSettings = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    programs: true,
    announcements: true,
    reminders: true
  });

  useEffect(() => {
    const checkStatus = async () => {
      setIsSupported(isPushSupported());
      setPermission(getNotificationPermission());
      
      const subscription = await getCurrentSubscription();
      setIsSubscribed(!!subscription);
      
      if (subscription) {
        const storedPrefs = await getStoredPreferences();
        if (storedPrefs) {
          setPreferences(storedPrefs);
        }
      }
    };

    checkStatus();
  }, []);

  const handleSubscribe = async () => {
    setIsLoading(true);
    try {
      const success = await subscribeToPush(preferences);
      if (success) {
        setIsSubscribed(true);
        setPermission('granted');
        toast({
          title: 'Notifications enabled',
          description: 'You will now receive updates about programs and announcements.'
        });
        
        // Show a welcome notification
        await showLocalNotification('Welcome to Dev Mentor Hub!', {
          body: 'You\'ll now receive updates about new programs and announcements.',
          tag: 'welcome'
        });
      } else {
        toast({
          title: 'Could not enable notifications',
          description: 'Please check your browser settings and try again.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Subscribe error:', error);
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive'
      });
    }
    setIsLoading(false);
  };

  const handleUnsubscribe = async () => {
    setIsLoading(true);
    try {
      const success = await unsubscribeFromPush();
      if (success) {
        setIsSubscribed(false);
        toast({
          title: 'Notifications disabled',
          description: 'You will no longer receive push notifications.'
        });
      }
    } catch (error) {
      console.error('Unsubscribe error:', error);
    }
    setIsLoading(false);
  };

  const handlePreferenceChange = async (key: keyof NotificationPreferences) => {
    const newPrefs = { ...preferences, [key]: !preferences[key] };
    setPreferences(newPrefs);
    
    if (isSubscribed) {
      const success = await updateNotificationPreferences(newPrefs);
      if (success) {
        toast({
          title: 'Preferences updated',
          description: 'Your notification preferences have been saved.'
        });
      }
    }
  };

  if (!isSupported) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-3 text-muted-foreground">
          <BellOff className="w-5 h-5" />
          <p>Push notifications are not supported in your browser.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Push Notifications</h3>
              <p className="text-sm text-muted-foreground">
                {isSubscribed ? 'Notifications are enabled' : 'Get updates about programs and announcements'}
              </p>
            </div>
          </div>
          
          <Button
            onClick={isSubscribed ? handleUnsubscribe : handleSubscribe}
            variant={isSubscribed ? 'outline' : 'default'}
            disabled={isLoading}
          >
            {isLoading ? 'Please wait...' : isSubscribed ? 'Disable' : 'Enable'}
          </Button>
        </div>

        {isSubscribed && (
          <div className="border-t pt-6 space-y-4">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
              Notification Types
            </h4>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <div>
                    <Label htmlFor="programs" className="font-medium">New Programs</Label>
                    <p className="text-sm text-muted-foreground">Updates about new courses and programs</p>
                  </div>
                </div>
                <Switch
                  id="programs"
                  checked={preferences.programs}
                  onCheckedChange={() => handlePreferenceChange('programs')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Megaphone className="w-5 h-5 text-primary" />
                  <div>
                    <Label htmlFor="announcements" className="font-medium">Announcements</Label>
                    <p className="text-sm text-muted-foreground">Important platform updates and news</p>
                  </div>
                </div>
                <Switch
                  id="announcements"
                  checked={preferences.announcements}
                  onCheckedChange={() => handlePreferenceChange('announcements')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <Label htmlFor="reminders" className="font-medium">Reminders</Label>
                    <p className="text-sm text-muted-foreground">Personalized learning reminders</p>
                  </div>
                </div>
                <Switch
                  id="reminders"
                  checked={preferences.reminders}
                  onCheckedChange={() => handlePreferenceChange('reminders')}
                />
              </div>
            </div>
          </div>
        )}

        {permission === 'denied' && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg text-sm">
            <p className="font-medium">Notifications are blocked</p>
            <p>Please enable notifications in your browser settings to receive updates.</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default NotificationSettings;
