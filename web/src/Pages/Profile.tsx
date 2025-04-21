import { motion } from "framer-motion";
import useAuth from "@/Hooks/useAuth";
import { Card } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import useAxiosPublic from "@/Hooks/axios/useAxiosPublic";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const handleDeleteProfile = () => {
    console.log("Delete profile clicked");
    if (window.confirm("Are you sure you want to delete your profile?")) {
      axiosPublic
        .delete(`/user/delete/${user?.email}`)
        .then(() => {
          toast.success("Profile deleted successfully!");
          navigate("/");
        })
        .catch((error) => {
          console.error("Error deleting profile:", error);
          toast.error("Failed to delete profile. Please try again.");
        });
    }
  };

  return (
    <motion.div
      className="max-w-lg mx-auto p-6 font-sans"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-center text-2xl font-bold text-gray-800">Profile</h1>
      <Card className="bg-white p-6 mt-6 shadow-md rounded-lg">
        <p className="text-gray-700">
          <strong>Name:</strong> {user?.name || "N/A"}
        </p>
        <p className="text-gray-700">
          <strong>Email:</strong> {user?.email || "N/A"}
        </p>
        <p className="text-gray-700">
          <strong>Phone:</strong> {user?.phone || "N/A"}
        </p>
        <Button
          onClick={handleDeleteProfile}
          className="mt-4 bg-red-500 text-white hover:bg-red-600"
        >
          Delete Profile
        </Button>
      </Card>
    </motion.div>
  );
};

export default Profile;
