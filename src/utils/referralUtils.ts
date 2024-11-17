// Base referral codes with 0.1% discount
const BASE_REFERRAL_CODES: Record<string, number> = {
  '40met': 0.001, // 0.1% discount
  'you50': 0.001, // 0.1% discount
  'me2': 0.001,   // 0.1% discount
  'lov6': 0.001   // 0.1% discount
};

// Generate a random 4-character code
const generateRandomCode = (): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length: 4 }, () => 
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join('');
};

// Generate additional random codes
const generateAdditionalCodes = (count: number): Record<string, number> => {
  const additionalCodes: Record<string, number> = {};
  for (let i = 0; i < count; i++) {
    additionalCodes[generateRandomCode()] = 0.001; // Always 0.1% discount
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