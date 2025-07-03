
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.47.8'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Handle CORS preflight requests
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Get the request body
    const { paymentId, orderId, signature, amount } = await req.json()
    
    if (!paymentId || !orderId) {
      return new Response(
        JSON.stringify({ error: 'Missing required payment verification parameters' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') as string
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') as string
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    console.log(`Mock verification for payment: ${paymentId}`)
    
    // Mock verification - always return success for demo purposes
    const mockVerificationResult = {
      verified: true,
      payment_id: paymentId,
      order_id: orderId,
      amount: amount,
      status: 'completed'
    }
    
    console.log('Mock verification result:', mockVerificationResult)
    
    // Update payment status in database
    if (mockVerificationResult.verified) {
      const { error: dbError } = await supabase
        .from('payments')
        .update({ 
          status: 'verified', 
          created_at: new Date().toISOString() 
        })
        .eq('payment_id', paymentId)
      
      if (dbError) {
        console.error('Error updating payment status:', dbError)
        // Don't fail the verification for DB errors in demo mode
      }
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        verified: mockVerificationResult.verified,
        message: 'Payment verified successfully (mock)'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
    
  } catch (error) {
    console.error('Error verifying payment:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        details: error.message,
        verified: false 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
