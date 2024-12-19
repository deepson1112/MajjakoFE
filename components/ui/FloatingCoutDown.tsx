import React from "react";
import Countdown from "react-countdown";

const FloatingCoutDown = () => {
  const christmasDate = new Date(new Date().getFullYear(), 11, 25);
  const targetDate =
    new Date() > christmasDate
      ? new Date(new Date().getFullYear() + 1, 11, 25)
      : christmasDate;

  return (
    <div className="fixed bottom-24  right-0 md:bottom-4 md:right-4">
      <div className="bg-white p-2 rounded-l-lg md:rounded-xl shadow-xl border">
        <h5 className="text-brand text-center">Launching In:</h5>
        <Countdown date={targetDate} renderer={renderer} />
      </div>
    </div>
  );
};

export default FloatingCoutDown;

const renderer = ({
  days,
  hours,
  minutes,
  seconds,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full">
      <div className="flex flex-col items-center bg-brand text-white p-3 rounded-xl">
        <div className="flex items-center gap-2">
          {!!days.toString()[0] ? (
            <span className=" text-sm md:text-lg bg-gradient-to-t from-white/10 to-white/70 p-1 rounded-md outline outline-white/20">
              {days.toString()[0]}
            </span>
          ) : null}
          {!!days.toString()[1] ? (
            <span className=" text-sm md:text-lg bg-gradient-to-t from-white/10 to-white/70 p-1 rounded-md outline outline-white/20">
              {days.toString()[1]}
            </span>
          ) : null}
        </div>

        <span className="text-xs">Days</span>
      </div>

      <div className="flex flex-col items-center bg-brand text-white p-3 rounded-xl">
        <div className="flex items-center gap-2">
          {!!hours.toString()[0] ? (
            <span className=" text-sm md:text-lg bg-gradient-to-t from-white/10 to-white/70 p-1 rounded-md outline outline-white/20">
              {hours.toString()[0]}
            </span>
          ) : null}
          {!!hours.toString()[1] ? (
            <span className=" text-sm md:text-lg bg-gradient-to-t from-white/10 to-white/70 p-1 rounded-md outline outline-white/20">
              {hours.toString()[1]}
            </span>
          ) : null}
        </div>
        <span className="text-xs">Hours</span>
      </div>

      <div className="hidden md:flex flex-col items-center bg-brand text-white p-3 rounded-xl">
        <div className="flex items-center gap-2">
          {!!minutes.toString()[0] ? (
            <span className=" text-sm md:text-lg bg-gradient-to-t from-white/10 to-white/70 p-1 rounded-md outline outline-white/20">
              {minutes.toString()[0]}
            </span>
          ) : null}

          {!!minutes.toString()[1] ? (
            <span className=" text-sm md:text-lg bg-gradient-to-t from-white/10 to-white/70 p-1 rounded-md outline outline-white/20">
              {minutes.toString()[1]}
            </span>
          ) : null}
        </div>
        <span className="text-xs">Minutes</span>
      </div>
    </div>
  );
};
