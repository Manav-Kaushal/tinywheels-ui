import classNames from "classnames";
import React, { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  count: number | string;
  bgColor?: string;
  countCenter?: boolean;
};

const Badge: React.FC<BadgeProps> = ({
  children,
  count,
  countCenter = false,
  bgColor,
}) => {
  const baseClasses =
    "absolute inline-flex items-center text-sm font-medium text-gray-800";

  return (
    <div className="relative">
      <span
        className={classNames(
          baseClasses,
          countCenter
            ? "top-3 left-3"
            : "-top-2 -right-1",
          bgColor && bgColor
        )}
      >
        {count}
      </span>
      {children}
    </div>
  );
};

export default Badge;
