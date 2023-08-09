import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-5 h-5 border-t-2 border-b-2 border-gray-200 rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
