import classNames from "classnames";
import React, { ElementType } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string | React.ReactNode;
  variant?: "primary" | "danger" | "success" | "black";
  center?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  Icon?: ElementType;
  sx?: string;
}

const Variants = {
  primary: "bg-primary-600 hover:bg-primary-600/80 focus:ring-primary-500",
  danger: "bg-primary-500 hover:bg-primary-500/80 focus:ring-secondary-500",
  success: "bg-emerald-500 hover:bg-emerald-500/80 focus:ring-emerald-500",
  black: "bg-black hover:bg-black/80",
};

const Sizes = {
  xs: "px-3 py-1.5 text-xs",
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const Button: React.FC<ButtonProps> = ({
  sx = "",
  onClick,
  label,
  Icon,
  variant = "primary",
  size = "md",
  center = false,
  ...props
}) => {
  const baseButtonClasses =
    "text-white flex items-center justify-center space-x-2 duration-200 font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <button
      className={classNames(
        baseButtonClasses,
        Variants[variant],
        Sizes[size],
        center ? "mx-auto w-fit" : "",
        sx
      )}
      onClick={onClick}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {label && <span className="capitalize">{label}</span>}
    </button>
  );
};

export default Button;
