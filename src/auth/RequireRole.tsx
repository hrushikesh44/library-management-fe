import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import type { JSX } from "react";

export function RequireRole({
  allowedRoles,
  children,
}: {
  allowedRoles: ("ADMIN" | "LIBRARIAN" | "USER")[];
  children: JSX.Element;
}) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}
