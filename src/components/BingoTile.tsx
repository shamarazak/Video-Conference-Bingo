import React from "react";
import { Phrase } from "../../types/phrase.interface";

const phrases: Phrase[] = [
  { id: 1, text: "Sorry, my cat/dog is interrupting." },
  { id: 2, text: "Hello, hello?" },
  { id: 3, text: "i need to jump in another call" },
  { id: 4, text: "can everyone go on mute" },
  { id: 5, text: "could you please get closer to the mic" },
  { id: 6, text: "(load painful echo / feedback)" },
  { id: 7, text: "Next slide, please." },
  { id: 8, text: "can we take this offline?" },
  { id: 9, text: "is ___ on the call?" },
  { id: 10, text: "Could you share the slides?" },
  { id: 11, text: "can sombody grant presenter rights?" },
  { id: 12, text: "can you email that to everyone?" },
  { id: 13, text: "CONF CALL 😁 BINGO" },
  { id: 14, text: "sorry, i didn't found the conference id" },
  { id: 15, text: "You will send the minutes?" },
  { id: 16, text: "Can you hear me?" },
  { id: 17, text: "Let's wrap this up." },
  { id: 18, text: "Let's put a pin in that." },
  { id: 19, text: "I'm having trouble with my connection." },
  { id: 20, text: "My camera isn't working." },
  { id: 21, text: "Who just joined?" },
  { id: 22, text: "Sorry, I got disconnected." },
  { id: 23, text: "(Child noise in the background)" },
  { id: 24, text: "Let me just share my screen." },
  { id: 25, text: "Let's wait for ____" },
];

const BingoCard = () => {
  return (
    <div className="grid grid-cols-5 justify-center items-center w-full madimi-one-regular lg:max-w-screen-sm lg:mx-auto mx-4 my-10 shadow-lg rounded-lg border bg-yellow-200 z-50">
      {phrases.map((phrase: Phrase, index: number) => (
        <div
          className=" relative text-green-800   aspect-square flex flex-col justify-center items-center  p-2 text-center text-[10px] lg:text-[16px] lg:text-base  overflow-hidden whitespace-normal"
          key={index}
        >
          <p className="absolute top-1 right-2 ">{index}</p>
          <div className="flex flex-grow items-center">
            <p>{phrase.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default BingoCard;
