export type Role = 'user' | 'librarian' | 'admin';

export interface AuthUser {
  userId: number;
  username: string;
  roles: Role[];
}

