
-- This function checks if the currently authenticated user has the 'admin' role.
-- It's defined with `SECURITY DEFINER` to safely check roles without causing
-- any permissions conflicts.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN FALSE;
  END IF;
  RETURN EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin');
END;
$$;

-- We're dropping the old policy to replace it with more specific ones.
DROP POLICY IF EXISTS "Users can view their own profile." ON public.profiles;

-- This policy allows any authenticated user to view their own profile information.
CREATE POLICY "Users can view their own profile."
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- This policy allows users with the 'admin' role to view all profiles.
CREATE POLICY "Admins can view all profiles."
  ON public.profiles FOR SELECT
  USING (public.is_admin());

