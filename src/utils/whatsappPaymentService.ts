import { toast } from "@/hooks/use-toast";

export interface StudentData {
  name: string;
  email: string;
  phone: string;
  program: string;
  duration?: string;
  referralCode?: string;
}

// Sanitize input to prevent WhatsApp message injection
const sanitizeInput = (input: string): string => {
  return input
    .replace(/%0A/gi, ' ') // Remove newline injection attempts
    .replace(/%0D/gi, ' ')
    .replace(/[\n\r]/g, ' ') // Remove actual newlines
    .replace(/[*_~`]/g, '') // Remove WhatsApp formatting characters
    .substring(0, 200) // Limit length
    .trim();
};

// Send student enrollment data via WhatsApp
export const sendStudentDataViaWhatsApp = (data: StudentData) => {
  const sanitizedName = sanitizeInput(data.name);
  const sanitizedEmail = sanitizeInput(data.email);
  const sanitizedPhone = sanitizeInput(data.phone);
  const sanitizedProgram = sanitizeInput(data.program);
  const sanitizedDuration = sanitizeInput(data.duration || 'Not specified');
  const sanitizedReferral = sanitizeInput(data.referralCode || 'None');

  const message = `🎓 *NEW STUDENT ENROLLMENT* 🎓%0A%0A` +
                 `👤 *Name:* ${encodeURIComponent(sanitizedName)}%0A` +
                 `📧 *Email:* ${encodeURIComponent(sanitizedEmail)}%0A` +
                 `📱 *Phone:* ${encodeURIComponent(sanitizedPhone)}%0A` +
                 `📚 *Program:* ${encodeURIComponent(sanitizedProgram)}%0A` +
                 `⏱️ *Duration:* ${encodeURIComponent(sanitizedDuration)}%0A` +
                 `🎫 *Referral Code:* ${encodeURIComponent(sanitizedReferral)}%0A` +
                 `⏰ *Enrolled At:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}%0A%0A` +
                 `Please follow up with the student for further assistance. 📞`;
  
  const whatsappUrl = `https://wa.me/919656778508?text=${message}`;
  window.open(whatsappUrl, '_blank');
};

// Send payment confirmation via WhatsApp
export const sendPaymentConfirmationViaWhatsApp = (data: StudentData, amount: number, paymentMethod: string = 'UPI') => {
  const sanitizedName = sanitizeInput(data.name);
  const sanitizedEmail = sanitizeInput(data.email);
  const sanitizedPhone = sanitizeInput(data.phone);
  const sanitizedProgram = sanitizeInput(data.program);
  const sanitizedDuration = sanitizeInput(data.duration || 'Not specified');
  const sanitizedPaymentMethod = sanitizeInput(paymentMethod);

  const message = `💰 *PAYMENT CONFIRMATION* 💰%0A%0A` +
                 `👤 *Student:* ${encodeURIComponent(sanitizedName)}%0A` +
                 `📧 *Email:* ${encodeURIComponent(sanitizedEmail)}%0A` +
                 `📱 *Phone:* ${encodeURIComponent(sanitizedPhone)}%0A` +
                 `💵 *Amount:* ₹${Math.round(amount)}%0A` +
                 `💳 *Payment Method:* ${encodeURIComponent(sanitizedPaymentMethod)}%0A` +
                 `📚 *Program:* ${encodeURIComponent(sanitizedProgram)}%0A` +
                 `⏱️ *Duration:* ${encodeURIComponent(sanitizedDuration)}%0A` +
                 `⏰ *Payment Date:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}%0A%0A` +
                 `Payment has been successfully received! ✅`;
  
  const whatsappUrl = `https://wa.me/919656778508?text=${message}`;
  window.open(whatsappUrl, '_blank');
};

// UPI ID configuration - ideally should come from environment/secrets
const UPI_ID = "devmentorhub@paytm";

// Generate WhatsApp UPI payment link
export const generateWhatsAppUPIPayment = (data: StudentData, amount: number) => {
  const sanitizedName = sanitizeInput(data.name);
  const sanitizedEmail = sanitizeInput(data.email);
  const sanitizedPhone = sanitizeInput(data.phone);
  const sanitizedProgram = sanitizeInput(data.program);
  
  const paymentMessage = `💰 *PAYMENT REQUEST* 💰%0A%0A` +
                        `Hi ${encodeURIComponent(sanitizedName)}! 👋%0A%0A` +
                        `Please complete your payment for *${encodeURIComponent(sanitizedProgram)}*%0A%0A` +
                        `💵 *Amount:* ₹${Math.round(amount)}%0A` +
                        `🏦 *UPI ID:* ${UPI_ID}%0A%0A` +
                        `📱 *Payment Options:*%0A` +
                        `1️⃣ Pay directly using the UPI ID above%0A` +
                        `2️⃣ Use Google Pay, PhonePe, or Paytm%0A` +
                        `3️⃣ Scan QR code (will be provided)%0A%0A` +
                        `After payment, please send the transaction screenshot here.%0A%0A` +
                        `💳 *Payment Details:*%0A` +
                        `📧 Email: ${encodeURIComponent(sanitizedEmail)}%0A` +
                        `📱 Phone: ${encodeURIComponent(sanitizedPhone)}%0A` +
                        `📚 Program: ${encodeURIComponent(sanitizedProgram)}%0A%0A` +
                        `Thank you for choosing Dev Mentor Hub! 🚀`;
  
  return `https://wa.me/919656778508?text=${paymentMessage}`;
};

// Handle the complete payment flow
export const handleWhatsAppUPIPayment = (data: StudentData, amount: number) => {
  try {
    // Step 1: Send student data to WhatsApp
    sendStudentDataViaWhatsApp(data);
    
    // Step 2: Generate payment link and open it
    setTimeout(() => {
      const paymentUrl = generateWhatsAppUPIPayment(data, amount);
      window.open(paymentUrl, '_blank');
      
      toast({
        title: "Payment Instructions Sent! 💰",
        description: "Check WhatsApp for payment details.",
        duration: 8000,
      });
    }, 2000);
    
    // Step 3: Show success message
    toast({
      title: "Enrollment Started! 🎉",
      description: "Your details have been sent to our team via WhatsApp.",
      duration: 5000,
    });
    
    return true;
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to process enrollment. Please try again.",
      variant: "destructive",
    });
    return false;
  }
};

// Alternative: Direct UPI payment link (for mobile apps)
export const generateDirectUPILink = (data: StudentData, amount: number) => {
  const sanitizedName = sanitizeInput(data.name);
  const sanitizedProgram = sanitizeInput(data.program);
  const transactionNote = `DevMentorHub-${sanitizedName}-${sanitizedProgram}`;
  
  // Standard UPI payment URL format
  const upiUrl = `upi://pay?pa=${UPI_ID}&pn=Dev Mentor Hub&am=${Math.round(amount)}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;
  
  return upiUrl;
};