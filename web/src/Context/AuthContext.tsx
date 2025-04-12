import { createContext } from "react";

// Define the shape of the context
interface AuthContextType {
  loading: boolean;
  user?: {
    name: string;
    email: string;
    phone?: string;
  } | null;
  setUser: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
      phone?: string;
    } | null>
  >;
}

// Provide a default value for the context
export const authContext = createContext<AuthContextType | undefined>(
  undefined
);
