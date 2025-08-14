-- Fix critical security issue: Restrict payments table insert access
-- Remove the overly permissive "Anyone can insert payments" policy
DROP POLICY IF EXISTS "Anyone can insert payments" ON public.payments;

-- Create a secure policy that only allows service role (payment processors) to insert payments
-- This ensures only verified payment processors can create payment records
CREATE POLICY "Only payment processors can insert payments" 
ON public.payments 
FOR INSERT 
WITH CHECK (
  -- Only allow service role (used by payment verification edge functions)
  auth.role() = 'service_role'
  OR
  -- Allow authenticated users to insert their own payment records during enrollment
  (auth.role() = 'authenticated' AND user_email = (auth.jwt() ->> 'email'::text))
);

-- Create a policy for authenticated users to update their own payment status
-- This is needed for payment verification flows
CREATE POLICY "Users can update their own payment status" 
ON public.payments 
FOR UPDATE 
USING (user_email = (auth.jwt() ->> 'email'::text))
WITH CHECK (user_email = (auth.jwt() ->> 'email'::text));

-- Ensure only users can see their own payments (keeping existing policy)
-- This policy should already exist but let's make sure it's properly configured