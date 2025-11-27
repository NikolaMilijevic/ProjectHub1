import { getCurrentUser } from "@/types/auth";
import { redirect } from "@tanstack/react-router";

export function requireAuth() {
  const user = getCurrentUser();
  if (!user) {
    throw redirect({
      to: "/login",
    });
  }
  return user;
}

export function requireAdmin() {
  const user = getCurrentUser();

  if (!user) {
    throw redirect({ to: "/login" });
  }

  if (user.role !== "Admin") {
    throw redirect({ to: "/unauthorized" });
  }

  return user;
}
