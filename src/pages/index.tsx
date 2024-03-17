import BingoCard from "@/components/BingoTile";
import { useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { useSpring, animated } from "react-spring";

const Home = () => {
  const [bingo, setBingo] = useState(false);

  const styles = useSpring({
    from: { background: "lightblue" },
    to: async (next) => {
      while (true) {
        await next({ background: "lightgreen" });
        await next({ background: "lightblue" });
      }
    },
  });
  return (
    <div className="flex items-center justify-center min-h-screen w-full ">
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>

        {bingo && (
          <div className="absolute right-[50%] top-0">
            <ConfettiExplosion
              force={0.8}
              duration={3000}
              particleCount={250}
            />
          </div>
        )}
        <div className="mx-auto w-full flex justify-center items-center absolute h-full">
          <BingoCard setBingo={setBingo} />
        </div>
      </div>
    </div>
  );
};

export default Home;
