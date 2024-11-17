// Store the referral codes and their corresponding discount percentages
const VALID_REFERRAL_CODES: Record<string, number> = {
  '40met': 0.001, // 0.1% discount
  'you50': 0.001, // 0.1% discount
  'me2': 0.001,   // 0.1% discount
  'lov6': 0.001   // 0.1% discount
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