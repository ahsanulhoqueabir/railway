import { Link } from "react-router-dom";
import getImage from "../utilities/getimage";

const Login = () => {
  return (
    <div className="  ">
      <img
        src={getImage("banner", "train.png")}
        className="absolute  right-0 bottom-0 w-[70%] h-[40%] lg:h-[90%] object-contain -z-10"
        alt=""
      />
      <div className=" mx-auto max-w-[350px] flex flex-col justify-center items-center h-screen">
        <div className="flex flex-col items-center space-y-2 ">
          <img
            className="size-24"
            src={getImage("common", "logo.png")}
            alt=""
          />
          <p className="text-xl font-bold text-[#da934f]">Bangladesh Railway</p>
          <p className="text-xs">নিরাপদ - আরামদায়ক - সাশ্রয়ী</p>
        </div>
        <div className="w-full bg-white rounded  mt-5 shadow-xl shadow-gray-400">
          <div className="flex justify-between items-center s gap-6  px-3 py-6 rounded-lg shadow-lg ">
            <Link
              className="font-semibold text-[#da934f]"
              to="/forgot-password"
            >
              Forgot Password?
            </Link>
            <Link to="/need-help">Need Help?</Link>
          </div>
          <div className="pb-8 space-y-3">
            <form className="flex flex-col space-y-4 p-6">
              <input
                type="text"
                placeholder="Phone Number"
                className="input rounded h-10 focus:outline-none focus:ring-2 focus:ring-[#da934f] focus:border-transparent transition-colors duration-500 ease-in-out"
              />
              <input
                type="password"
                placeholder="Password"
                className="input rounded h-10 focus:outline-none focus:ring-2 focus:ring-[#da934f] focus:border-transparent transition-colors duration-500 ease-in-out"
              />
              <button className="btn bg-green-900 rounded text-white hover:bg-green-500 text-lg transition-colors duration-300 ease-in-out">
                Login
              </button>
            </form>
            <p className="text-center text-gray-400 font-bold">OR</p>
            <p className="text-center">
              <Link
                to="/register"
                className="text-center text-green-900 font-bold underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
