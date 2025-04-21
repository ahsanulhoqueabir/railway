import { useEffect, useState } from "react";
// import getImage from "../../utilities/getimage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";
import getImage from "@/utilities/getimage";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const SearchSection = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [data, setData] = useState({ from: "", to: "", date: "", class: "" });
  const [isTrue, setTrue] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (
      data.from !== "" &&
      data.to !== "" &&
      data.date !== "" &&
      data.class !== ""
    ) {
      setTrue(true);
    } else {
      setTrue(false);
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = {
      from: data.from,
      to: data.to,
      date: new Date(data.date).toISOString().split("T")[0],
      class: data.class,
    };
    console.log(fd);
    navigate(`/search-trains?from=${fd.from}&to=${fd.to}&doj=${fd.date}`);
  };
  return (
    <section className="lg:flex justify-between gap-16 py-10 items-center">
      <div className="lg:w-[55%]">
        <form onSubmit={handleSubmit} className="">
          <div className="grid lg:grid-cols-2 gap-6">
            <label className="form-control ">
              <div className="label">
                <span className="label-text font-medium">From</span>
              </div>
              <input
                required
                type="text"
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setData({ ...data, from: e.target.value });
                  }
                }}
                placeholder="From Station"
                className="searchinput"
              />
            </label>
            <label className="form-control  ">
              <div className="label">
                <span className="label-text font-medium">To</span>
              </div>
              <input
                required
                type="text"
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setData({ ...data, to: e.target.value });
                  } else {
                    setData({ ...data, to: "" });
                  }
                }}
                placeholder="To Station"
                className="searchinput"
              />
            </label>
            <label className=" flex flex-col gap-0">
              <div className="label mb-1">
                <span className="label-text font-medium">Date of Journey</span>
              </div>
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  if (date) {
                    setData({ ...data, date: date.toISOString() });
                    setStartDate(date);
                  }
                }}
                minDate={new Date()}
                maxDate={addDays(new Date(), 9)}
                placeholderText="Journey Date"
                className="searchinput"
              />
            </label>
            <label className="form-control ">
              <div className="label">
                <span className="label-text font-medium">Choose Class</span>
              </div>
              <select
                required
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setData({ ...data, class: e.target.value });
                  } else {
                    setData({ ...data, class: "" });
                  }
                }}
                className="searchinput"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Class
                </option>
                <option value="Sleeper">Sleeper</option>
                <option value="Snigdha">Snigdha</option>
                <option value="Shovon">Shovon</option>
              </select>
            </label>
          </div>
          <motion.div
            whileFocus={{ scale: 1.02 }}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="space-y-1"
          >
            <button
              onSubmit={() => handleSubmit}
              disabled={!isTrue}
              className="btn my-5 text-white border-none w-full bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
            >
              Search
            </button>
          </motion.div>
        </form>
      </div>
      <div className="lg:w-[45%]">
        <img className="w-full" src={getImage("banner", "bkash.png")} alt="" />
      </div>
    </section>
  );
};

export default SearchSection;
