import Typography from "@components/Typography";
import { signIn } from "next-auth/react";

const Home = () => {
  return (
    <div className="dark:bg-gray-800">
      <Typography variant="heading">Main</Typography>
      <button
        onClick={() => {
          signIn();
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Home;
