import { Outlet } from "react-router-dom";
import Navbar from "./Components/common/Navbar";
import Footer from "./Components/common/Footer";

const App = () => {
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
