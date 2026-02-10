import type { Role } from "./auth.types";

export const hasRole = (userRole: Role | undefined, allowed: Role[]) =>
  !!userRole && allowed.includes(userRole);
