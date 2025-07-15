import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WhatsAppNotificationRequest {
  type: 'student' | 'payment' | 'mentor';
  data: {
    name: string;
    email: string;
    phone?: string;
    program?: string;
    amount?: number;
    paymentId?: string;
    expertise?: string;
    experience?: string;
    [key: string]: any;
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, data }: WhatsAppNotificationRequest = await req.json();

    const twilioAccountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
    const twilioAuthToken = Deno.env.get("TWILIO_AUTH_TOKEN");
    const twilioWhatsAppNumber = Deno.env.get("TWILIO_WHATSAPP_NUMBER") || "whatsapp:+14155238886"; // Twilio Sandbox number
    const targetWhatsAppNumber = "whatsapp:+919656778508";

    if (!twilioAccountSid || !twilioAuthToken) {
      throw new Error("Twilio credentials are not configured");
    }

    // Generate message based on type
    let message = "";
    
    switch (type) {
      case 'student':
        message = `🎓 *NEW STUDENT ENROLLMENT*\n\n` +
                 `👤 Name: ${data.name}\n` +
                 `📧 Email: ${data.email}\n` +
                 `📱 Phone: ${data.phone || 'Not provided'}\n` +
                 `📚 Program: ${data.program || 'Not specified'}\n` +
                 `⏰ Date: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}\n\n` +
                 `Please follow up with the student for further assistance.`;
        break;
        
      case 'payment':
        message = `💰 *PAYMENT RECEIVED*\n\n` +
                 `👤 Student: ${data.name}\n` +
                 `📧 Email: ${data.email}\n` +
                 `💵 Amount: ₹${data.amount}\n` +
                 `🆔 Payment ID: ${data.paymentId}\n` +
                 `📚 Program: ${data.program || 'Not specified'}\n` +
                 `⏰ Date: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}\n\n` +
                 `Payment has been successfully processed.`;
        break;
        
      case 'mentor':
        message = `👨‍🏫 *NEW MENTOR APPLICATION*\n\n` +
                 `👤 Name: ${data.name}\n` +
                 `📧 Email: ${data.email}\n` +
                 `📱 Phone: ${data.phone || 'Not provided'}\n` +
                 `🔧 Expertise: ${data.expertise || 'Not specified'}\n` +
                 `💼 Experience: ${data.experience || 'Not specified'}\n` +
                 `⏰ Date: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}\n\n` +
                 `Please review the mentor application and respond accordingly.`;
        break;
        
      default:
        throw new Error("Invalid notification type");
    }

    // Send WhatsApp message via Twilio
    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`;
    
    const formData = new URLSearchParams();
    formData.append('From', twilioWhatsAppNumber);
    formData.append('To', targetWhatsAppNumber);
    formData.append('Body', message);

    const response = await fetch(twilioUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`${twilioAccountSid}:${twilioAuthToken}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Twilio API error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log("WhatsApp message sent successfully:", result);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "WhatsApp notification sent successfully",
      messageSid: result.sid 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error("Error in send-whatsapp-notification function:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);