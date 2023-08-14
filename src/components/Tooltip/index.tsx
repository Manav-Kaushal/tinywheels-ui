import { ReactNode } from "react";

type PropsType = {
  message: string;
  children: ReactNode;
};

const Tooltip = ({ message, children }: PropsType) => {
  return (
    <div className="relative flex group">
      {children}
      <span className="absolute p-2 text-xs text-white transition-all duration-200 scale-0 bg-gray-800 rounded bottom-6 group-hover:scale-100 whitespace-nowrap">
        {message}
      </span>
    </div>
  );
};

export default Tooltip;
