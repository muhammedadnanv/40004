import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertTriangle, XCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
interface HealthCheck {
  name: string;
  status: 'healthy' | 'warning' | 'error' | 'loading';
  message: string;
  details?: string;
}
export const PlatformHealthCheck: React.FC = () => {
  const [checks, setChecks] = useState<HealthCheck[]>([{
    name: 'Database Connection',
    status: 'loading',
    message: 'Checking...'
  }, {
    name: 'Email Service',
    status: 'loading',
    message: 'Checking...'
  }, {
    name: 'Authentication',
    status: 'loading',
    message: 'Checking...'
  }, {
    name: 'Performance',
    status: 'loading',
    message: 'Checking...'
  }]);
  useEffect(() => {
    const runHealthChecks = async () => {
      const newChecks = [...checks];

      // Database Connection Check
      try {
        const {
          error
        } = await supabase.from('payments').select('count').limit(1);
        if (error && error.code !== 'PGRST116') {
          throw error;
        }
        newChecks[0] = {
          name: 'Database Connection',
          status: 'healthy',
          message: 'Connected to Supabase',
          details: 'Database queries are working properly'
        };
      } catch (error) {
        newChecks[0] = {
          name: 'Database Connection',
          status: 'error',
          message: 'Connection failed',
          details: 'Unable to connect to Supabase database'
        };
      }

      // Email Service Check
      try {
        const { data, error } = await supabase.functions.invoke('send-notification', {
          body: { test: true }
        });
        
        if (data && data.status === 'healthy') {
          newChecks[1] = {
            name: 'Email Service',
            status: 'healthy',
            message: 'Email service operational',
            details: 'Send notification functions are working properly'
          };
        } else if (error && (error.message?.includes('validation') || error.message?.includes('required'))) {
          newChecks[1] = {
            name: 'Email Service',
            status: 'healthy',
            message: 'Email functions available',
            details: 'Send notification and enrollment email functions are deployed'
          };
        } else if (error) {
          newChecks[1] = {
            name: 'Email Service',
            status: 'warning',
            message: 'Email service needs configuration',
            details: 'Functions exist but may need API keys'
          };
        } else {
          newChecks[1] = {
            name: 'Email Service',
            status: 'healthy',
            message: 'Email service operational'
          };
        }
      } catch (error) {
        newChecks[1] = {
          name: 'Email Service',
          status: 'warning',
          message: 'Email service check failed',
          details: 'Unable to verify email service status'
        };
      }

      // Authentication Check
      try {
        const {
          data
        } = await supabase.auth.getSession();
        newChecks[2] = {
          name: 'Authentication',
          status: 'healthy',
          message: data.session ? 'User authenticated' : 'Authentication ready',
          details: 'Supabase Auth is configured and working'
        };
      } catch (error) {
        newChecks[2] = {
          name: 'Authentication',
          status: 'error',
          message: 'Authentication error',
          details: 'Unable to verify authentication status'
        };
      }

      // Performance Check
      const performanceScore = await checkPerformance();
      if (performanceScore >= 80) {
        newChecks[3] = {
          name: 'Performance',
          status: 'healthy',
          message: `Excellent (${performanceScore}/100)`,
          details: 'Platform is performing optimally'
        };
      } else if (performanceScore >= 60) {
        newChecks[3] = {
          name: 'Performance',
          status: 'warning',
          message: `Good (${performanceScore}/100)`,
          details: 'Platform performance is acceptable but could be improved'
        };
      } else {
        newChecks[3] = {
          name: 'Performance',
          status: 'error',
          message: `Poor (${performanceScore}/100)`,
          details: 'Platform performance needs improvement'
        };
      }
      setChecks(newChecks);
    };
    runHealthChecks();
  }, []);
  const checkPerformance = async (): Promise<number> => {
    // Simple performance scoring based on various factors
    let score = 100;

    // Check if service worker is registered
    if (!('serviceWorker' in navigator)) score -= 10;

    // Check connection type
    const connection = (navigator as any).connection;
    if (connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) {
      score -= 20;
    }

    // Check if critical resources are cached
    if (!navigator.onLine) score -= 15;

    // Check memory usage if available
    const performance = (window as any).performance;
    if (performance && performance.memory) {
      const memoryUsage = performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit;
      if (memoryUsage > 0.8) score -= 15;
    }
    return Math.max(0, score);
  };
  const getStatusIcon = (status: HealthCheck['status']) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'loading':
        return <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />;
    }
  };
  const getStatusBadge = (status: HealthCheck['status']) => {
    const variants = {
      healthy: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
      loading: 'bg-gray-100 text-gray-800'
    };
    return <Badge variant="secondary" className={variants[status]}>
        {status === 'loading' ? 'Checking...' : status}
      </Badge>;
  };
  if (process.env.NODE_ENV !== 'development') {
    return null; // Only show in development
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 max-h-96 overflow-auto z-50 bg-background/95 backdrop-blur border shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Platform Health</CardTitle>
        <CardDescription>System status overview</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {checks.map((check, index) => (
          <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
            <div className="flex items-center space-x-3">
              {getStatusIcon(check.status)}
              <div>
                <div className="font-medium text-sm">{check.name}</div>
                <div className="text-xs text-muted-foreground">{check.message}</div>
                {check.details && (
                  <div className="text-xs text-muted-foreground mt-1 opacity-70">
                    {check.details}
                  </div>
                )}
              </div>
            </div>
            {getStatusBadge(check.status)}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
export default PlatformHealthCheck;