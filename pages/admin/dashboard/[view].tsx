import SideLayout from "@components/Layouts/SideLayout";
import BrandsView from "@src/sections/Dashboard/Brands";
import ProductsView from "@src/sections/Dashboard/Products";
import UsersView from "@src/sections/Dashboard/Users";
import { DashboardRoutesEnums } from "@utils/enums/DashboardRoutesEnums";
import { NextPageContext } from "next";
import { useSession } from "next-auth/react";

type Props = {
  view: DashboardRoutesEnums;
};

const Dashboard = ({ view }: Props) => {
  const { data: session } = useSession();

  const getRenderView = () => {
    switch (view) {
      case DashboardRoutesEnums.OVERVIEW:
        return "Overview";
      case DashboardRoutesEnums.USERS:
        return <UsersView user={session?.user} />;
      case DashboardRoutesEnums.BRANDS:
        return <BrandsView user={session?.user} />;
      case DashboardRoutesEnums.PRODUCTS:
        return <ProductsView user={session?.user} />;
      default:
        return "Please select from left";
    }
  };

  return <div>{getRenderView()}</div>;
};

Dashboard.Layout = SideLayout;

Dashboard.getInitialProps = async (ctx: NextPageContext) => {
  const { query } = ctx;

  return { view: query.view };
};

export default Dashboard;
