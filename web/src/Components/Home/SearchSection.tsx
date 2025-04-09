import { useEffect, useState } from "react";
// import getImage from "../../utilities/getimage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";
import getImage from "@/utilities/getimage";

const SearchSection = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [data, setData] = useState({ from: "", to: "", date: "", class: "" });
  const [isTrue, setTrue] = useState(true);
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
    console.log(data);
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
                <option value="AC_S">AC_S</option>
                <option value="Snigdha">Snigdha</option>
                <option value="Shovon">Shovon</option>

                <option value="S_Chair">S_Chair</option>
              </select>
            </label>
          </div>
          <button disabled={!isTrue} className="btn my-5 btn-primary w-full">
            Search
          </button>
        </form>
      </div>
      <div className="lg:w-[45%]">
        <img className="w-full" src={getImage("banner", "bkash.png")} alt="" />
      </div>
    </section>
  );
};

export default SearchSection;
