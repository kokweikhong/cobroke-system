export type SessionData = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  expiresAt?: string;
  isLogged: boolean;
};
