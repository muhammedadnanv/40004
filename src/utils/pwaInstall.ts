// PWA Install utilities
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

declare global {
  interface Window {
    deferredPrompt?: BeforeInstallPromptEvent;
  }
}

export const isPWAInstalled = (): boolean => {
  // Check if running as standalone PWA
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return true;
  }
  
  // Check iOS standalone
  if ((window.navigator as any).standalone === true) {
    return true;
  }
  
  return false;
};

export const canInstallPWA = (): boolean => {
  return !!window.deferredPrompt && !isPWAInstalled();
};

export const installPWA = async (): Promise<boolean> => {
  if (!window.deferredPrompt) {
    console.log('PWA install prompt not available');
    return false;
  }

  try {
    // Show the install prompt
    await window.deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const choiceResult = await window.deferredPrompt.userChoice;
    
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the PWA install prompt');
      window.deferredPrompt = undefined;
      return true;
    } else {
      console.log('User dismissed the PWA install prompt');
      return false;
    }
  } catch (error) {
    console.error('Error during PWA installation:', error);
    return false;
  }
};

export const getInstallInstructions = (): { platform: string; instructions: string } => {
  const userAgent = navigator.userAgent.toLowerCase();
  
  if (/iphone|ipad|ipod/.test(userAgent)) {
    return {
      platform: 'iOS',
      instructions: 'Tap the Share button in Safari, then tap "Add to Home Screen"'
    };
  } else if (/android/.test(userAgent)) {
    return {
      platform: 'Android',
      instructions: 'Tap the menu button and select "Install App" or "Add to Home Screen"'
    };
  } else if (/chrome/.test(userAgent)) {
    return {
      platform: 'Chrome',
      instructions: 'Click the install icon in the address bar or use the menu to install'
    };
  } else if (/edge/.test(userAgent)) {
    return {
      platform: 'Edge',
      instructions: 'Click the install icon in the address bar or use the menu to install'
    };
  } else {
    return {
      platform: 'Browser',
      instructions: 'Look for an install option in your browser menu'
    };
  }
};

// Track PWA install events
export const trackPWAInstall = () => {
  window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    // You can add analytics tracking here
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', 'pwa_install', {
        event_category: 'engagement',
        event_label: 'PWA Installation'
      });
    }
  });
};

// Check for updates
export const checkForUpdates = async () => {
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      await registration.update();
    }
  }
};

// Get network status
export const getNetworkStatus = (): boolean => {
  return navigator.onLine;
};

// Listen to network changes
export const onNetworkChange = (callback: (online: boolean) => void) => {
  window.addEventListener('online', () => callback(true));
  window.addEventListener('offline', () => callback(false));
};
