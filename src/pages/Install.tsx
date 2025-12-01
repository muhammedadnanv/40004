import { useState, useEffect } from 'react';
import { MainNav } from '@/components/MainNav';
import { SocialMediaFooter } from '@/components/SocialMediaFooter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Helmet } from 'react-helmet-async';
import { 
  Smartphone, 
  Download, 
  Zap, 
  Wifi, 
  BellRing, 
  Home,
  Check,
  ChevronRight
} from 'lucide-react';
import { installPWA, canInstallPWA, isPWAInstalled, getInstallInstructions } from '@/utils/pwaInstall';
import { ResponsiveSection } from '@/components/layout/ResponsiveSection';

const Install = () => {
  const [canInstall, setCanInstall] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const instructions = getInstallInstructions();

  useEffect(() => {
    setCanInstall(canInstallPWA());
    setIsInstalled(isPWAInstalled());

    const checkInstall = () => {
      setCanInstall(canInstallPWA());
      setIsInstalled(isPWAInstalled());
    };

    window.addEventListener('beforeinstallprompt', checkInstall);
    window.addEventListener('appinstalled', checkInstall);

    return () => {
      window.removeEventListener('beforeinstallprompt', checkInstall);
      window.removeEventListener('appinstalled', checkInstall);
    };
  }, []);

  const handleInstall = async () => {
    setIsInstalling(true);
    await installPWA();
    setIsInstalling(false);
  };

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Instant loading and smooth performance, even on slow connections'
    },
    {
      icon: Wifi,
      title: 'Offline Access',
      description: 'Continue learning and accessing content without an internet connection'
    },
    {
      icon: BellRing,
      title: 'Push Notifications',
      description: 'Get notified about new programs, updates, and important announcements'
    },
    {
      icon: Home,
      title: 'Home Screen Access',
      description: 'Launch directly from your device home screen like a native app'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Install Dev Mentor Hub App | Progressive Web App</title>
        <meta name="description" content="Install Dev Mentor Hub as a Progressive Web App for offline access, faster loading, and an app-like experience on your device." />
        <link rel="canonical" href="https://devmentorhub.com/install" />
      </Helmet>

      <div className="min-h-screen w-full flex flex-col">
        <MainNav />
        
        <main className="flex-1 w-full">
          <ResponsiveSection spacing="lg">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-2xl mb-6">
                <Smartphone className="w-10 h-10 text-primary" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
                Install Dev Mentor Hub
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Get the full app experience with offline access, faster loading, and quick access from your home screen.
              </p>

              {isInstalled ? (
                <Card className="p-6 bg-success/10 border-success/20 max-w-md mx-auto">
                  <div className="flex items-center gap-3 justify-center">
                    <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
                      <Check className="w-6 h-6 text-success" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-success">Already Installed!</h3>
                      <p className="text-sm text-success/80">You're using the app version</p>
                    </div>
                  </div>
                </Card>
              ) : canInstall ? (
                <div className="space-y-4">
                  <Button 
                    onClick={handleInstall} 
                    disabled={isInstalling}
                    size="lg"
                    className="min-h-[56px] px-8 text-lg"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    {isInstalling ? 'Installing...' : 'Install Now'}
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    One click to install • No app store required
                  </p>
                </div>
              ) : (
                <Card className="p-6 max-w-md mx-auto">
                  <h3 className="font-semibold mb-2">Manual Installation</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Follow these steps to install on <strong>{instructions.platform}</strong>:
                  </p>
                  <div className="text-sm bg-accent/30 p-4 rounded-lg text-left">
                    {instructions.instructions}
                  </div>
                </Card>
              )}
            </div>
          </ResponsiveSection>

          <ResponsiveSection spacing="lg" className="bg-accent/5">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Why Install the App?
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                  <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-xl mb-4">
                      <feature.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </ResponsiveSection>

          <ResponsiveSection spacing="lg">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">
                How It Works
              </h2>
              
              <div className="space-y-6">
                {[
                  { step: 1, title: 'Click Install', description: 'Tap the install button above or look for the install icon in your browser' },
                  { step: 2, title: 'Add to Home Screen', description: 'Confirm the installation when prompted by your browser' },
                  { step: 3, title: 'Launch & Enjoy', description: 'Find the Dev Mentor Hub icon on your home screen and start learning!' }
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ResponsiveSection>
        </main>

        <SocialMediaFooter />
      </div>
    </>
  );
};

export default Install;
