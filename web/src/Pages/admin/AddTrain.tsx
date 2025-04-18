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
  start_station: string | null;
  end_station: string | null;
  coach_no: number;
  departure_time: string; //time format "14:30"
  arrival_time: string;
  train_number: string;
  off_day: number | null;
};

export default function AddTrain() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const axiosPublic = useAxiosPublic();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form submitted:", data);
    axiosPublic
      .post("/train/create", data)
      .then((res) => {
        console.log("Train added successfully:", res.data);
        toast.success(`${data.name} added successfully!`);
      })
      .catch((err) => {
        if (err.response.status === 409) {
          toast.error("Train already exists!");
          return;
        }
        console.log(err);
      });
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
              Add New Train
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {[
                { label: "Name", name: "name" },
                { label: "Start Station", name: "start_station" },
                { label: "End Station", name: "end_station" },
                { label: "Coach No", name: "coach_no" },
                { label: "Departure Time", name: "departure_time" },
                { label: "Arrival Time", name: "arrival_time" },
                { label: "Train Number", name: "train_number" },
                { label: "Off Day", name: "off_day" },
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
                      type={
                        field.name === "departure_time" ||
                        field.name === "arrival_time"
                          ? "time"
                          : field.name === "coach_no" ||
                            field.name === "off_day"
                          ? "number"
                          : "text"
                      }
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
