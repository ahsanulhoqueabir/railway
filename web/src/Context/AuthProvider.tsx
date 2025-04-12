import { ReactNode, useEffect, useState } from "react";
import { authContext } from "./AuthContext";
import axios from "axios";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
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

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading] = useState(false);
  const [user, setUser] = useState<{
    name: string;
    email: string;
    phoneNumber?: string;
  } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("railbd-token");
    if (token) {
      axios
        .post(
          `${import.meta.env.VITE_APIKEY_Backend_URL}/jwt/verify`,
          {
            token,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("railbd-token");
          setUser(null);
        });
    } else {
      setUser(null);
    }
  }, []);

  const authInfo: AuthContextProps = {
    loading,
    user,
    setUser,
  };

  return (
    <authContext.Provider value={authInfo}>{children}</authContext.Provider>
  );
};

export default AuthProvider;
