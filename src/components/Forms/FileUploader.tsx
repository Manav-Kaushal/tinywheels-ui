import Button from "@components/Button";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FormikProps, FormikValues as Values, useFormikContext } from "formik";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface FileUploaderProps {
  name: string;
  label: string;
  accept: string;
  multiple?: boolean;
  required?: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  name,
  label,
  accept,
  multiple = false,
  required = false,
}) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const formik: FormikProps<Values> = useFormikContext();

  const generateImageUrls = (filesArray: File[]) => {
    if (filesArray.length > 0) {
      const urls = filesArray.map((file) => URL.createObjectURL(file));
      setImageUrls((prevUrls) => (multiple ? [...prevUrls, ...urls] : urls));
      setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
      formik.setFieldValue(
        name,
        multiple ? [...formik.values[name], ...filesArray] : filesArray[0]
      );
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      generateImageUrls(newFiles);
    }
  };

  const handleRemove = (index: number) => {
    try {
      if (index >= 0 && index < imageUrls.length) {
        const removedUrl = imageUrls[index];
        URL.revokeObjectURL(removedUrl);
        const newImageUrls = [...imageUrls];
        newImageUrls.splice(index, 1);
        setImageUrls(newImageUrls);

        const removedFile = selectedFiles[index];
        const newSelectedFiles = [...selectedFiles];
        newSelectedFiles.splice(index, 1);
        setSelectedFiles(newSelectedFiles);
        formik.setFieldValue(
          name,
          multiple ? newSelectedFiles : newSelectedFiles[0]
        );
      }
    } catch (error) {
      toast.error("An error occurred while removing the file.");
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
              key={url}
              className="relative w-20 h-20 m-2 border rounded-lg group"
            >
              <Image
                src={url}
                alt="Uploaded"
                className="object-cover rounded-lg"
                fill
              />
              <div className="absolute w-full h-full duration-200 rounded-lg opacity-0 bg-black/50 group-hover:opacity-100">
                <XMarkIcon
                  className="absolute w-4 h-4 text-white cursor-pointer top-2 right-2"
                  onClick={() => handleRemove(index)}
                />
              </div>
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
        required={required}
      />
      <label className="block mt-2 text-sm text-gray-600">
        <Button
          type="button"
          size="sm"
          label={label + (required ? " *" : "")}
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

export default FileUploader;
