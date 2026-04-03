import React, { useEffect, useState } from "react";

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hour: Math.floor((difference / (1000 * 60 * 60)) % 24),
        min: Math.floor((difference / 1000 / 60) % 60),
        sec: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = null; // expired
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return <span className="text-red-500 font-bold">Offer expired</span>;
  }

  const timeLabels = {
    days: "Days",
    hour: "Hour",
    min: "Min",
    sec: "Sec",
  };

  return (
    <div className="flex gap-1.5 items-center">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="flex flex-col items-center gap-0.5">
          <div className="bg-[#606060] text-white w-[45px] h-[50px] flex items-center justify-center rounded-md font-bold text-[18px] shadow-sm">
            {String(value).padStart(2, "0")}
          </div>
          <span className="text-[11px] text-gray-500 font-medium">
            {timeLabels[label]}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
