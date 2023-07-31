import classNames from "classnames";
import React from "react";

interface TypographyProps {
  tag?: keyof JSX.IntrinsicElements;
  variant?: "heading" | "subheading" | "body" | "caption";
  children: React.ReactNode;
  sx?: string;
}

const Typography: React.FC<TypographyProps> = ({
  tag: Tag = "p",
  variant = "body",
  children,
  sx = "",
}) => {
  const getTypographyClass = () => {
    switch (variant) {
      case "heading":
        return "text-4xl";
      case "subheading":
        return "text-xl";
      case "body":
        return "text-base";
      case "caption":
        return "text-sm";
      default:
        return "text-base";
    }
  };

  return <Tag className={classNames(sx, getTypographyClass())}>{children}</Tag>;
};

export default Typography;
