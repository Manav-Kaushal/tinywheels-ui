import { Hero } from "@src/sections/home/Hero";
import TrendingItems from "@src/sections/home/TrendingItems";

const Home = () => {
  return (
    <div className="dark:bg-gray-800">
      <Hero />
      <TrendingItems />
    </div>
  );
};

export default Home;
