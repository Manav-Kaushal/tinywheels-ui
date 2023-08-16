import SideLayout from "@components/Layouts/SideLayout";
import BrandsView from "@src/sections/Dashboard/Brands";
import ProductsView from "@src/sections/Dashboard/Products";
import UsersView from "@src/sections/Dashboard/Users";
import { DashboardRoutesEnums } from "@utils/enums/DashboardRoutesEnums";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]";

type Props = {
  view: DashboardRoutesEnums;
  user: any;
};

const Dashboard = ({ view, user }: Props) => {
  const getRenderView = () => {
    switch (view) {
      case DashboardRoutesEnums.OVERVIEW:
        return "Overview";
      case DashboardRoutesEnums.USERS:
        return <UsersView user={user} />;
      case DashboardRoutesEnums.BRANDS:
        return <BrandsView user={user} />;
      case DashboardRoutesEnums.PRODUCTS:
        return <ProductsView user={user} />;
      default:
        return "Please select from left";
    }
  };

  return <div>{getRenderView()}</div>;
};

Dashboard.Layout = SideLayout;

export async function getServerSideProps(ctx: {
  req?: any;
  res?: any;
  query?: any;
}) {
  const { query } = ctx;
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (session?.user) {
    return { props: { view: query.view, user: session.user } };
  }
  return { props: { notFound: true } };
}

export default Dashboard;
