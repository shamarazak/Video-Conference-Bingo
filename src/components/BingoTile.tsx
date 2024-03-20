import React, { useEffect, useState } from "react";
import { Phrases } from "../../constants/phrases";
import ConfettiExplosion from "react-confetti-explosion";

interface Slot {
  id: number;
  text: string;
  marked: boolean;
}

const FREE_SLOT = "CONF CALL 😁 BINGO";
const SIZE = 5;
const PARSED_SIZE = SIZE % 2 === 0 ? SIZE - 1 : SIZE;
const FREE_SLOT_STYLE = "bg-blue-500";
const MARKED_STYLE =
  "line-through bg-blue-500 bg-opacity-80 border border-white border-opacity-10";
const BINGO_STYLE =
  MARKED_STYLE + "border-opacity-100 font-semibold bg-opacity-100 bg-blue-600";
const DEFAULT =
  "bg-blue-500 bg-opacity-20 border border-white border-opacity-30 ";

//Check if two arrays are equal
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

//Generate all possible winning patterns
const generateWinningPatterns = () => {
  const rows: number[][] = [];
  const columns: number[][] = [];
  const diagonals: number[][] = [[], []];

  //Generate rows and columns
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

  //Generate diagonals
  for (let i = 0; i < PARSED_SIZE; i++) {
    diagonals[0].push(i * (PARSED_SIZE + 1));
    diagonals[1].push((i + 1) * (PARSED_SIZE - 1));
  }

  return [...rows, ...columns, ...diagonals];
};

//Shuffle an array
const shuffle = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const BingoCard: React.FC<{}> = () => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [winningPatterns, setWinningPatterns] = useState<number[][]>([]);
  const [foundPatterns, setFoundPatterns] = useState<number[][]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    initialSettings();
  }, []);

  const allPatternsCleared =
    winningPatterns.length > 0 &&
    foundPatterns.length === winningPatterns.length;

  useEffect(() => {
    if (allPatternsCleared) {
      setShowConfetti(true);
    }
  }, [allPatternsCleared]);

  //Initialize the bingo cards
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

    //Create new slots based on shuffled phrases
    const newSlots = newPhrases.map((phrase, index) => ({
      id: index,
      text: phrase,
      marked: index === middleIndex,
    }));

    const patterns = generateWinningPatterns();
    setWinningPatterns(patterns);
    setSlots(newSlots);
  };

  //Mark or unmark a slot and check if it is bingo already
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
      setFoundPatterns((prev) => [...prev, ...newPatterns]);
    }
  };

  const handleReset = () => {
    initialSettings();
    setFoundPatterns([]);
    setShowConfetti(false);
  };

  return (
    <div className="lg:w-[70%] mx-auto">
      {!allPatternsCleared ? (
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
                className={`ripple tile p-3 cursor-pointer lg:min-h-[120px] flex items-center justify-center lg:aspect-auto aspect-square ${
                  text === FREE_SLOT
                    ? FREE_SLOT_STYLE
                    : isPartOfBingo
                    ? marked && text !== FREE_SLOT
                      ? BINGO_STYLE
                      : DEFAULT
                    : text !== FREE_SLOT && marked
                    ? MARKED_STYLE
                    : DEFAULT
                } `}
                onClick={() => text !== FREE_SLOT && markCell(id)}
              >
                <p>{text}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <>
          {showConfetti && (
            <div className="absolute right-[50%] top-0 ">
              <ConfettiExplosion
                className="z-30"
                force={0.8}
                duration={1500}
                particleCount={150}
                onComplete={() => setShowConfetti(false)}
              />
            </div>
          )}
          <div className="flex justify-center items-center">
            <p className="bingo-text text-[#f9c430]">BINGO!</p>
          </div>
          <div className="flex justify-center mt-3">
            {slots.length > 0 && (
              <button
                className="text-white border-none px-6 py-3 text-[calc(1vw+3px)] uppercase cursor-pointer  rounded-md shadow-md outline-none bg-blue-500 ripple"
                onClick={() => handleReset()}
              >
                Restart
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default BingoCard;
