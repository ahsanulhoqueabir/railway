import { Link, useNavigate } from "react-router-dom";
import getImage from "../utilities/getimage";
import Lottie from "lottie-react";
import animationData from "@/assets/animation/rail.json";
import { useForm } from "react-hook-form";
import useAxiosPublic from "@/Hooks/axios/useAxiosPublic";
import { useState } from "react";
import useAuth from "@/Hooks/useAuth";
import { toast } from "react-toastify";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const naviage = useNavigate();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ phoneNumber: string; password: string }>();
  const onSubmit = (data: { phoneNumber: string; password: string }) => {
    setLoading(true);
    axiosPublic
      .post("/auth/login", {
        phmail: data.phoneNumber,
        password: data.password,
      })
      .then((response) => {
        if (response.status === 200) {
          const { token, user } = response.data;
          localStorage.setItem("railbd-token", token);
          setUser(user);
          toast("Login successful");
          setLoading(false);
          naviage("/");
        } else {
          console.error("Login failed:");
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Login failed:", error);
        setLoading(false);
      });
  };

  return (
    <div className="relative w-full min-h-screen flex justify-center items-center overflow-hidden">
      {/* Background Animation */}
      <Lottie
        animationData={animationData}
        // loop={true}
        className="absolute inset-0 w-full h-full"
      />

      {/* Login Container */}
      <div className="my-10 h-full p-1  bg-linear-to-r/increasing from-indigo-500 to-teal-400 flex items-center justify-center relative z-10 bg-white bg-opacity-90 rounded-lg shadow-xl lg:w-[460px]  flex-col ">
        <div className="relative  z-10 bg-white bg-opacity-90 rounded-lg p-8 shadow-xl lg:w-[450px]  flex flex-col items-center">
          {/* Logo and Title */}
          <div className="flex flex-col items-center space-y-2">
            <img
              className="size-24"
              src={getImage("common", "logo.png")}
              alt="Logo"
            />
            <p className="text-xl font-bold text-[#da934f]">
              Bangladesh Railway
            </p>
            <p className="text-xs">নিরাপদ - আরামদায়ক - সাশ্রয়ী</p>
          </div>

          {/* Login Form */}
          <div className="w-full bg-white rounded mt-5 p-6 shadow-lg">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col space-y-4"
            >
              <input
                {...register("phoneNumber", { required: true })}
                type="text"
                placeholder="Phone Number"
                className="searchinput"
              />
              {errors.phoneNumber && (
                <span className="text-red-500 text-sm">
                  Phone Number/Email is required
                </span>
              )}
              <input
                {...register("password", { required: true })}
                type="password"
                placeholder="Password"
                className="searchinput"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  Password is required
                </span>
              )}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-2 rounded-lg flex items-center justify-center"
              >
                <span className={`${loading ? "hidden" : ""}`}>Log In</span>
                {loading && (
                  <span className="ml-2 animate-spin rounded-full h-5 w-5 border-t-2 border-white border-solid"></span>
                )}
              </button>
            </form>

            <p className="text-center text-gray-400 font-bold mt-4">OR</p>
            <p className="text-center">
              <Link
                to="/register"
                className="text-green-900 font-bold underline"
              >
                Register
              </Link>
            </p>
          </div>

          {/* Links */}
          <div className="flex justify-between items-center w-full px-3 py-4">
            <Link
              className="font-semibold text-[#da934f]"
              to="/forgot-password"
            >
              Forgot Password?
            </Link>
            <Link to="/need-help">Need Help?</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
