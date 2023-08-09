import Button from "@components/Button";
import { PhotoIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface ImageUploaderProps {
  name: string;
  label: string;
  accept: string;
  multiple?: boolean;
  onChange: (files: File[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  accept,
  multiple,
  onChange,
}) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      const urls = newFiles.map((file) => URL.createObjectURL(file));
      setImageUrls((prevUrls) => (multiple ? [...prevUrls, ...urls] : urls));
      onChange(newFiles);
    }
  };

  useEffect(() => {
    // Clean up the imageUrls when the component unmounts
    return () => {
      imageUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imageUrls]);

  return (
    <div>
      {!accept.includes("glb") && (
        <div className="flex flex-wrap">
          {imageUrls.map((url, index) => (
            <div
              key={index}
              className="relative w-20 h-20 m-2 border rounded-lg"
            >
              <Image
                src={url}
                alt="Uploaded"
                className="object-cover rounded-lg"
                fill
              />
            </div>
          ))}
          {imageUrls.length === 0 && (
            <div className="flex items-center justify-center w-20 h-20 m-2 bg-gray-200 rounded-lg">
              <PhotoIcon className="w-10 h-10 text-gray-400" />
            </div>
          )}
        </div>
      )}
      <input
        type="file"
        accept={accept}
        className="hidden"
        multiple={multiple}
        onChange={handleFileChange}
      />
      <label className="block mt-2 text-sm text-gray-600">
        <Button
          type="button"
          size="sm"
          label={`Upload ${label}`}
          onClick={() => {
            const input: any = document.createElement("input");
            input.type = "file";
            input.accept = accept;
            input.multiple = multiple || false;
            input.onchange = handleFileChange;
            input.click();
          }}
        />
      </label>
    </div>
  );
};

export default ImageUploader;
