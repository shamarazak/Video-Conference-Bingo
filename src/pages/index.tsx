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
    // <animated.div className="background" style={styles}>
    <div className="flex items-center justify-center min-h-screen w-full ">
      {/* <svg preserveAspectRatio="xMidYMid slice" viewBox="10 10 80 80">
        <defs>
          <style>
            {`
            @keyframes rotate {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
            .out-top {
              animation: rotate 20s linear infinite;
              transform-origin: 13px 25px;
            }
            .in-top {
              animation: rotate 10s linear infinite;
              transform-origin: 13px 25px;
            }
            .out-bottom {
              animation: rotate 25s linear infinite;
              transform-origin: 84px 93px;
            }
            .in-bottom {
              animation: rotate 15s linear infinite;
              transform-origin: 84px 93px;
            }
          `}
          </style>
        </defs>
        <path
          fill="#9b5de5"
          className="out-top"
          d="M37-5C25.1-14.7,5.7-19.1-9.2-10-28.5,1.8-32.7,31.1-19.8,49c15.5,21.5,52.6,22,67.2,2.3C59.4,35,53.7,8.5,37-5Z"
        />
        <path
          fill="#f15bb5"
          className="in-top"
          d="M20.6,4.1C11.6,1.5-1.9,2.5-8,11.2-16.3,23.1-8.2,45.6,7.4,50S42.1,38.9,41,24.5C40.2,14.1,29.4,6.6,20.6,4.1Z"
        />
        <path
          fill="#00bbf9"
          className="out-bottom"
          d="M105.9,48.6c-12.4-8.2-29.3-4.8-39.4.8-23.4,12.8-37.7,51.9-19.1,74.1s63.9,15.3,76-5.6c7.6-13.3,1.8-31.1-2.3-43.8C117.6,63.3,114.7,54.3,105.9,48.6Z"
        />
        <path
          fill="#00f5d4"
          className="in-bottom"
          d="M102,67.1c-9.6-6.1-22-3.1-29.5,2-15.4,10.7-19.6,37.5-7.6,47.8s35.9,3.9,44.5-12.5C115.5,92.6,113.9,74.6,102,67.1Z"
        />
      </svg> */}
      {bingo && (
        <div className="absolute right-[50%] top-0">
          <ConfettiExplosion force={0.8} duration={3000} particleCount={250} />
        </div>
      )}
      <BingoCard setBingo={setBingo} bingo={bingo} />
    </div>
    // </animated.div>
  );
};

export default Home;
