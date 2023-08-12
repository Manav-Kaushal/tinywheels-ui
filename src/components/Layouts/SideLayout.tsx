import { adminSidebarNavigation } from "@utils/mocks/adminSidebarNavigation";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import Header from "../Header";

type Props = {
  children: React.ReactNode;
};

const SideLayout = ({ children }: Props) => {
  const router = useRouter();
  const { data: session } = useSession();

  const renderMenuItems = (items: any[]) => {
    return (
      <ul className="p-2 space-y-2 text-sm">
        {items.map((item, index) => (
          <li key={index}>
            <p className="font-medium">{item.title}</p>
            {item.children && (
              <ul className="mt-2">
                {item.children.map((child: any, childIndex: number) => (
                  <li
                    key={childIndex}
                    onClick={() => router.push(child.link)}
                    className={classNames(
                      "flex items-center space-x-2 p-3 capitalize cursor-pointer duration-300 rounded-md ",
                      router.asPath === child.link
                        ? "pl-6 bg-primary-700 shadow text-white"
                        : "hover:bg-silver-200 hover:pl-6"
                    )}
                  >
                    <child.Icon className="w-5 h-5" />
                    <span>{child.title}</span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <Header user={session?.user} />
      <div className="h-56 pt-8 text-white bg-primary-700 global-container">
        <h3 className="text-4xl">Manage Website</h3>
      </div>
      <div className="relative -mt-32 global-container">
        <div className="grid grid-cols-10 gap-8 h-full min-h-[80vh] max-h-[80vh]">
          <aside className="col-span-2">
            <div className="h-full p-2 bg-white rounded-lg shadow-lg">
              <nav>{renderMenuItems(adminSidebarNavigation)}</nav>
            </div>
          </aside>
          <div className="col-span-8">
            <div className="h-full p-4 bg-white rounded-lg shadow-lg">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideLayout;
