import { useForm, SubmitHandler } from "react-hook-form";
import { Card, CardContent } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { motion } from "framer-motion";
import useAxiosPublic from "@/Hooks/axios/useAxiosPublic";
import { toast } from "react-toastify";

type FormValues = {
  name: string;
  longitude: string;
  latitude: string;
  station_code: string;
  mastername: string;
};

export default function AddStation() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();
  const axiosPublic = useAxiosPublic();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    axiosPublic
      .post("/station/create", data)
      .then(() => {
        toast.success(`${data.name} added successfully!`);
      })
      .catch((error) => {
        if (error.status === 409) {
          toast.error("Station already exists!");
          return;
        }
        console.error("Error adding station:", error.status);
      });

    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl"
      >
        <Card className="rounded-2xl shadow-xl bg-white/50 backdrop-blur-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold text-center text-indigo-700 mb-6">
              Add New Station
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {[
                { label: "Name", name: "name" },
                { label: "Latitude", name: "latitude" },
                { label: "Longitude", name: "longitude" },
                { label: "Station Code", name: "station_code" },
                { label: "Master Name", name: "mastername" },
              ].map((field) => (
                <motion.div
                  key={field.name}
                  whileFocus={{ scale: 1.02 }}
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="space-y-1"
                >
                  <Label htmlFor={field.name} className="text-indigo-800">
                    {field.label}
                  </Label>
                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <Input
                      id={field.name}
                      {...register(field.name as keyof FormValues, {
                        required: true,
                      })}
                      className="mt-2"
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                  </motion.div>
                  {errors[field.name as keyof FormValues] && (
                    <p className="text-sm text-red-500 mt-1">
                      {field.label} is required.
                    </p>
                  )}
                </motion.div>
              ))}
              <Button type="submit" className="w-full mt-4 gradbg">
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
