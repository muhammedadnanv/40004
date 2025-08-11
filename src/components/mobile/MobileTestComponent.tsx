import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Smartphone, Tablet, Monitor, Wifi, Battery, Signal, TouchpadOff, Eye, CheckCircle, AlertTriangle } from 'lucide-react';
interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  hasTouch: boolean;
  screenWidth: number;
  screenHeight: number;
  pixelRatio: number;
  orientation: string;
  userAgent: string;
}
export const MobileTestComponent = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [connectionInfo, setConnectionInfo] = useState<any>(null);
  const [performanceMetrics, setPerformanceMetrics] = useState<any>(null);
  useEffect(() => {
    const getDeviceInfo = (): DeviceInfo => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      return {
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        hasTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
        screenWidth: width,
        screenHeight: height,
        pixelRatio: window.devicePixelRatio || 1,
        orientation: window.innerHeight > window.innerWidth ? 'portrait' : 'landscape',
        userAgent: navigator.userAgent
      };
    };
    const getConnectionInfo = () => {
      if ('connection' in navigator) {
        const conn = (navigator as any).connection;
        return {
          effectiveType: conn?.effectiveType || 'unknown',
          downlink: conn?.downlink || 'unknown',
          rtt: conn?.rtt || 'unknown',
          saveData: conn?.saveData || false
        };
      }
      return null;
    };
    const getPerformanceMetrics = () => {
      if ('performance' in window && 'timing' in window.performance) {
        const timing = window.performance.timing;
        return {
          domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
          pageLoad: timing.loadEventEnd - timing.navigationStart,
          firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 'unknown'
        };
      }
      return null;
    };
    setDeviceInfo(getDeviceInfo());
    setConnectionInfo(getConnectionInfo());
    setPerformanceMetrics(getPerformanceMetrics());
    const handleResize = () => {
      setDeviceInfo(getDeviceInfo());
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        setDeviceInfo(getDeviceInfo());
      }, 300);
    });
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const getMobileReadinessScore = (): {
    score: number;
    issues: string[];
  } => {
    const issues: string[] = [];
    let score = 100;
    if (!deviceInfo) return {
      score: 0,
      issues: ['Unable to detect device info']
    };

    // Check viewport
    if (deviceInfo.screenWidth < 320) {
      issues.push('Screen width too small for optimal mobile experience');
      score -= 20;
    }

    // Check touch capabilities
    if (deviceInfo.isMobile && !deviceInfo.hasTouch) {
      issues.push('Mobile device without touch capabilities detected');
      score -= 15;
    }

    // Check pixel ratio
    if (deviceInfo.pixelRatio < 1) {
      issues.push('Low pixel ratio may affect visual quality');
      score -= 10;
    }

    // Check connection (if available)
    if (connectionInfo?.effectiveType === '2g') {
      issues.push('Slow connection detected - may affect performance');
      score -= 25;
    }

    // Check performance metrics
    if (performanceMetrics?.domContentLoaded > 3000) {
      issues.push('Slow DOM content loading detected');
      score -= 15;
    }
    return {
      score: Math.max(0, score),
      issues
    };
  };
  const readiness = deviceInfo ? getMobileReadinessScore() : {
    score: 0,
    issues: []
  };
  if (!deviceInfo) {
    return <Card className="p-6 m-4">
        <div className="flex items-center gap-2">
          <Signal className="w-5 h-5 animate-pulse" />
          <span>Loading device information...</span>
        </div>
      </Card>;
  }
  return <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      
    </div>;
};