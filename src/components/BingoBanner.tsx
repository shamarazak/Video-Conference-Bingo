import React from "react";

interface BingoBannerProps {
  slots: Slot[];
  handleReset: () => void;
}

export default function BingoBanner({ slots, handleReset }: BingoBannerProps) {
  return (
    <>
      <div className="absolute right-[50%] top-0">
        <span
          id="bingoReward"
          className=" z-[100] w-full flex absolute right-[50%] top-0 justify-center"
        />
      </div>
      <div className="flex justify-center items-center">
        <p className="bingo-text font-bingo text-[#f9c430]">BINGO!</p>
      </div>
      <div className="flex justify-center mt-3">
        {slots.length > 0 && (
          <button
            className="text-white border-none px-6 py-3 text-[calc(1vw+3px)] uppercase cursor-pointer  rounded-md shadow-md outline-none bg-blue-500 ripple"
            onClick={handleReset}
          >
            Restart
          </button>
        )}
      </div>
    </>
  );
}
