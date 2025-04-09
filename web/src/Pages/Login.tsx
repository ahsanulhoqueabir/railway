import { Link } from "react-router-dom";
import getImage from "../utilities/getimage";
import Lottie from "lottie-react";
import animationData from "@/assets/animation/rail.json";

const Login = () => {
  return (
    <div className="relative w-full h-screen flex justify-center items-center overflow-hidden">
      {/* Background Animation */}
      <Lottie
        animationData={animationData}
        // loop={true}
        className="absolute inset-0 w-full h-full"
      />

      {/* Login Container */}
      <div className="relative z-10 bg-white bg-opacity-90 rounded-lg p-8 shadow-xl max-w-[350px] w-full flex flex-col items-center">
        {/* Logo and Title */}
        <div className="flex flex-col items-center space-y-2">
          <img
            className="size-24"
            src={getImage("common", "logo.png")}
            alt="Logo"
          />
          <p className="text-xl font-bold text-[#da934f]">Bangladesh Railway</p>
          <p className="text-xs">নিরাপদ - আরামদায়ক - সাশ্রয়ী</p>
        </div>

        {/* Login Form */}
        <div className="w-full bg-white rounded mt-5 p-6 shadow-lg">
          <form className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Phone Number"
              className="searchinput"
            />
            <input
              type="password"
              placeholder="Password"
              className="searchinput"
            />
            <button className="btn bg-green-900 rounded text-white hover:bg-green-500 text-lg transition duration-300">
              Login
            </button>
          </form>

          <p className="text-center text-gray-400 font-bold mt-4">OR</p>
          <p className="text-center">
            <Link to="/register" className="text-green-900 font-bold underline">
              Register
            </Link>
          </p>
        </div>

        {/* Links */}
        <div className="flex justify-between items-center w-full px-3 py-4">
          <Link className="font-semibold text-[#da934f]" to="/forgot-password">
            Forgot Password?
          </Link>
          <Link to="/need-help">Need Help?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
