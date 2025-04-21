import useAxiosPublic from "@/Hooks/axios/useAxiosPublic";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import TrainCard from "@/Components/Search/TrainBlock";
import { modTrainScheduleData } from "@/interfaces/search";

const SearchTrain = () => {
  const location = useLocation();
  const [trainData, setTrainData] = useState<modTrainScheduleData[]>([]);
  const searchParams = new URLSearchParams(location.search);

  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const date = searchParams.get("doj");

  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    setLoading(true);
    axiosPublic
      .get(`/search/train?from=${from}&to=${to}&doj=${date}`)
      .then((res) => {
        console.log(res.data);
        setTrainData(res.data.trains);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          console.log("No trains found for the selected route and date.");
        }
        console.log(err);
        setLoading(false);
      });
  }, [axiosPublic, from, to, date]);
  if (loading) {
    return <LoadingPage />;
  }
  return (
    <div className="py-10">
      {trainData?.length > 0 ? (
        <div className="flex flex-col gap-4">
          {trainData?.map((train, ind) => (
            <TrainCard
              key={ind}
              train={train.train}
              shovon={train.shovon}
              sleeper={train.sleeper}
              snigdha={train.snigdha}
            />
          ))}
        </div>
      ) : (
        "No trains found for the selected route and date."
      )}
    </div>
  );
};

export default SearchTrain;
