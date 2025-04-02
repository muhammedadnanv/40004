
// Base referral codes with their respective discounts
const BASE_REFERRAL_CODES: Record<string, number> = {
  'ad4000': 0.5,    // 50% discount for special code
  '40met': 0.1,     // 10% discount
  'you50': 0.1,     // 10% discount
  'me2': 0.1,       // 10% discount
  'lov6': 0.1       // 10% discount
};

// Generate a random 4-character code
const generateRandomCode = (): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length: 4 }, () => 
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join('');
};

// Check if it's December
const isChristmasSeason = (): boolean => {
  const currentMonth = new Date().getMonth();
  return currentMonth === 11; // December is 11 (0-based index)
};

// Generate Christmas-themed or regular messages
const getReferralMessage = (discountPercentage: number): string => {
  if (isChristmasSeason()) {
    return `🎄 Ho Ho Ho! ${(discountPercentage * 100).toFixed(0)}% Christmas discount applied! 🎅`;
  }
  return `${(discountPercentage * 100).toFixed(0)}% discount applied.`;
};

// Generate additional random codes
const generateAdditionalCodes = (count: number): Record<string, number> => {
  const additionalCodes: Record<string, number> = {};
  for (let i = 0; i < count; i++) {
    additionalCodes[generateRandomCode()] = 0.1; // 10% discount for all additional codes
  }
  return additionalCodes;
};

// Combine base codes with additional random codes
export const VALID_REFERRAL_CODES: Record<string, number> = {
  ...BASE_REFERRAL_CODES,
  ...generateAdditionalCodes(5) // Generate 5 additional random codes
};

// Get the current active referral code based on time
export const getCurrentReferralCode = (): string => {
  // Prioritize showing the ad4000 code to increase its visibility
  const shouldShowSpecialCode = Math.random() > 0.5; // 50% chance to show the special code
  if (shouldShowSpecialCode) {
    return 'ad4000';
  }
  
  const codes = Object.keys(VALID_REFERRAL_CODES);
  const minutes = Math.floor(Date.now() / (1000 * 60)); // Get current time in minutes
  const index = minutes % codes.length; // Loop through codes based on current minute
  return codes[index];
};

export const validateReferralCode = (code: string): { isValid: boolean; discountPercentage: number } => {
  return {
    isValid: code in VALID_REFERRAL_CODES,
    discountPercentage: VALID_REFERRAL_CODES[code] || 0
  };
};

// Export the message generator for use in components
export const getReferralSuccessMessage = (discountPercentage: number): string => {
  if (discountPercentage >= 0.5) {
    return `WOW! ${(discountPercentage * 100).toFixed(0)}% MEGA discount applied! 🎉`;
  }
  return getReferralMessage(discountPercentage);
};
