import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Components/common/Navbar";
import Footer from "./Components/common/Footer";
import useAuth from "./Hooks/useAuth";
import LoadingPage from "./Pages/LoadingPage";
import { useEffect } from "react";

const App = () => {
  const { loading, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
    if (!loading && user) {
      navigate("/");
    }
  }, [loading, user, navigate]);

  if (loading) {
    return <LoadingPage />;
  }
  return (
    <div className=" ">
      <Navbar />
      <div className="min-h-screen lg:px-20 px-5">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default App;
