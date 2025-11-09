import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code } = await req.json();

    if (!code || typeof code !== 'string') {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid unlock code format' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Query the unlock_codes table
    const { data: unlockCode, error } = await supabase
      .from('unlock_codes')
      .select('*')
      .eq('code', code)
      .eq('is_active', true)
      .single();

    if (error || !unlockCode) {
      console.log('Unlock code not found or inactive:', code);
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid or expired unlock code' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 403 }
      );
    }

    // Check if code has expired
    if (unlockCode.expires_at && new Date(unlockCode.expires_at) < new Date()) {
      console.log('Unlock code expired:', code);
      return new Response(
        JSON.stringify({ success: false, error: 'Unlock code has expired' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 403 }
      );
    }

    // Mark code as used if it hasn't been used yet
    if (!unlockCode.used_at) {
      await supabase
        .from('unlock_codes')
        .update({ used_at: new Date().toISOString() })
        .eq('id', unlockCode.id);
    }

    console.log('Unlock code validated successfully');
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        projectAccess: unlockCode.project_access,
        message: 'Access granted'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );

  } catch (error) {
    console.error('Error verifying unlock code:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});