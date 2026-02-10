export type Role = "ADMIN" | "LIBRARIAN" | "USER";

export interface User {
  id: number;
  username: string;
  role: Role;
}

export interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
