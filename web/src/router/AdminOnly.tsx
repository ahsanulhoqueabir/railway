import { admin } from "@/assets/data/admins";
import useAuth from "@/Hooks/useAuth";
import LoadingPage from "@/Pages/LoadingPage";
import NotAuthorized from "@/Pages/NotAuthorized";
import { ReactNode } from "react";

const Admin = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  const isAdmin = user && admin.includes(user.email);

  if (loading) {
    return <LoadingPage />;
  }
  if (isAdmin) {
    return children;
  }
  return <NotAuthorized />;
};

export default Admin;
