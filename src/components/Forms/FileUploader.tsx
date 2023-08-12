import { XMarkIcon } from "@heroicons/react/24/outline";
import { useField } from "formik";
import Image from "next/image";
import { ChangeEvent, InputHTMLAttributes, useEffect, useState } from "react";

interface FileUploaderProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  initialImageUrls?: string[];
  multiple?: boolean;
}

const FileUploader = ({
  name,
  label,
  initialImageUrls,
  multiple,
  ...rest
}: FileUploaderProps) => {
  const [selectedFiles, setSelectedFiles] = useState<any[]>(
    initialImageUrls || []
  );
  const [field, meta, helpers] = useField(name);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (files) {
      const updatedFiles = Array.from(files);
      setSelectedFiles(updatedFiles);
      helpers.setValue(updatedFiles);
    }
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    helpers.setValue(updatedFiles);
  };

  useEffect(() => {
    if (initialImageUrls) {
      setSelectedFiles(initialImageUrls);
    }
  }, [initialImageUrls]);

  return (
    <div>
      <label htmlFor={name} className="cursor-pointer">
        <input
          type="file"
          id={name}
          name={name}
          onChange={handleFileChange}
          onBlur={field.onBlur}
          multiple={multiple} // Pass the multiple prop to the input
          hidden
          {...rest}
        />
        <p className="text-blue-500">
          Upload {label} {rest.required ? "*" : ""}
        </p>
      </label>
      <div className="flex flex-wrap gap-2 mt-2">
        {selectedFiles.map((file, index) => (
          <div key={index} className="relative w-24 aspect-square">
            {typeof file === "string" ? (
              <Image
                src={file}
                alt="preview"
                className="object-cover border rounded-md"
                fill
              />
            ) : (
              <Image
                src={URL.createObjectURL(file)}
                alt="preview"
                className="object-cover border rounded-md"
                fill
              />
            )}
            <button
              type="button"
              className="absolute top-0 right-0 p-1 bg-white rounded-full cursor-pointer bg-opacity-70"
              onClick={() => handleRemoveFile(index)}
            >
              <XMarkIcon className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;
