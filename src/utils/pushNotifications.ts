import { supabase } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';

// VAPID public key - in production, this should be generated and the private key stored securely
const VAPID_PUBLIC_KEY = 'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U';

export interface NotificationPreferences {
  programs: boolean;
  announcements: boolean;
  reminders: boolean;
}

export interface PushSubscriptionData {
  endpoint: string;
  p256dh: string;
  auth: string;
  preferences?: NotificationPreferences;
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export const isPushSupported = (): boolean => {
  return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
};

export const getNotificationPermission = (): NotificationPermission => {
  if (!isPushSupported()) return 'denied';
  return Notification.permission;
};

export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  if (!isPushSupported()) {
    console.error('Push notifications are not supported');
    return 'denied';
  }

  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return 'denied';
  }
};

export const subscribeToPush = async (preferences?: NotificationPreferences): Promise<boolean> => {
  if (!isPushSupported()) {
    console.error('Push notifications are not supported');
    return false;
  }

  try {
    const permission = await requestNotificationPermission();
    if (permission !== 'granted') {
      console.log('Notification permission denied');
      return false;
    }

    const registration = await navigator.serviceWorker.ready;
    
    // Check for existing subscription
    let subscription = await registration.pushManager.getSubscription();
    
    if (!subscription) {
      // Create new subscription
      const applicationServerKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey.buffer as ArrayBuffer
      });
    }

    const subscriptionJson = subscription.toJSON();
    
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    const prefsJson: Json = preferences 
      ? { programs: preferences.programs, announcements: preferences.announcements, reminders: preferences.reminders }
      : { programs: true, announcements: true, reminders: true };
    
    // Save subscription to database
    const { error } = await supabase
      .from('push_subscriptions')
      .upsert({
        user_id: user?.id || null,
        endpoint: subscriptionJson.endpoint!,
        p256dh: subscriptionJson.keys!.p256dh,
        auth: subscriptionJson.keys!.auth,
        preferences: prefsJson
      }, {
        onConflict: 'endpoint'
      });

    if (error) {
      console.error('Error saving subscription:', error);
      return false;
    }

    console.log('Push subscription saved successfully');
    return true;
  } catch (error) {
    console.error('Error subscribing to push:', error);
    return false;
  }
};

export const unsubscribeFromPush = async (): Promise<boolean> => {
  if (!isPushSupported()) return false;

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      // Remove from database
      await supabase
        .from('push_subscriptions')
        .delete()
        .eq('endpoint', subscription.endpoint);

      // Unsubscribe from push
      await subscription.unsubscribe();
    }

    return true;
  } catch (error) {
    console.error('Error unsubscribing from push:', error);
    return false;
  }
};

export const getCurrentSubscription = async (): Promise<PushSubscription | null> => {
  if (!isPushSupported()) return null;

  try {
    const registration = await navigator.serviceWorker.ready;
    return await registration.pushManager.getSubscription();
  } catch (error) {
    console.error('Error getting subscription:', error);
    return null;
  }
};

export const updateNotificationPreferences = async (
  preferences: NotificationPreferences
): Promise<boolean> => {
  try {
    const subscription = await getCurrentSubscription();
    if (!subscription) return false;

    const prefsJson: Json = { 
      programs: preferences.programs, 
      announcements: preferences.announcements, 
      reminders: preferences.reminders 
    };

    const { error } = await supabase
      .from('push_subscriptions')
      .update({ preferences: prefsJson })
      .eq('endpoint', subscription.endpoint);

    if (error) {
      console.error('Error updating preferences:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error updating preferences:', error);
    return false;
  }
};

export const getStoredPreferences = async (): Promise<NotificationPreferences | null> => {
  try {
    const subscription = await getCurrentSubscription();
    if (!subscription) return null;

    const { data, error } = await supabase
      .from('push_subscriptions')
      .select('preferences')
      .eq('endpoint', subscription.endpoint)
      .single();

    if (error || !data || !data.preferences) return null;
    
    const prefs = data.preferences as Record<string, unknown>;
    return {
      programs: Boolean(prefs.programs ?? true),
      announcements: Boolean(prefs.announcements ?? true),
      reminders: Boolean(prefs.reminders ?? true)
    };
  } catch (error) {
    console.error('Error getting stored preferences:', error);
    return null;
  }
};

// Show a local notification (for testing or immediate feedback)
export const showLocalNotification = async (
  title: string,
  options?: { body?: string; tag?: string; icon?: string; badge?: string }
): Promise<void> => {
  if (!isPushSupported() || Notification.permission !== 'granted') return;

  const registration = await navigator.serviceWorker.ready;
  await registration.showNotification(title, {
    icon: options?.icon || '/logo.png',
    badge: options?.badge || '/logo.png',
    body: options?.body,
    tag: options?.tag
  });
};
