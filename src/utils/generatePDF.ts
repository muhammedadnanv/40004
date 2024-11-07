export const generateAndDownloadPDF = () => {
  // Create a simple text content for the PDF
  const content = `
    Dev Mentor Hub - Special Offer
    ============================
    
    Congratulations! You've received our special course material preview.
    This document gives you access to exclusive content and resources.
    
    Thank you for using the coupon code!
    
    Visit our website: https://devmentorhub.com
  `;

  // Create a Blob with the content
  const blob = new Blob([content], { type: 'text/plain' });
  
  // Create a download link
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'dev-mentor-hub-preview.txt';
  
  // Trigger the download
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};