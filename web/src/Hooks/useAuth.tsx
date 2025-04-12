import { authContext } from "@/Context/AuthContext";
import { useContext } from "react";

const useAuth = () => {
  const auth = useContext(authContext);

  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return auth;
};

export default useAuth;
