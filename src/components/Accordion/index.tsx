import { Disclosure, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { ReactNode } from "react";

type AccordionProps = {
  title: string;
  children: ReactNode;
};

const Accordion = ({ title, children }: AccordionProps) => {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex items-center justify-between w-full p-3 text-left rounded-md bg-primary-100/40">
            <h3>{title}</h3>
            <ChevronDownIcon
              className={classNames(
                open ? "-rotate-180" : "",
                "w-4 h-4 duration-200"
              )}
            />
          </Disclosure.Button>
          <Transition
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className="p-4">{children}</Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default Accordion;
