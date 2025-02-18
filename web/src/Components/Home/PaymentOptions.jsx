import getImage from "../../utilities/getimage";

const PaymentOptions = () => {
  return (
    <div className="py-8">
      <hr />
      <div className="grid grid-cols-7 gap-4 py-4">
        {lists.map((list, index) => (
          <div key={index} className="flex items-center justify-center">
            <img
              src={getImage(list.folder, list.image)}
              alt={list.name}
              className="size-12 lg:size-24 object-contain  aspect-video"
            />
          </div>
        ))}
      </div>
      <hr />
      <p className="text-xs  lg:text-base text-center py-6 font-bold">
        The tickets are issued by Bangladesh Railway Integrated Ticketing System
        (BRITS) and Shohoz-Synesis-Vincen JV is responsible for designing,
        development, implementation, technical operation & maintenance of the
        system.
      </p>
    </div>
  );
};

export default PaymentOptions;

const lists = [
  {
    name: "bKash",
    image: "bkash.svg",
    folder: "payments",
  },
  {
    name: "Rocket",
    image: "rocket.svg",
    folder: "payments",
  },
  {
    name: "Nagad",
    image: "nagad.svg",
    folder: "payments",
  },
  {
    name: "visa",
    image: "visa.svg",
    folder: "payments",
  },
  {
    name: "master",
    image: "master.svg",
    folder: "payments",
  },
  {
    name: "nexus",
    image: "nexus.svg",
    folder: "payments",
  },
  {
    name: "upay",
    image: "upay.png",
    folder: "payments",
  },
];
