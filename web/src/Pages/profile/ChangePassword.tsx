import { useForm } from "react-hook-form";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import useAxiosPublic from "@/Hooks/axios/useAxiosPublic";
import useAuth from "@/Hooks/useAuth";
import { toast } from "react-toastify";

interface ChangePasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>();

  const onSubmit = (data: ChangePasswordFormValues) => {
    console.log(data);
    axiosPublic
      .put(`/user/update-password`, {
        pasword: data.currentPassword,
        newPassword: data.newPassword,
        email: user?.email,
      })
      .then((res) => {
        if (res.data) {
          toast.success("Password changed successfully!");
        } else {
          alert("Password change failed. Please try again.");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("An error occurred. Please try again later.");
      });
  };

  return (
    <div className="flex  w-full justify-center items-center  min-h-screen">
      <div className="gradbg min-w-96 p-[1px] rounded-lg shadow-lg">
        <Card className="w-full max-w-md bg-white rounded-lg shadow-md">
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  className="mt-2"
                  id="currentPassword"
                  type="password"
                  {...register("currentPassword", {
                    required: "Current password is required",
                  })}
                />
                {errors.currentPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.currentPassword.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  className="mt-2"
                  id="newPassword"
                  type="password"
                  {...register("newPassword", {
                    required: "New password is required",
                  })}
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  className="mt-2"
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value, { newPassword }) =>
                      value === newPassword || "Passwords do not match",
                  })}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter className="mt-5">
              <Button type="submit" className="w-full">
                Change Password
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ChangePassword;
