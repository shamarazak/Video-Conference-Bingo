import React, { useEffect, useState } from "react";
import { Phrase } from "../../types/phrase.interface";
import { useSpring, animated } from "react-spring";
import ConfettiExplosion from "react-confetti-explosion";
interface Slot {
  id: number;
  text: string;
  marked: boolean;
}
const phrases = [
  "Sorry, I couldn't log in",
  "I had connection issues",
  "Can you hear me?",
  "You're on mute",
  "Let's circle back to that later",
  "Someone join the meeting late",
  "Technical difficulties",
  "Can everyone see my screen?",
  "Let's take this offline",
  "Is anyone else having problems?",
  "Can you repeat that, please?",
  "Background noise",
  "Awkward silence",
  "Sorry, I was on mute",
  "Can you see my webcam?",
  "Lost internet connection",
  "Echo/Feedback",
  "Waiting for someone to join",
  "Let's wrap this up",
  "I'll follow up with an email",
  "I'm having trouble with my connection.",
  "Next slide, please.",
  "can everyone go on mute",
  "can you email that to everyone?",
];

const generateWinningPatterns = (size: number) => {
  const rows: number[][] = [];
  const columns: number[][] = [];
  const diagonals: number[][] = [[], []];

  for (let i = 0; i < size; i++) {
    const row = [];
    const column = [];
    for (let j = 0; j < size; j++) {
      row.push(i * size + j);
      column.push(i + j * size);
    }
    rows.push(row);
    columns.push(column);
  }

  for (let i = 0; i < size; i++) {
    diagonals[0].push(i * (size + 1));
    diagonals[1].push((i + 1) * (size - 1));
  }

  return [...rows, ...columns, ...diagonals];
};
const arraysAreEqual = (array1: any[], array2: any[]): boolean => {
  if (array1.length !== array2.length) {
    return false;
  }

  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }

  return true;
};
const BingoCard = ({ setBingo, bingo }: any) => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [winningPatterns, setWinningPatterns] = useState<number[][]>([]);
  const [foundPatterns, setFoundPatterns] = useState<number[][]>([]);
  useEffect(() => {
    const shuffledPhrases = shuffle(phrases);
    const middleIndex = 12;
    const newPhrases = [
      ...shuffledPhrases.slice(0, middleIndex),
      "Free Space",
      ...shuffledPhrases.slice(middleIndex),
    ];
    const newSlots = newPhrases.map((phrase, index) => ({
      id: index,
      text: phrase,
      marked: index === middleIndex,
    }));
    setSlots(newSlots);
    const patterns = generateWinningPatterns(5);
    setWinningPatterns(patterns);
  }, []);

  const shuffle = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const markCell = (index: number) => {
    if (slots[index].text !== "Free Space") {
      const updatedSlots = [...slots];
      if (!slots[index].marked) {
        updatedSlots[index].marked = true;
      } else {
        updatedSlots[index].marked = false;
      }
      setSlots(updatedSlots);
      checkBingo(updatedSlots);
    }
  };

  const checkBingo = (updatedSlots: Slot[]) => {
    let isBingo = false;
    let isNewPattern = false;
    console.log({ updatedSlots });
    for (const pattern of winningPatterns) {
      const isPatternComplete = pattern.every(
        (slotIndex) => updatedSlots[slotIndex].marked
      );
      console.log(foundPatterns);
      if (
        isPatternComplete &&
        !foundPatterns.some((p) => arraysAreEqual(p, pattern))
      ) {
        isBingo = true;
        isNewPattern = true;
        setFoundPatterns([...foundPatterns, pattern]);
        break;
      }
    }
    setBingo(isBingo);
    if (isNewPattern) {
      setTimeout(() => setBingo(false), 3000); // Show bingo for 3 seconds
    }
  };

  console.log(bingo);

  return (
    <div className="bingo-card grid grid-cols-5 gap-4">
      {slots.map(({ id, text, marked }) => (
        <div
          key={id}
          className={`bingo-cell p-4 border border-gray-300 rounded-md text-center ${
            marked ? "bg-green-200" : ""
          }`}
          onClick={() => markCell(id)}
        >
          {text}
        </div>
      ))}

      {/* {bingo && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p className="text-xl font-semibold text-green-500">BINGO!</p>
          </div>
        </div>
      )} */}
    </div>
  );
};
export default BingoCard;
