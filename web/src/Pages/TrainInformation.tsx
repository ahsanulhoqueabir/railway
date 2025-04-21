import SearchTrain from "@/Components/Search/SearchTrain";
import useAxiosPublic from "@/Hooks/axios/useAxiosPublic";
import { TrainData } from "@/interfaces/search";
import { useEffect, useState } from "react";
import LoadingPage from "./LoadingPage";

const TrainInformation = () => {
  const axiosPublic = useAxiosPublic();
  const [allTrains, setAllTrains] = useState<TrainData[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTrain, setSelectedTrain] = useState<TrainData | null>(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    setLoading(true);
    axiosPublic
      .get("/train/all")
      .then((res) => {
        setAllTrains(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [axiosPublic]);

  useEffect(() => {
    if (value) {
      const selected = allTrains.find((train) => train.id === value);
      setSelectedTrain(selected || null);
    } else {
      setSelectedTrain(null);
    }
  }, [value, allTrains]);
  if (loading) {
    return <LoadingPage />;
  }
  return (
    <div className="flex gap-10 py-10">
      <div>
        <SearchTrain allTrains={allTrains} value={value} setValue={setValue} />
      </div>
      <div className="w-full">
        {selectedTrain && (
          <div className="mt-4 p-4 border rounded-md shadow-md bg-white">
            <h2 className="text-lg font-semibold">Train Information</h2>
            <p className="mt-2">
              <strong>Name:</strong> {selectedTrain.name}
            </p>
            <p className="mt-2">
              <strong>Train Number:</strong> {selectedTrain.train_number}
            </p>
            <p className="mt-2">
              <strong>Start Station:</strong> {selectedTrain.start_station}
            </p>
            <p className="mt-2">
              <strong>End Station:</strong> {selectedTrain.end_station}
            </p>
            <p className="mt-2">
              <strong>Departure Time:</strong> {selectedTrain.departure_time}
            </p>
            <p className="mt-2">
              <strong>Arrival Time:</strong> {selectedTrain.arrival_time}
            </p>
            <p className="mt-2">
              <strong>Train Type:</strong> {selectedTrain?.train_type || "N/A"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainInformation;
