-- Migration: Seed admin roles for the two known admin emails.
--
-- The user_roles table + has_role() function already exist from previous migrations.
-- This seeds the 'admin' role for both admin accounts so the new DB-backed
-- role check in useAuth.tsx works correctly.
--
-- NOTE: This migration is safe to run even if the users have not yet signed in
-- (it only inserts if a matching profile exists). Once they sign in via Google
-- OAuth, their profiles row is created and this role will apply automatically
-- on next session. If they've already signed in, this takes effect immediately.

INSERT INTO public.user_roles (user_id, role)
SELECT p.user_id, 'admin'::public.app_role
FROM public.profiles p
WHERE p.email IN ('momsknee3@gmail.com', 'avabhishek50@gmail.com')
  AND NOT EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = p.user_id
      AND ur.role = 'admin'::public.app_role
  );
