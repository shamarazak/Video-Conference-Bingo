import React, { useEffect, useMemo, useState } from "react";
import { Phrases } from "../../constants/phrases";

interface Slot {
  id: number;
  text: string;
  marked: boolean;
}
const FREE_SLOT = "CONF CALL 😁 BINGO";
// const Phrases = [
//   "Sorry, I couldn't log in",
//   "I had connection issues",
//   "Can you hear me?",
//   "You're on mute",
//   "Let's circle back to that later",
//   "Someone join the meeting late",
//   "Hello, hello?",
//   "Can everyone see my screen?",
//   "Let's take this offline",
//   "Is anyone else having problems?",
//   "Can you repeat that, please?",
//   "Background noise",
//   "Awkward silence",
//   "Sorry, I was on mute",
//   "Can you see my webcam?",
//   "Lost internet connection",
//   "(load painful echo / feedback)",
//   "Waiting for someone to join",
//   "Let's wrap this up",
//   "I'll follow up with an email",
//   "I'm having trouble with my connection.",
//   "Next slide, please.",
//   "can everyone go on mute",
//   "can you email that to everyone?",
//   //
//   "I think you're on mute",
//   "Can you turn on your camera?",
//   "I'll share my screen",
//   "Let's schedule another meeting",
//   "We're experiencing technical difficulties",
//   "Could you speak up?",
//   "Please raise your hand",
//   "Could you summarize that?",
//   "I have a bad connection",
//   "Can you see my pointer?",
//   "Waiting for someone to join",
//   "Let's wrap this up",
//   "I'll follow up with an email",
//   "I'm having trouble with my connection.",
//   "Next slide, please.",
//   "can everyone go on mute",
//   "can you email that to everyone?",
//   "I have a bad connection",
//   "Can you see my pointer?",
//   "Waiting for someone to join",
//   "Let's wrap this up",
//   "I'll follow up with an email",
//   "I'm having trouble with my connection.",
//   "Next slide, please.",
//   "can everyone go on mute",
//   "can you email that to everyone?",
//   "I have a bad connection",
//   "Can you see my pointer?",
//   "Waiting for someone to join",
//   "Let's wrap this up",
//   "I'll follow up with an email",
//   "I'm having trouble with my connection.",
//   "Next slide, please.",
//   "can everyone go on mute",
//   "can you email that to everyone?",
//   "Can you see my webcam?",
//   "Lost internet connection",
//   "(load painful echo / feedback)",
//   "Waiting for someone to join",
//   "Let's wrap this up",
//   "I'll follow up with an email",
//   "I'm having trouble with my connection.",
//   "Next slide, please.",
//   "can everyone go on mute",
//   "can you email that to everyone?",
//   "I'm having trouble with my connection.",
//   "Next slide, please.",
//   "can everyone go on mute",
//   "can you email that to everyone?",
//   "Can you see my webcam?",
//   "Lost internet connection",
//   "(load painful echo / feedback)",
//   "Waiting for someone to join",
//   "Let's wrap this up",
//   "I'll follow up with an email",
//   "I'm having trouble with my connection.",
//   "Next slide, please.",
//   "can everyone go on mute",
//   "can you email that to everyone?",
// ];

const arraysAreEqual = (array1: number[], array2: number[]): boolean => {
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

const SIZE = 5;
const PARSED_SIZE = SIZE % 2 === 0 ? SIZE - 1 : SIZE;

const generateWinningPatterns = (size: number) => {
  const rows: number[][] = [];
  const columns: number[][] = [];
  const diagonals: number[][] = [[], []];

  for (let i = 0; i < PARSED_SIZE; i++) {
    const row = [];
    const column = [];
    for (let j = 0; j < PARSED_SIZE; j++) {
      row.push(i * PARSED_SIZE + j);
      column.push(i + j * PARSED_SIZE);
    }
    rows.push(row);
    columns.push(column);
  }

  for (let i = 0; i < PARSED_SIZE; i++) {
    diagonals[0].push(i * (PARSED_SIZE + 1));
    diagonals[1].push((i + 1) * (PARSED_SIZE - 1));
  }

  return [...rows, ...columns, ...diagonals];
};
const BingoCard: React.FC<{
  setBingo: (value: boolean) => void;
}> = ({ setBingo }) => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [winningPatterns, setWinningPatterns] = useState<number[][]>([]);
  const [foundPatterns, setFoundPatterns] = useState<number[][]>([]);

  useEffect(() => {
    initialSettings();
  }, []);

  const initialSettings = () => {
    const shuffledPhrases = shuffle(
      Phrases.slice(0, PARSED_SIZE * PARSED_SIZE - 1)
    );

    const middleIndex = Math.floor(shuffledPhrases.length / 2);
    const newPhrases = [
      ...shuffledPhrases.slice(0, middleIndex),
      FREE_SLOT,
      ...shuffledPhrases.slice(middleIndex),
    ];

    const newSlots = newPhrases.map((phrase, index) => ({
      id: index,
      text: phrase,
      marked: index === middleIndex,
    }));
    const patterns = generateWinningPatterns(5);
    setWinningPatterns(patterns);
    setSlots(newSlots);
  };

  const shuffle = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const markCell = (index: number) => {
    if (slots[index].text !== FREE_SLOT) {
      const updatedSlots = [...slots];
      if (!slots[index].marked) {
        updatedSlots[index].marked = true;
      } else {
        updatedSlots[index].marked = false;

        const updatedFoundPatterns = foundPatterns.filter(
          (pattern) => !pattern.includes(index)
        );
        setFoundPatterns(updatedFoundPatterns);
      }
      setSlots(updatedSlots);
      checkBingo(updatedSlots);
    }
  };

  const checkBingo = (updatedSlots: Slot[]) => {
    let isBingo = false;
    let newPatterns: number[][] = [];

    for (const pattern of winningPatterns) {
      const isPatternComplete = pattern.every(
        (slotIndex) => updatedSlots[slotIndex].marked
      );

      if (
        isPatternComplete &&
        !foundPatterns.some((p) => arraysAreEqual(p, pattern))
      ) {
        isBingo = true;
        newPatterns.push(pattern);
      }
    }

    if (isBingo) {
      setBingo(isBingo);
      setFoundPatterns((prev) => [...prev, ...newPatterns]);
    }
  };

  const freeSlot = "bg-blue-500";
  const markedStyle =
    "line-through bg-blue-500 bg-opacity-80 border border-white border-opacity-10";
  const bingoStyle =
    markedStyle + "border-opacity-100 font-semibold bg-opacity-100 bg-blue-600";
  const normal =
    "bg-blue-500 bg-opacity-20 border border-white border-opacity-30 ";

  const handleReset = () => {
    initialSettings();
    setFoundPatterns([]);
  };

  return (
    <div className="lg:w-[70%] mx-auto">
      <div
        className={`grid h-fit text-white mx-3`}
        style={{
          gridTemplateColumns: `repeat(${PARSED_SIZE}, minmax(0, 1fr))`,
        }}
      >
        {slots.map(({ id, text, marked }) => {
          const isPartOfBingo = foundPatterns.some((pattern) =>
            pattern.includes(id)
          );

          return (
            <div
              key={id}
              className={`ripple tile p-3 cursor-pointer lg:min-h-[120px] flex items-center justify-center active:bg-blue-500 lg:aspect-auto aspect-square ${
                text === FREE_SLOT
                  ? freeSlot
                  : isPartOfBingo
                  ? marked && text !== FREE_SLOT
                    ? bingoStyle
                    : normal
                  : text !== FREE_SLOT && marked
                  ? markedStyle
                  : normal
              } `}
              onClick={() => text !== FREE_SLOT && markCell(id)}
            >
              <p>{text}</p>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center mt-3">
        <button
          className="ripple text-white border-none px-6 py-3 text-[calc(1vw+3px)] uppercase cursor-pointer bg-blue-500 rounded-md shadow-md outline-none"
          onClick={() => handleReset()}
        >
          Reset
        </button>
      </div>
    </div>
  );
};
export default BingoCard;
