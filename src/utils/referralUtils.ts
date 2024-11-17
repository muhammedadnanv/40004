export const validateReferralCode = (code: string): { isValid: boolean; discountPercentage: number } => {
  const VALID_REFERRAL_CODES: Record<string, number> = {
    '40met': 0.001, // 0.1% discount
  };

  return {
    isValid: code in VALID_REFERRAL_CODES,
    discountPercentage: VALID_REFERRAL_CODES[code] || 0
  };
};