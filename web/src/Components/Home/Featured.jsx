import getImage from "../../utilities/getimage";

const Featured = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:gap-36 gap-20 items-center py-10 ">
      {data.map((item, index) => (
        <div
          key={index}
          className="space-y-3 flex-col items-center justify-center mx-auto text-center"
        >
          <img
            className="mx-auto"
            src={getImage(item.folder, item.image)}
            alt=""
          />
          <h1 className="text-2xl font-bold">{item.title}</h1>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Featured;

const data = [
  {
    id: 1,
    title: "Search",
    image: "search.svg",
    folder: "photos",
    description:
      "Choose your origin, destination, journey dates and search for trains",
  },
  {
    id: 2,
    title: "Select",
    image: "select.svg",
    folder: "photos",
    description: "Select your desired trip and choose your seats",
  },
  {
    id: 3,
    title: "Pay",
    image: "pay.svg",
    folder: "photos",
    description: "Pay for the tickets via Debit / Credit Cards or MFS",
  },
];
