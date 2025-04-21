import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { motion } from "framer-motion";
import { TrainFront, Users } from "lucide-react";
import { Train, ModCouch, Couch } from "@/interfaces/search";

const TrainCard: React.FC<{
  train: Train;
  shovon: {
    details: Couch;
    available_seats: number;
  };
  sleeper: ModCouch;
  snigdha: ModCouch;
}> = ({ train, shovon, sleeper, snigdha }) => {
  return (
    <motion.div
      className="w-full  rounded-2xl shadow-lg border p-4 bg-white"
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-orange-700">
            {train.name.toUpperCase()} ({train.train_number})
          </h2>
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <Users className="w-4 h-4" /> 0+ users are trying to book ticket(s)
          </div>
        </div>
        <div className="text-sm text-primary hover:underline cursor-pointer">
          <TrainFront className="inline w-4 h-4 mr-1" /> Train Details
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-sm mb-4">
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            21 APR, {train.departure_time}
          </p>
          <p className="font-semibold">{train.start_station}</p>
        </div>
        <div className="flex items-center gap-2 w-full">
          <div className="flex-1">
            <hr className="border-2" />
          </div>
          <div className="text-xs text-muted-foreground w-fit">{"5.5"}</div>
          <div className="flex-1">
            <hr className="border-2" />
          </div>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            21 APR, {train.arrival_time}
          </p>
          <p className="font-semibold">{train.end_station}</p>
        </div>
      </div>

      <div className="flex gap-3 lg:gap-10">
        <Card
          className={`rounded-xl w-48 border-2 ${
            sleeper.available_seats === 0 ? "border-red-300 bg-red-50" : ""
          }`}
        >
          <CardContent className="p-4">
            <div className="text-sm font-bold mb-1">{"Shovon"}</div>
            <div className="text-green-700 font-bold text-lg mb-2">
              ৳{"1950"}
            </div>
            <div className="text-xs text-muted-foreground mb-2">
              Available Tickets
            </div>
            <div
              className={`text-base font-semibold ${
                sleeper.available_seats === 0
                  ? "text-red-500"
                  : "text-green-600"
              }`}
            >
              {sleeper.available_seats}
            </div>
            {sleeper.available_seats > 0 ? (
              <Button className="mt-3 w-full">BOOK NOW</Button>
            ) : null}
          </CardContent>
        </Card>
        <Card
          className={`rounded-xl w-48 border-2 ${
            snigdha?.available_seats === 0 ? "border-red-300 bg-red-50" : ""
          }`}
        >
          <CardContent className="p-4">
            <div className="text-sm font-bold mb-1">{"Shovon"}</div>
            <div className="text-green-700 font-bold text-lg mb-2">
              ৳{"500"}
            </div>
            <div className="text-xs text-muted-foreground mb-2">
              Available Tickets
            </div>
            <div
              className={`text-base font-semibold ${
                snigdha.available_seats === 0
                  ? "text-red-500"
                  : "text-green-600"
              }`}
            >
              {snigdha.available_seats}
            </div>
            {snigdha.available_seats > 0 ? (
              <Button className="mt-3 w-full">BOOK NOW</Button>
            ) : null}
          </CardContent>
        </Card>
        <Card
          className={`rounded-xl w-48 border-2 ${
            shovon.available_seats === 0 ? "border-red-300 bg-red-50" : ""
          }`}
        >
          <CardContent className="p-4">
            <div className="text-sm font-bold mb-1">{"Shovon"}</div>
            <div className="text-green-700 font-bold text-lg mb-2">
              ৳{"500"}
            </div>
            <div className="text-xs text-muted-foreground mb-2">
              Available Tickets
            </div>
            <div
              className={`text-base font-semibold ${
                shovon.available_seats === 0 ? "text-red-500" : "text-green-600"
              }`}
            >
              {shovon.available_seats}
            </div>
            {shovon.available_seats > 0 ? (
              <Button className="mt-3 w-full">BOOK NOW</Button>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default TrainCard;
