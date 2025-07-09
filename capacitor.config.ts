import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.f90c9e9619154fe9bfb846b72f740ade',
  appName: 'dev-mentor-hub-39',
  webDir: 'dist',
  server: {
    url: 'https://f90c9e96-1915-4fe9-bfb8-46b72f740ade.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#2E4053",
      showSpinner: false,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "large",
      spinnerColor: "#ffffff",
      splashFullScreen: true,
      splashImmersive: true
    },
    StatusBar: {
      style: "dark",
      backgroundColor: "#2E4053"
    }
  }
};

export default config;