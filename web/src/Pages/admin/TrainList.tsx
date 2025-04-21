import useAxiosPublic from "@/Hooks/axios/useAxiosPublic";
import { useEffect, useState } from "react";
import LoadingPage from "../LoadingPage";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Button } from "@/Components/ui/button";
import { MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { toast } from "react-toastify";

const TrainList = () => {
  const axiosPublic = useAxiosPublic();
  const [trains, setTrains] = useState<Train[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [stoppageForm, setStoppageForm] = useState({
    trainID: "",
    stationID: "",
    arrival_time: "",
    departure_time: "",
    halt_time: "",
    station_order: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axiosPublic
      .get("/train/all")
      .then((response) => {
        setTrains(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching trains:", error);
        setLoading(false);
      });
  }, [axiosPublic]);

  const handleAddStoppage = (trainID: string) => {
    setStoppageForm({ ...stoppageForm, trainID });
    setIsDialogOpen(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStoppageForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = () => {
    axiosPublic
      .post("/stoppage/add", stoppageForm)
      .then(() => {
        toast.success("Stoppage added successfully!");
        setIsDialogOpen(false);
      })
      .catch((error) => {
        console.error("Error adding stoppage:", error);
        toast.error("Failed to add stoppage. Please try again.");
      });

    setIsDialogOpen(false);
  };
  const handleUpdate = (trainID: string) => {
    navigate(`/admin/train-detail/${trainID}`);
  };

  const handleDelete = (trainID: string) => {
    if (window.confirm("Are you sure you want to delete this train?")) {
      axiosPublic
        .delete(`/train/delete/${trainID}`)
        .then(() => {
          setTrains((prev) => prev.filter((train) => train.id !== trainID));
          toast.success("Train deleted successfully!");
        })
        .catch((error) => {
          console.error("Error deleting train:", error);
          toast.error("Failed to delete train. Please try again.");
        });
    }
  };

  if (loading) {
    return <LoadingPage />;
  }
  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold mb-4">Train Lists</h1>
      <div className="overflow-x-auto rounded-2xl shadow-md">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Start Station</th>
              <th className="px-6 py-3">End Station</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {trains.map((train) => (
              <motion.tr
                key={train.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-medium text-gray-800">
                  {train.name}
                </td>
                <td className="px-6 py-4 text-gray-700">
                  {train.start_station}
                </td>
                <td className="px-6 py-4 text-gray-700">{train.end_station}</td>
                <td className="px-6 py-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() =>
                          navigate(`/admin/train-detail/${train.id}`)
                        }
                      >
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleAddStoppage(train.id)}
                      >
                        Add Stoppage
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleUpdate(train.id)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(train.id)}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dialog for Add Stoppage */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Stoppage</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              required
              name="trainID"
              value={stoppageForm.trainID}
              onChange={handleFormChange}
              placeholder="Train ID"
              disabled
            />
            <Input
              required
              name="stationID"
              value={stoppageForm.stationID}
              onChange={handleFormChange}
              placeholder="Station ID"
            />
            <Input
              required
              type="time"
              name="arrival_time"
              value={stoppageForm.arrival_time}
              onChange={handleFormChange}
              placeholder="Arrival Time"
            />
            <Input
              required
              type="time"
              name="departure_time"
              value={stoppageForm.departure_time}
              onChange={handleFormChange}
              placeholder="Departure Time"
            />
            <Input
              required
              name="halt_time"
              value={stoppageForm.halt_time}
              onChange={handleFormChange}
              placeholder="Halt Time"
            />
            <Input
              required
              name="station_order"
              type="number"
              value={stoppageForm.station_order}
              onChange={handleFormChange}
              placeholder="Station Order"
            />
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleFormSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default TrainList;

interface Train {
  id: string;
  name: string;
  start_station: string;
  end_station: string;
  couch_no: number;
  departure_time: string;
  arrival_time: string;
  station_order: number;
  train_type: string | null;
  train_number: string;
  off_day: number;
  created_at: string;
}
