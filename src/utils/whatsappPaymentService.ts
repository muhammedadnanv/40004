import { toast } from "@/hooks/use-toast";

export interface StudentData {
  name: string;
  email: string;
  phone: string;
  program: string;
  duration?: string;
  referralCode?: string;
}

// Send student enrollment data via WhatsApp
export const sendStudentDataViaWhatsApp = (data: StudentData) => {
  const message = `🎓 *NEW STUDENT ENROLLMENT* 🎓%0A%0A` +
                 `👤 *Name:* ${data.name}%0A` +
                 `📧 *Email:* ${data.email}%0A` +
                 `📱 *Phone:* ${data.phone}%0A` +
                 `📚 *Program:* ${data.program}%0A` +
                 `⏱️ *Duration:* ${data.duration || 'Not specified'}%0A` +
                 `🎫 *Referral Code:* ${data.referralCode || 'None'}%0A` +
                 `⏰ *Enrolled At:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}%0A%0A` +
                 `Please follow up with the student for further assistance. 📞`;
  
  const whatsappUrl = `https://wa.me/919656778508?text=${message}`;
  window.open(whatsappUrl, '_blank');
};

// Send payment confirmation via WhatsApp
export const sendPaymentConfirmationViaWhatsApp = (data: StudentData, amount: number, paymentMethod: string = 'UPI') => {
  const message = `💰 *PAYMENT CONFIRMATION* 💰%0A%0A` +
                 `👤 *Student:* ${data.name}%0A` +
                 `📧 *Email:* ${data.email}%0A` +
                 `📱 *Phone:* ${data.phone}%0A` +
                 `💵 *Amount:* ₹${amount}%0A` +
                 `💳 *Payment Method:* ${paymentMethod}%0A` +
                 `📚 *Program:* ${data.program}%0A` +
                 `⏱️ *Duration:* ${data.duration || 'Not specified'}%0A` +
                 `⏰ *Payment Date:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}%0A%0A` +
                 `Payment has been successfully received! ✅`;
  
  const whatsappUrl = `https://wa.me/919656778508?text=${message}`;
  window.open(whatsappUrl, '_blank');
};

// Generate WhatsApp UPI payment link
export const generateWhatsAppUPIPayment = (data: StudentData, amount: number) => {
  // UPI ID for payments (replace with your actual UPI ID)
  const upiId = "devmentorhub@paytm"; // Replace with your actual UPI ID
  
  const paymentMessage = `💰 *PAYMENT REQUEST* 💰%0A%0A` +
                        `Hi ${data.name}! 👋%0A%0A` +
                        `Please complete your payment for *${data.program}*%0A%0A` +
                        `💵 *Amount:* ₹${amount}%0A` +
                        `🏦 *UPI ID:* ${upiId}%0A%0A` +
                        `📱 *Payment Options:*%0A` +
                        `1️⃣ Pay directly using the UPI ID above%0A` +
                        `2️⃣ Use Google Pay, PhonePe, or Paytm%0A` +
                        `3️⃣ Scan QR code (will be provided)%0A%0A` +
                        `After payment, please send the transaction screenshot here.%0A%0A` +
                        `💳 *Payment Details:*%0A` +
                        `📧 Email: ${data.email}%0A` +
                        `📱 Phone: ${data.phone}%0A` +
                        `📚 Program: ${data.program}%0A%0A` +
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
        description: "Check WhatsApp for payment details. Complete payment and send screenshot for confirmation.",
        duration: 8000,
      });
    }, 2000);
    
    // Step 3: Show success message
    toast({
      title: "Enrollment Started! 🎉",
      description: "Your details have been sent to our team via WhatsApp. Payment instructions will follow.",
      duration: 5000,
    });
    
    return true;
  } catch (error) {
    console.error("Error in WhatsApp payment flow:", error);
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
  const upiId = "devmentorhub@paytm"; // Replace with your actual UPI ID
  const transactionNote = `DevMentorHub-${data.name}-${data.program}`;
  
  // Standard UPI payment URL format
  const upiUrl = `upi://pay?pa=${upiId}&pn=Dev Mentor Hub&am=${amount}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;
  
  return upiUrl;
};