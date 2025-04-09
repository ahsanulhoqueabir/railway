import { FaAngleRight } from "react-icons/fa6";
import getImage from "../../utilities/getimage";

const Instructions = () => {
  return (
    <section className="lg:flex justify-between gap-16 py-10 items-center">
      <div className="lg:w-[40%]">
        <img
          className="mx-auto pb-6"
          src={getImage("banner", "instructions.png")}
          alt=""
        />
      </div>
      <div className="lg:w-[60%]">
        <h2 className="text-[#2e635d] font-bold text-3xl">
          Instructions to Purchase Tickets
        </h2>

        <div className="space-y-4 mt-5">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-start  gap-4 "
            >
              <FaAngleRight className="w-[6%] text-[#2e635d]" />
              <p className="text-[#2e635d] font-medium w-[90%]">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Instructions;

const data = [
  "Tickets can be bought online ten days in advance.",
  "You can pay for the tickets using mobile financial services: Bkash, Nagad, Rocket, Upay or debit/credit cards: Mastercard, Visa, DBBL Nexus. Other payment options will be available soon.",
  "In case of payment or transaction failure, the deducted amount would be refunded by your bank or MFS provider within 8 business days.",
  "In case money has been deducted from your card / mobile wallet but you have not received a ticket confirmation, the deducted amount would be refunded by your bank or MFS provider within 8 business days.",
  "If you have not received your ticket copy in email, kindly check your Spam / Junk folder. You can also download your ticket copy from the purchase history of your account after you login.",
  "Download the official Rail Sheba app published by Bangladesh Railway from Google Play.",
  "In case of passengers downloading fake apps or any other app from Google Play which claim to sell train tickets of Bangladesh Railway, the authorities will not take any liability.",
];
