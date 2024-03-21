import BingoCard from "@/components/BingoTile";

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen w-full relative">
      <div className="area flex justify-center items-center h-full relative">
        <ul className="circles">
          {[...Array(10)].map((_, index) => (
            <li key={index}></li>
          ))}
        </ul>

        <div className="mx-auto w-full flex justify-center items-center my-10 h-full z-30">
          <BingoCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
