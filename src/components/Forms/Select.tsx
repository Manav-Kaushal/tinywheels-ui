import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useField } from "formik";
import React, { Fragment, useEffect, useState } from "react";

interface Option {
  value: string | boolean;
  label: string;
}

interface SelectProps {
  name: string;
  label: string;
  options: Option[];
  required?: boolean;
}

const Select: React.FC<SelectProps> = ({ name, label, options, required }) => {
  const [field, meta, helpers] = useField(name);

  const [selected, setSelected] = useState<Option | null>(null);

  const handleSelect = (option: Option) => {
    setSelected(option);
    helpers.setValue(option.value);
  };

  useEffect(() => {
    setSelected(
      options?.find((option) => option.value == field.value) || options[0]
    );
  }, [options]);

  return (
    <div className="relative mt-1">
      <Listbox value={selected} onChange={handleSelect}>
        {({ open }) => (
          <div className="relative mt-2">
            <Listbox.Button className="relative block w-full px-3 py-3 text-gray-600 duration-200 border border-gray-300 rounded-md outline-none appearance-none focus:border-primary/50 focus:outline-none">
              <span className="block text-left truncate">
                {selected?.label}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronUpDownIcon
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
              <label
                htmlFor={name}
                className={classNames(
                  "absolute px-2 duration-200 origin-0 transform text-gray-400 cursor-text rounded-md",
                  !!field.value || field.value == "0"
                    ? "text-sm -top-2.5 left-2 text-gray-500 bg-white"
                    : "top-3 left-2",
                  required ? "after:content-['*'] after:inline after:ml-1" : ""
                )}
              >
                {label}
              </label>
            </Listbox.Button>
            <Transition
              as={Fragment}
              show={open}
              enter="transition ease-out duration-100"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition ease-in duration-75"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 w-full p-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg avw-full max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options?.map((option) => (
                  <Listbox.Option
                    key={option.label}
                    className={({ active }) =>
                      `${
                        active
                          ? "cursor-pointer select-none py-2 pl-10 pr-4 bg-primary-100 text-primary-900"
                          : "cursor-pointer select-none py-2 pl-10 pr-4 text-gray-900"
                      }`
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <div className="relative flex items-center space-x-3">
                        <span
                          className={classNames(
                            selected ? "font-medium" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {option.label}
                        </span>
                        {selected ? (
                          <span
                            className={classNames(
                              "absolute inset-y-0 -left-12 flex items-center pl-1.5 text-primary-600"
                            )}
                          >
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </div>
  );
};

export default Select;
