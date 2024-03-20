import BingoCard from "@/components/BingoTile";
import { useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";

const Home = () => {
  const [bingo, setBingo] = useState<number[]>([]);

  return (
    <div className="flex items-center justify-center min-h-screen w-full relative">
      <div className="area flex justify-center items-center h-full relative">
        <ul className="circles">
          {[...Array(10)].map((_, index) => (
            <li key={index}></li>
          ))}
        </ul>
        {bingo &&
          bingo.length > 0 &&
          bingo.map((timestamp, index) => (
            <div className="absolute right-[50%] top-0" key={index}>
              <ConfettiExplosion
                className="z-30"
                force={0.5} // Adjust the force as needed
                duration={1500} // Lower the duration
                particleCount={100} // Reduce the particle count
                onComplete={() =>
                  setBingo((prev) => prev.filter((ts) => ts !== timestamp))
                }
              />
            </div>
          ))}
        <div className="mx-auto w-full flex justify-center items-center my-10 h-full z-30">
          <BingoCard setBingo={setBingo} />
        </div>
      </div>
    </div>
  );
};

export default Home;
