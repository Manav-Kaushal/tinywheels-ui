import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { classNames } from "@utils/helpers";
import { useEffect, useRef, useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  options: Option[];
  defaultValue?: string;
  value?: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  defaultValue = "",
  value = "",
  onChange,
  required = false,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value: string) => {
    const option = options.find((opt) => opt.value === value);
    if (option) {
      setSelectedValue(option.label);
      onChange(value);
    }
    setIsOpen(false);
  };

  const handleClear = () => {
    setSelectedValue("");
    onChange("");
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (value) {
      const option = options.find((opt) => opt.value === value.toString());
      if (option) {
        setSelectedValue(option.label);
      }
    } else {
      setSelectedValue("");
    }
  }, [value, options]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={selectRef}>
      <label
        className={classNames(
          "px-2 text-base absolute transition__200 origin-0 transform bg-white rounded-md",
          isFocused || selectedValue
            ? "-top-2.5 left-2 text-sm text-gray-500"
            : "top-3 left-2 text-gray-400"
        )}
      >
        {label} {required ? " *" : ""}
      </label>
      <button
        type="button"
        className="flex items-center justify-between w-full px-4 py-3.5 h-[50px] text-gray-600 border border-gray-300 rounded-md outline-none appearance-none focus:border-primary/50 focus:outline-none transition__300"
        onClick={handleToggle}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <span>{selectedValue}</span>
        <div className="flex items-center space-x-2">
          {selectedValue && (
            <div
              className="p-1 ml-2 rounded-full hover:bg-gray-200 focus:outline-none"
              onClick={handleClear}
            >
              <XMarkIcon className="w-4 h-4 text-gray-500" />
            </div>
          )}
          <ChevronDownIcon
            className={classNames(
              "w-5 h-5 text-gray-400 transition__200",
              isOpen ? "rotate-180" : ""
            )}
          />
        </div>
      </button>
      {isOpen && (
        <ul className="absolute z-10 w-full py-1 mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {!!options?.length ? (
            options.map((option) => (
              <li
                key={option.value}
                className={classNames(
                  "px-4 py-2 cursor-pointer hover:bg-gray-100",
                  option.label === selectedValue ? "bg-blue-100" : ""
                )}
                onClick={() => handleOptionClick(option.value)}
              >
                {option.label}
              </li>
            ))
          ) : (
            <li
              className={classNames("px-4 py-2 cursor-pointer text-gray-500")}
            >
              No Options Found
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Select;
