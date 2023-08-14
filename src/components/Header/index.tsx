import Drawer from "@components/Drawer";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Cog6ToothIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  PowerIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { appConfig } from "@utils/config";
import { RolesEnum } from "@utils/enums/Roles";
import { adminSidebarNavigation } from "@utils/mocks/adminSidebarNavigation";
import classNames from "classnames";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";

type HeaderProps = {
  user: any;
};

const Header: React.FC<HeaderProps> = ({ user }) => {
  const router = useRouter();
  const [showCart, setShowCart] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <nav
        className="flex items-center justify-between py-3 global-container"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/">
            <span className="sr-only">Your Company</span>
            <div className="relative aspect-[3.5/1] w-32">
              <Image
                src={appConfig.logo}
                alt="logo"
                className="object-contain object-center"
                fill
              />
            </div>
          </Link>
        </div>
        {/* <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="w-6 h-6" aria-hidden="true" />
          </button>
        </div> */}
        {/* <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <Popover.Button className="flex items-center text-sm font-semibold leading-6 text-gray-800 gap-x-1">
              Product
              <ChevronDownIcon
                className="flex-none w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-md mt-3 overflow-hidden bg-white shadow-lg -left-8 top-full rounded-3xl ring-1 ring-gray-900/5">
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="relative flex items-center p-4 text-sm leading-6 rounded-lg group gap-x-6 hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-center flex-none rounded-lg h-11 w-11 bg-gray-50 group-hover:bg-white">
                        <item.icon
                          className="w-6 h-6 text-gray-600 group-hover:text-indigo-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-auto">
                        <a
                          href={item.href}
                          className="block font-semibold text-gray-800"
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                  {callsToAction.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-800 hover:bg-gray-100"
                    >
                      <item.icon
                        className="flex-none w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          <a href="#" className="text-sm font-semibold leading-6 text-gray-800">
            Features
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-800">
            Marketplace
          </a>
          <Link
            href="#"
            className="text-sm font-semibold leading-6 text-gray-800"
          >
            Company
          </Link>
        </Popover.Group> */}
        <div className="flex items-center space-x-6">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-800 duration-200 cursor-pointer hover:text-primary-600" />
          <HeartIcon className="w-5 h-5 text-gray-800 duration-200 cursor-pointer hover:text-primary-600" />
          <ShoppingBagIcon
            className="w-5 h-5 text-gray-800 duration-200 cursor-pointer hover:text-primary-600"
            onClick={() => setShowCart(true)}
          />
          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-4">
            {user && user?.token ? (
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md bg-transparent text-xs font-semibold text-gray-900 shadow-sm">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-500 rounded-full">
                      <span className="font-medium leading-none text-white uppercase">
                        {user.name
                          .split(" ")
                          .map((word: string) => word.charAt(0))
                          .join("")}
                      </span>
                    </span>
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="text-sm absolute right-0 z-[100] w-40 mt-2 mr-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="p-1">
                      {[
                        {
                          id: 1,
                          label: "Manage Website",
                          onClick: () => {
                            router.push(
                              adminSidebarNavigation[0].children[0].link
                            );
                          },
                          allowedRoles: [
                            RolesEnum.ADMIN,
                            RolesEnum.DEVELOPER,
                            RolesEnum.TEAM,
                          ],
                          Icon: Cog6ToothIcon,
                        },
                        {
                          id: 2,
                          label: "Sign Out",
                          onClick: () => {
                            signOut({
                              redirect: true,
                              callbackUrl: appConfig.websiteUrl,
                            });
                          },
                          allowedRoles: [
                            RolesEnum.ADMIN,
                            RolesEnum.DEVELOPER,
                            RolesEnum.TEAM,
                            RolesEnum.CUSTOMER,
                          ],
                          Icon: PowerIcon,
                        },
                      ].map(
                        (item) =>
                          item.allowedRoles.includes(user.role) && (
                            <Menu.Item key={item.id}>
                              {({ active }) => (
                                <p
                                  className={classNames(
                                    active ? "bg-gray-200 pl-3" : "",
                                    "group flex w-full items-center rounded-md px-2 py-2 cursor-pointer transition-all duration-200 ease-in-out text-gray-900"
                                  )}
                                  onClick={item.onClick}
                                >
                                  <item.Icon className="w-4 h-4 mr-2" />{" "}
                                  {item.label}
                                </p>
                              )}
                            </Menu.Item>
                          )
                      )}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <p>
                <span className="text-sm link" onClick={() => signIn()}>
                  Log in
                </span>
                /
                <span
                  className="text-sm link"
                  onClick={() => router.push("/register")}
                >
                  Signup
                </span>
              </p>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full px-6 py-6 overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <div className="relative aspect-[4/1] w-32">
                <Image
                  src={appConfig.logo}
                  alt="logo"
                  className="object-contain object-center"
                  fill
                />
              </div>
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
          <div className="flow-root mt-6">
            <div className="-my-6 divide-y divide-gray-500/10">
              {/* <div className="py-6 space-y-2">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-800 hover:bg-gray-50">
                        Product
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180" : "",
                            "h-5 w-5 flex-none"
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...products, ...callsToAction].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-800 rounded-lg hover:bg-gray-50"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <a
                  href="#"
                  className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-800 rounded-lg hover:bg-gray-50"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-800 rounded-lg hover:bg-gray-50"
                >
                  Marketplace
                </a>
                <a
                  href="#"
                  className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-800 rounded-lg hover:bg-gray-50"
                >
                  Company
                </a>
              </div> */}
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-800 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>

      {/* Cart Drawer */}
      <Drawer
        title="My Cart"
        open={showCart}
        onClose={() => setShowCart(false)}
      >
        Test
      </Drawer>
    </header>
  );
};

export default Header;
