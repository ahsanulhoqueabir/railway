import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import animationData from "@/assets/animation/raill.json";

const RegistrationPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: Record<string, unknown>) => {
    console.log(data);
  };

  return (
    <div className="relative w-full h-screen flex justify-center items-center overflow-hidden">
      {/* Background Animation */}
      <Lottie
        animationData={animationData}
        // loop={true}
        className="absolute inset-0 w-full h-full"
      />
      <div className="flex items-center justify-center relative z-10 bg-white bg-opacity-90 rounded-lg shadow-xl max-w-[350px] w-full flex-col ">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6">
          <h2 className="text-center text-2xl font-bold text-gray-700 mb-4">
            Register
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-1">Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                placeholder="Enter your name"
                className="searchinput"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">
                  {errors.name?.message?.toString()}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Phone</label>
              <input
                {...register("phone", { required: "Phone is required" })}
                placeholder="Enter your phone number"
                className="searchinput"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">
                  {errors.phone?.message?.toString()}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                    message: "Invalid email",
                  },
                })}
                placeholder="Enter your email"
                className="searchinput"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">
                  {errors.email?.message?.toString()}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                    message:
                      "Password must include uppercase, lowercase, number, and special character",
                  },
                })}
                placeholder="Enter your password"
                className="searchinput"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password?.message?.toString()}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-2 rounded-lg"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
