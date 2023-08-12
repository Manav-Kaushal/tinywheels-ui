import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

interface CopyToClipboardProps {
  textToCopy: string;
  message?: string;
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({
  textToCopy,
  message,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    toast.success(message || "Copied!");
    setTimeout(() => setIsCopied(false), 2000); // Reset copied state after 2 seconds
  };

  return (
    <div className="inline-flex ml-2">
      <DocumentDuplicateIcon
        className="w-4 h-4 duration-200 cursor-pointer hover:text-primary-600"
        onClick={copyToClipboard}
      />
    </div>
  );
};

export default CopyToClipboard;
