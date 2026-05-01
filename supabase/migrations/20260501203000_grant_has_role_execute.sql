-- Fix: 403 "permission denied for function has_role"
--
-- The has_role() function was created without granting EXECUTE to
-- the roles Supabase uses for client-side RPC calls.
-- This grants it to both `authenticated` (logged-in users) and
-- `anon` (needed during session restore before auth resolves).
--
-- Also sets SECURITY DEFINER so the function runs with the
-- privileges of the owner (postgres) and can read user_roles
-- even if the caller doesn't have direct table access.

ALTER FUNCTION public.has_role(public.app_role, uuid)
  SECURITY DEFINER
  SET search_path = public;

GRANT EXECUTE ON FUNCTION public.has_role(public.app_role, uuid)
  TO authenticated, anon;
