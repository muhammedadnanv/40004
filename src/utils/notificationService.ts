import { supabase } from "@/integrations/supabase/client";

export const sendNotification = async ({
  to,
  subject,
  message,
  userName,
}: {
  to: string;
  subject: string;
  message: string;
  userName?: string;
}) => {
  try {
    const { data, error } = await supabase.functions.invoke('send-notification', {
      body: {
        to,
        subject,
        message,
        userName,
      },
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error sending notification:', error);
    throw error;
  }
};

// Helper function for common notification types
export const sendWelcomeNotification = async (email: string, name: string) => {
  return sendNotification({
    to: email,
    subject: "Welcome to Dev Mentor Hub! 🎉",
    message: `
      <p>We're excited to have you join our learning community!</p>
      <p>Here's what you can expect:</p>
      <ul style="margin: 20px 0;">
        <li>Personalized mentorship</li>
        <li>Real-world projects</li>
        <li>Community support</li>
        <li>Regular updates on your progress</li>
      </ul>
      <p>Get started by exploring our available programs and joining our WhatsApp community.</p>
    `,
    userName: name,
  });
};

export const sendReminderNotification = async (email: string, name: string, programTitle: string) => {
  return sendNotification({
    to: email,
    subject: "Don't forget your upcoming session! 📚",
    message: `
      <p>This is a friendly reminder about your upcoming session in the ${programTitle} program.</p>
      <p>Make sure to:</p>
      <ul style="margin: 20px 0;">
        <li>Review your previous work</li>
        <li>Prepare any questions you have</li>
        <li>Check your development environment</li>
      </ul>
      <p>We're looking forward to seeing your progress!</p>
    `,
    userName: name,
  });
};

export const sendProgressNotification = async (email: string, name: string, achievement: string) => {
  return sendNotification({
    to: email,
    subject: "Achievement Unlocked! 🌟",
    message: `
      <p>Congratulations on your recent achievement:</p>
      <div style="background: #f3f4f6; padding: 15px; margin: 20px 0; border-radius: 8px;">
        <strong>${achievement}</strong>
      </div>
      <p>Keep up the great work! Remember, consistent practice leads to mastery.</p>
    `,
    userName: name,
  });
};