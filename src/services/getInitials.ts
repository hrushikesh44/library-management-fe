export function getInitial(username?: string | null): string {
  if (!username) return '?';

  return username.trim().charAt(0).toUpperCase();
}
