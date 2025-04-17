import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import anim from "@/assets/animation/Not-Authorized.json";

const NotAuthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-250px)]">
      <div className=" mx-auto relative">
        <Lottie className="h-[650px]" animationData={anim}></Lottie>
        {/* <p className="text-center lg:text-4xl absolute bottom-1/2 left-[calc(50%-100px)]">
          Not Authorized
        </p> */}
      </div>
      <div className="flex justify-center">
        <button
          className="px-5 flex justify-center py-2 bg-accent-content rounded"
          onClick={() => {
            navigate("/");
          }}
        >
          Home Page
        </button>
      </div>
    </div>
  );
};

export default NotAuthorized;
