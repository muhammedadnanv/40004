-- Fix critical security issue: Add RLS policies to leads table to prevent data exposure
-- Currently, the leads table has no RLS policies, exposing all customer contact information

-- RLS policies for leads table
CREATE POLICY "Users can view their own leads"
ON public.leads
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own leads"
ON public.leads
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own leads"
ON public.leads
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own leads"
ON public.leads
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Create table for storing unlock codes with proper security
CREATE TABLE IF NOT EXISTS public.unlock_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  code text NOT NULL UNIQUE,
  project_access text NOT NULL DEFAULT 'premium',
  payment_id text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  expires_at timestamp with time zone,
  used_at timestamp with time zone,
  is_active boolean NOT NULL DEFAULT true
);

-- Enable RLS on unlock_codes
ALTER TABLE public.unlock_codes ENABLE ROW LEVEL SECURITY;

-- RLS policies for unlock_codes
CREATE POLICY "Users can view their own unlock codes"
ON public.unlock_codes
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Service can insert unlock codes"
ON public.unlock_codes
FOR INSERT
TO service_role
WITH CHECK (true);

CREATE POLICY "Users can use their codes"
ON public.unlock_codes
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id OR code IN (SELECT code FROM unlock_codes WHERE is_active = true))
WITH CHECK (auth.uid() = user_id);

-- Create index for faster code lookups
CREATE INDEX idx_unlock_codes_code ON public.unlock_codes(code) WHERE is_active = true;
CREATE INDEX idx_unlock_codes_user_id ON public.unlock_codes(user_id);