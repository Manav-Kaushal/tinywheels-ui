import { Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { Fragment, useRef } from "react";

type Size = "sm" | "md" | "lg";

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  title: string | React.ReactNode;
  children: React.ReactNode;
  size?: Size;
};

const Sizes = {
  sm: "w-[320px]",
  md: "w-[420px]",
  lg: "w-[520px]",
};

const Drawer = ({
  open,
  onClose,
  children,
  title,
  size = "md",
}: DrawerProps) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  const handleTransitionEnd = () => {
    if (!open && drawerRef.current) {
      drawerRef.current.scrollTop = 0;
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <div className="fixed inset-0 z-50 overflow-hidden">
        <Transition.Child
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="absolute inset-0 bg-black bg-opacity-40 "
            onClick={onClose}
          />
        </Transition.Child>

        <Transition.Child
          enter="transition-transform ease-in-out duration-300"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition-transform ease-in-out duration-300"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
          className={classNames(
            "fixed inset-y-0 right-0 z-50 max-w-full overflow-y-auto bg-white",
            Sizes[size]
          )}
          onTransitionEnd={handleTransitionEnd}
          ref={drawerRef}
        >
          <div className="flex items-center justify-between px-4 py-4 text-lg font-medium text-gray-900 border border-b shadow">
            <span className="capitalize">{title}</span>
            <XMarkIcon
              className="w-5 h-5 duration-200 cursor-pointer hover:text-red-500"
              onClick={onClose}
            />
          </div>
          <div className="p-4 mt-4">{children}</div>
        </Transition.Child>
      </div>
    </Transition.Root>
  );
};

export default Drawer;
