import Footer from "@components/Footer";
import { useSession } from "next-auth/react";
import React from "react";
import Header from "../Header";

type Props = {
  children: React.ReactNode;
};

const BaseLayout = ({ children }: Props) => {
  const { data: session } = useSession();

  return (
    <>
      <Header user={session?.user} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default BaseLayout;
