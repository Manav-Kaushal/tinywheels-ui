import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import { useField } from "formik";
import {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useEffect,
  useState,
} from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  Icon?: any;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  iconClassName?: string;
  // type?: "text" | "email" | "password" | "number";
  onIconClick?: () => void;
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  showCharacterCount?: boolean;
}

type InputFieldProps = InputProps & TextareaProps;

const Input: React.FC<InputFieldProps> = ({
  name,
  label,
  Icon,
  containerClassName,
  labelClassName,
  errorClassName,
  iconClassName,
  type,
  onIconClick,
  ...rest
}: InputFieldProps) => {
  const isTextarea = rest.hasOwnProperty("rows"); // Check if it's a textarea

  const [field, meta] = useField(name);
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleShowPassword = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  const hasError = meta.touched && meta.error;

  const containerClasses = classNames(
    "relative select-none",
    containerClassName,
    hasError ? "error" : ""
  );

  const labelClasses = classNames(
    "absolute px-2 duration-200 origin-0 transform text-gray-400 cursor-text rounded-md",
    isFocused || !!field.value || field.value == "0"
      ? "text-sm -top-2.5 left-2 text-gray-500 bg-white"
      : "top-3 left-2",
    rest.required ? "after:content-['*'] after:inline after:ml-1" : "",
    labelClassName
  );

  const inputClasses = classNames(
    "block w-full border border-gray-300 focus:border-primary/50 px-3 py-3 rounded-md appearance-none outline-none focus:outline-none duration-200 text-gray-600",
    hasError ? "border-red-500" : "",
    isTextarea ? "" : "h-[50px]",
    rest.className
  );

  const errorClasses = classNames("text-red-500 text-sm mt-1", errorClassName);

  const iconClasses = classNames(
    "absolute w-5 h-5 text-gray-400 hover:text-gray-500 duration-200 -translate-y-1/2 cursor-pointer right-3 top-1/2",
    iconClassName
  );

  const charCountClasses = "absolute text-xs text-neutral-400 bottom-1 right-2";

  useEffect(() => {
    if (rest.value) {
      setIsFocused(true);
    } else {
      setIsFocused(false);
    }
  }, [rest.value]);

  return (
    <>
      <div className={containerClasses}>
        {isTextarea ? (
          <>
            <textarea
              {...field}
              {...rest}
              id={name}
              name={name}
              className={inputClasses}
              onFocus={handleFocus}
              onBlur={handleBlur}
              maxLength={rest.maxLength || 500}
            />
            <label htmlFor={name} className={labelClasses}>
              {label}
            </label>
            {rest.maxLength && (
              <span className={charCountClasses}>
                {field.value.length}/{rest.maxLength || 500}
              </span>
            )}
          </>
        ) : (
          <>
            <input
              {...field}
              {...rest}
              id={name}
              name={name}
              type={
                type === "password"
                  ? showPassword
                    ? "text"
                    : "password"
                  : type
              }
              className={inputClasses}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onWheel={(e: any) => {
                if (type === "number") {
                  e.target.blur();
                }
              }}
              maxLength={rest.maxLength || 500}
            />
            {type === "password" ? (
              <div className={iconClasses}>
                {showPassword ? (
                  <EyeSlashIcon onClick={handleShowPassword} />
                ) : (
                  <EyeIcon onClick={handleShowPassword} />
                )}
              </div>
            ) : (
              <>
                {Icon ? (
                  <div className={iconClasses}>
                    <Icon onClick={onIconClick} />
                  </div>
                ) : null}
              </>
            )}
            <label htmlFor={name} className={labelClasses}>
              {label}
            </label>
            {rest.maxLength && (
              <span className={charCountClasses}>
                {field.value.length}/{rest.maxLength || 500}
              </span>
            )}
          </>
        )}
      </div>
      {hasError && <p className={errorClasses}>{meta.error}</p>}
    </>
  );
};

export default Input;
