// import React from "react";
import { Card, CardContent } from "@/Components/ui/card";

const seats = Array.from({ length: 32 }, (_, i) => i + 1);

const SeatPlan = () => {
  const renderSeatRow = (seatNumbers: number[]) => (
    <div className={`flex gap-10 `}>
      <div className="flex flex-row gap-2">
        <Seat number={seatNumbers[0]} />
        <Seat number={seatNumbers[1]} />
      </div>
      <div className="flex flex-row gap-2">
        <Seat number={seatNumbers[2]} />
        <Seat number={seatNumbers[3]} />
      </div>
    </div>
  );

  const getSeatName = (index: number) => {
    const position = index % 4;
    if (position === 0 || position === 3) return `W${index + 1}`; // Window seats
    return `P${index + 1}`; // Passenger seats
  };

  const Seat = ({ number }: { number: number }) => {
    const seatName = getSeatName(number - 1);
    const handleSeat = () => {
      console.log(`Seat ${seatName} clicked`);
    };
    return (
      <div
        onClick={handleSeat}
        className="btn hover:outline-blue-700 w-10 h-10 flex items-center justify-center bg-green-100 border rounded-md text-sm"
      >
        {seatName}
      </div>
    );
  };

  const front = [];
  const back = [];

  for (let i = 0; i < 8; i++) {
    const start = i * 4;
    if (i < 4) {
      front.push(renderSeatRow(seats.slice(start, start + 4)));
    } else {
      back.push(renderSeatRow(seats.slice(start, start + 4)));
    }
  }

  return (
    <Card className="max-w-md mx-auto mt-10 p-4 rounded-2xl shadow-xl">
      <CardContent className="px-0">
        <div className="flex flex-col gap-10 items-center">
          <div className="flex flex-col gap-4 items-center">
            {front.map((row, idx) => (
              <div key={idx} className="w-full flex justify-center">
                {row}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4 items-center">
            {back.map((row, idx) => (
              <div key={idx} className="w-full flex justify-center">
                {row}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SeatPlan;
