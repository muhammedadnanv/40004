import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = "re_BT3XvNue_8meb2SMMiTj1CHpjuPX34np4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  userName: string;
  programTitle: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, userName, programTitle }: EmailRequest = await req.json();

    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #7c3aed;">Welcome to Dev Mentor Hub! 🎉</h1>
        
        <p>Dear ${userName},</p>
        
        <p>Congratulations! Your enrollment in the <strong>${programTitle}</strong> program has been successfully processed.</p>
        
        <h2 style="color: #4a5568;">Next Steps:</h2>
        
        <ol style="line-height: 1.6;">
          <li>Join our WhatsApp community group using this link:
            <a href="https://chat.whatsapp.com/COaTqrI651TKlYTPrHOYDn" style="color: #7c3aed;">
              Click here to join WhatsApp group
            </a>
          </li>
          <li>Install our application using this link:
            <a href="https://app.getworkfolio.com/signup/b7aea460-c1d7-11ef-8205-59bc808ade61" style="color: #7c3aed;">
              Click here to install the application
            </a>
          </li>
        </ol>
        
        <p>If you have any questions, feel free to reach out to our support team.</p>
        
        <p>Best regards,<br>Dev Mentor Hub Team</p>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Dev Mentor Hub <onboarding@resend.dev>",
        to: [to],
        subject: `Welcome to ${programTitle} - Dev Mentor Hub`,
        html: emailContent,
      }),
    });

    if (!res.ok) {
      throw new Error(`Failed to send email: ${await res.text()}`);
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
};

serve(handler);