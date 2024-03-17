import React, { useEffect, useState } from "react";

interface Slot {
  id: number;
  text: string;
  marked: boolean;
}
const FreeSlot = "CONF CALL 😁 BINGO";
const phrases = [
  "Sorry, I couldn't log in",
  "I had connection issues",
  "Can you hear me?",
  "You're on mute",
  "Let's circle back to that later",
  "Someone join the meeting late",
  "Hello, hello?",
  "Can everyone see my screen?",
  "Let's take this offline",
  "Is anyone else having problems?",
  "Can you repeat that, please?",
  "Background noise",
  "Awkward silence",
  "Sorry, I was on mute",
  "Can you see my webcam?",
  "Lost internet connection",
  "(load painful echo / feedback)",
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
      FreeSlot,
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
    if (slots[index].text !== FreeSlot) {
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

  const markedStyle =
    "line-through bg-blue-500 bg-opacity-80 border border-white border-opacity-10";
  const bingoStyle =
    markedStyle + "border-opacity-100 font-bold bg-opacity-100 bg-blue-600";
  const normal =
    "bg-blue-500 bg-opacity-20 border border-white border-opacity-30 ";

  return (
    <div className="grid grid-cols-5 lg:w-[60%] h-fit text-white ">
      {slots.map(({ id, text, marked }) => {
        const isPartOfBingo = foundPatterns.some((pattern) =>
          pattern.includes(id)
        );
        console.log(isPartOfBingo);
        return (
          <div
            key={id}
            className={`tile p-3 cursor-pointer lg:min-h-[120px] flex items-center justify-center active:bg-blue-500 ${
              isPartOfBingo
                ? marked && text !== FreeSlot
                  ? bingoStyle
                  : normal
                : text !== FreeSlot && marked
                ? markedStyle
                : normal
            } `}
            onClick={() => text !== FreeSlot && markCell(id)}
          >
            <p>{text}</p>
          </div>
        );
      })}
    </div>
  );
};
export default BingoCard;
