import SideLayout from "@components/Layouts/SideLayout";
import BrandsView from "@src/sections/Dashboard/Brands";
import ProductsView from "@src/sections/Dashboard/Products";
import { DashboardRoutesEnums } from "@utils/enums/DashboardRoutesEnums";
import { NextPageContext } from "next";

type Props = {
  view: DashboardRoutesEnums;
};

const Dashboard = ({ view }: Props) => {
  console.log({ view });

  const getRenderView = () => {
    switch (view) {
      case DashboardRoutesEnums.OVERVIEW:
        return "Overview";
      case DashboardRoutesEnums.USERS:
        return "Users";
      case DashboardRoutesEnums.BRANDS:
        return <BrandsView />;
      case DashboardRoutesEnums.PRODUCTS:
        return <ProductsView />;
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
