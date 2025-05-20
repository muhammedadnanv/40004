
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
    
    if (!paymentId || !orderId || !signature) {
      return new Response(
        JSON.stringify({ error: 'Missing required payment verification parameters' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') as string
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') as string
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Get the full API key from environment variables for secure verification
    const dodoApiKey = Deno.env.get('DODO_PAYMENT_SECRET_KEY')
    const publicPart = Deno.env.get('DODO_PAYMENT_PUBLIC_KEY')
    
    if (!dodoApiKey || !publicPart) {
      console.error('Missing Dodo API credentials')
      return new Response(
        JSON.stringify({ error: 'Payment configuration error' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }
    
    // Create the full API key for verification
    const fullApiKey = `${publicPart}.${dodoApiKey}`

    // Construct the verification request to Dodo Payment API
    const verificationUrl = 'https://api.dodopayments.com/v1/payments/verify'
    
    console.log(`Verifying payment: ${paymentId}`)
    
    const verificationResponse = await fetch(verificationUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${fullApiKey}`
      },
      body: JSON.stringify({
        payment_id: paymentId,
        order_id: orderId,
        signature: signature,
        amount: amount
      })
    })
    
    const verificationData = await verificationResponse.json()
    
    // Log the response for debugging
    console.log('Verification response:', JSON.stringify(verificationData))
    
    if (!verificationResponse.ok) {
      return new Response(
        JSON.stringify({ 
          error: 'Payment verification failed', 
          details: verificationData 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }
    
    // Store the verified payment in the database
    if (verificationData.verified) {
      const { error: dbError } = await supabase
        .from('payments')
        .update({ status: 'verified', verified_at: new Date().toISOString() })
        .eq('payment_id', paymentId)
      
      if (dbError) {
        console.error('Error updating payment status:', dbError)
      }
    }
    
    return new Response(
      JSON.stringify({ success: true, verified: verificationData.verified }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
    
  } catch (error) {
    console.error('Error verifying payment:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
