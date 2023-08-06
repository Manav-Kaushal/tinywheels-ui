import Typography from "@components/Typography";
import { signIn, signOut, useSession } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();
  console.log({ session });

  return (
    <div className="dark:bg-gray-800">
      <Typography variant="heading">Main</Typography>
      {!session?.expires ? (
        <button
          onClick={() => {
            signIn();
          }}
        >
          Login
        </button>
      ) : (
        <button
          onClick={() => {
            signOut();
          }}
        >
          Signout
        </button>
      )}
    </div>
  );
};

export default Home;
