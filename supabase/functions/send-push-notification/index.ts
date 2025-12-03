import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NotificationPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  url?: string;
  tag?: string;
  type?: 'programs' | 'announcements' | 'reminders';
}

interface SendNotificationRequest {
  userId?: string;
  type?: 'programs' | 'announcements' | 'reminders';
  payload: NotificationPayload;
  sendToAll?: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { userId, type, payload, sendToAll }: SendNotificationRequest = await req.json();

    if (!payload || !payload.title || !payload.body) {
      return new Response(
        JSON.stringify({ error: 'Missing required payload fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build query for subscriptions
    let query = supabase.from('push_subscriptions').select('*');

    if (userId && !sendToAll) {
      query = query.eq('user_id', userId);
    }

    const { data: subscriptions, error: fetchError } = await query;

    if (fetchError) {
      console.error('Error fetching subscriptions:', fetchError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch subscriptions' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!subscriptions || subscriptions.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No subscriptions found', sent: 0 }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Filter by notification type preferences
    const filteredSubscriptions = subscriptions.filter(sub => {
      if (!type) return true;
      const prefs = sub.preferences as { programs?: boolean; announcements?: boolean; reminders?: boolean } | null;
      if (!prefs) return true;
      return prefs[type] !== false;
    });

    console.log(`Found ${filteredSubscriptions.length} subscribers for notification type: ${type || 'all'}`);

    // Note: Full Web Push implementation requires:
    // 1. VAPID keys (public + private)
    // 2. Web crypto for signing
    // 3. Proper payload encryption
    // 
    // For now, we store the notification data. In production, you'd use a library like web-push
    // or implement the full Web Push protocol.
    
    // Store notification for tracking
    const notificationLog = {
      title: payload.title,
      body: payload.body,
      type: type || 'general',
      sentTo: filteredSubscriptions.length,
      timestamp: new Date().toISOString()
    };
    
    console.log('Notification queued:', notificationLog);

    return new Response(
      JSON.stringify({
        message: 'Notification request processed',
        subscribersFound: filteredSubscriptions.length,
        type: type || 'general',
        note: 'Push notifications require VAPID keys configuration. Currently logging notifications.'
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in send-push-notification function:', errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};

serve(handler);
