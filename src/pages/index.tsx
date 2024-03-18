import BingoCard from "@/components/BingoTile";
import { useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";

const Home = () => {
  const [bingo, setBingo] = useState<any[]>([]);

  const handleExplosionComplete = (timestamp: any) => {
    setBingo((prev) => prev.filter((ts) => ts !== timestamp));
  };
  return (
    <div className="flex items-center justify-center min-h-screen w-full relative">
      <div className="area flex justify-center items-center h-full relative">
        <ul className="circles">
          {[...Array(10)].map((_, index) => (
            <li key={index}></li>
          ))}
        </ul>
        {bingo.length > 0 &&
          bingo.map((timestamp, index) => (
            <div key={index} className="absolute right-[50%] top-0 z-20">
              <ConfettiExplosion
                className="z-30"
                force={0.8}
                duration={2000}
                particleCount={250}
                onComplete={() => handleExplosionComplete(timestamp)}
              />
            </div>
          ))}
        <div className="mx-auto w-full flex justify-center items-center my-10 h-full z-0">
          <BingoCard setBingo={setBingo} />
        </div>
      </div>
    </div>
  );
};

export default Home;
