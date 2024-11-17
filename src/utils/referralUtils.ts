// Base referral codes with 0.1% discount
const BASE_REFERRAL_CODES: Record<string, number> = {
  '40met': 0.001, // 0.1% discount
  'you50': 0.001, // 0.1% discount
  'me2': 0.001,   // 0.1% discount
  'lov6': 0.001,  // 0.1% discount
  'ad4000': 0.5   // Special 50% discount
};

// Generate a random 4-character code
const generateRandomCode = (): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length: 4 }, () => 
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join('');
};

// Generate a large number of unique random codes
const generateManyRandomCodes = (count: number): Record<string, number> => {
  const additionalCodes: Record<string, number> = {};
  const usedCodes = new Set(Object.keys(BASE_REFERRAL_CODES));
  
  let attempts = 0;
  const maxAttempts = count * 2; // Prevent infinite loops
  
  while (Object.keys(additionalCodes).length < count && attempts < maxAttempts) {
    const code = generateRandomCode();
    if (!usedCodes.has(code)) {
      additionalCodes[code] = 0.001; // Always 0.1% discount
      usedCodes.add(code);
    }
    attempts++;
  }
  
  return additionalCodes;
};

// Combine base codes with 40k random codes
export const VALID_REFERRAL_CODES: Record<string, number> = {
  ...BASE_REFERRAL_CODES,
  ...generateManyRandomCodes(40000)
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