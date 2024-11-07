export const generateAndDownloadPDF = () => {
  const content = `
    Dev Mentor Hub - Premium Course Preview
    =====================================

    🎉 Congratulations on Taking Your First Step! 🎉

    Dear Future Developer,

    Thank you for showing interest in our premium course materials. This preview package includes:

    📚 Course Overview:
    ------------------
    1. Introduction to Modern Web Development
    2. AI Integration Fundamentals
    3. Practical Project Examples
    4. Industry Best Practices

    🎯 What You'll Learn:
    -------------------
    • Frontend Development with React
    • AI Integration Techniques
    • Modern UI/UX Principles
    • Professional Development Workflows

    🛠️ Tools & Technologies:
    ----------------------
    • React & Next.js
    • AI APIs & Integration
    • Modern CSS & Tailwind
    • Version Control & Git

    📱 Access Your Materials:
    ----------------------
    Visit our resource center: https://drive.google.com/drive/folders/1aee-AT9y5P6Ldd-xZISMA6YvuincC0OL?usp=sharing

    💡 Next Steps:
    ------------
    1. Join our WhatsApp community
    2. Schedule your first mentorship session
    3. Start your learning journey

    Questions? Contact us at:
    • Email: support@devmentorhub.com
    • WhatsApp: +91 XXXXXXXXXX

    © ${new Date().getFullYear()} Dev Mentor Hub
    All rights reserved.
  `;

  // Create a Blob with the content
  const blob = new Blob([content], { type: 'text/plain' });
  
  // Create a download link
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'dev-mentor-hub-premium-preview.txt';
  
  // Trigger the download
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};