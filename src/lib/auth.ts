// Auth placeholder — wire to NextAuth, Clerk, or Supabase Auth.
// The shape below mirrors what the rest of the app expects.

import type { UserRole } from "@prisma/client";

export type SessionUser = {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  avatar?: string | null;
};

export type Session = {
  user: SessionUser;
  expires: string;
};

// Replace with real session retrieval from your auth provider.
export async function getSession(): Promise<Session | null> {
  return null;
}

export async function requireUser(): Promise<SessionUser> {
  const session = await getSession();
  if (!session) throw new Error("UNAUTHORIZED");
  return session.user;
}

export async function requireRole(roles: UserRole[]): Promise<SessionUser> {
  const user = await requireUser();
  if (!roles.includes(user.role)) throw new Error("FORBIDDEN");
  return user;
}
