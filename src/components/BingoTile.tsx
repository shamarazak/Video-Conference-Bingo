import React, { useEffect, useState } from "react";
import { Phrases } from "../../constants/phrases";
import { useReward } from "react-rewards";
import {
  arraysAreEqual,
  generateWinningPatterns,
  shuffle,
} from "../../helpers";
import BingoBanner from "./BingoBanner";

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

const BingoCard: React.FC<{}> = () => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [winningPatterns, setWinningPatterns] = useState<number[][]>([]);
  const [foundPatterns, setFoundPatterns] = useState<number[][]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const { reward } = useReward("rewardId", "confetti", {
    spread: 100,
    lifetime: 500,
    elementCount: 100,
    elementSize: 10,
  });
  const { reward: BingoReward } = useReward("bingoReward", "confetti", {
    elementCount: 200,
    elementSize: 20,
    lifetime: 300,
    spread: 150,
  });

  useEffect(() => {
    initialSettings();
  }, []);

  const isBingo = foundPatterns.length >= SIZE;

  useEffect(() => {
    if (isBingo) {
      BingoReward();
    }
  }, [isBingo]);

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

    const patterns = generateWinningPatterns(PARSED_SIZE);
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

  //Get styles for cells
  const getCellStyles = (
    text: string,
    marked: boolean,
    isPartOfBingo: boolean
  ): string => {
    if (text === FREE_SLOT) {
      return FREE_SLOT_STYLE;
    } else if (isPartOfBingo) {
      return marked && text !== FREE_SLOT ? BINGO_STYLE : DEFAULT;
    } else {
      return marked ? MARKED_STYLE : DEFAULT;
    }
  };

  const checkBingo = (updatedSlots: Slot[]) => {
    let newPatternFound = false;
    let newPatterns: number[][] = [];

    for (const pattern of winningPatterns) {
      const isPatternComplete = pattern.every(
        (slotIndex) => updatedSlots[slotIndex].marked
      );

      if (
        isPatternComplete &&
        !foundPatterns.some((p) => arraysAreEqual(p, pattern))
      ) {
        newPatternFound = true;
        newPatterns.push(pattern);
      }
    }
    if (newPatternFound) {
      reward();
      setFoundPatterns((prev) => [...prev, ...newPatterns]);
    }
  };

  //Restart the game
  const handleReset = () => {
    initialSettings();
    setFoundPatterns([]);
    setShowConfetti(false);
  };

  return (
    <div>
      <div className="lg:w-[70%] mx-auto">
        {!isBingo ? (
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
                  className={`ripple tile p-3 cursor-pointer lg:min-h-[120px] flex items-center justify-center lg:aspect-auto aspect-square ${getCellStyles(
                    text,
                    marked,
                    isPartOfBingo
                  )}`}
                  onClick={() => text !== FREE_SLOT && markCell(id)}
                >
                  <p>{text}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <>
            <BingoBanner slots={slots} handleReset={handleReset} />
          </>
        )}
      </div>
      {!isBingo && !showConfetti && (
        <span
          id="rewardId"
          className="absolute z-[100] w-full flex justify-center"
        />
      )}
    </div>
  );
};
export default BingoCard;
