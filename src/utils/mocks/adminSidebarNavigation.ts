import {
  CubeIcon,
  RectangleGroupIcon,
  SquaresPlusIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { DashboardRoutesEnums } from "@utils/enums/DashboardRoutesEnums";

export const adminSidebarNavigation = [
  {
    children: [
      {
        title: DashboardRoutesEnums.OVERVIEW,
        link: "/admin/dashboard/" + DashboardRoutesEnums.OVERVIEW,
        Icon: RectangleGroupIcon,
      },
    ],
  },
  {
    title: "General",
    children: [
      {
        title: DashboardRoutesEnums.USERS,
        link: "/admin/dashboard/" + DashboardRoutesEnums.USERS,
        Icon: UserGroupIcon,
      },
    ],
  },
  {
    title: "Ecommerce Manager",
    children: [
      {
        title: DashboardRoutesEnums.CATEGORY,
        link: "/admin/dashboard/" + DashboardRoutesEnums.CATEGORY,
        Icon: SquaresPlusIcon,
      },
      {
        title: DashboardRoutesEnums.PRODUCTS,
        link: "/admin/dashboard/" + DashboardRoutesEnums.PRODUCTS,
        Icon: CubeIcon,
      },
    ],
  },
];
