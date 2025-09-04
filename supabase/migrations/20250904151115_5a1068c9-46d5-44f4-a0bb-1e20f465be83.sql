-- Fix the most critical security issues with anonymous access policies
-- Update public.payments table RLS policies to require authentication

-- First ensure RLS is enabled on critical tables
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- Create a secure payments policy that only allows authenticated users to see their own data
DROP POLICY IF EXISTS "Users can manage their own payments" ON public.payments;
CREATE POLICY "Users can view their own payments" 
ON public.payments 
FOR SELECT 
USING (auth.uid() IS NOT NULL AND (auth.jwt() ->> 'email') = user_email);

CREATE POLICY "Authenticated users can create payments" 
ON public.payments 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL AND (auth.jwt() ->> 'email') = user_email);

-- Secure leads table - only authenticated users can create/view leads
DROP POLICY IF EXISTS "Users can manage their own leads" ON public.leads;
CREATE POLICY "Users can create leads" 
ON public.leads 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view their own leads" 
ON public.leads 
FOR SELECT 
USING (auth.uid() IS NOT NULL AND (auth.jwt() ->> 'email') = email);

-- Secure referrals table
DROP POLICY IF EXISTS "Users can manage their own referrals" ON public.referrals;
CREATE POLICY "Users can view their own referrals" 
ON public.referrals 
FOR SELECT 
USING (auth.uid() IS NOT NULL AND (auth.jwt() ->> 'email') = referrer_email);

CREATE POLICY "Authenticated users can create referrals" 
ON public.referrals 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);