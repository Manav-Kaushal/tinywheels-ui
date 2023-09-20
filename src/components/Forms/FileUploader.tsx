import { XMarkIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useField } from "formik";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface FileUploaderProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  imgSrc?: string;
  containerClassname?: string;
}

const FileUploader = ({
  name,
  label,
  imgSrc,
  containerClassname,
  ...rest
}: FileUploaderProps) => {
  const [field, meta, helpers] = useField(name);
  const [src, setSrc] = useState<string | File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSrc(file);
      helpers.setValue(file);
    }
  };

  const handleRemoveFile = () => {
    if (imgSrc) {
      setSrc(imgSrc);
      helpers.setValue(imgSrc);
    } else {
      setSrc(null);
      helpers.setValue(null);
    }
  };

  useEffect(() => {
    if (imgSrc) {
      setSrc(imgSrc);
    }
  }, [imgSrc]);

  return (
    <div className={classNames(containerClassname)}>
      <label htmlFor={name} className="cursor-pointer">
        <input
          type="file"
          id={name}
          name={name}
          onChange={handleFileChange}
          onBlur={field.onBlur}
          hidden
          {...rest}
        />
        <p className="text-blue-500">
          {label} {rest.required ? "*" : ""}
        </p>
      </label>
      <div className="flex flex-wrap">
        {src && (
          <div className="relative w-24 h-24 m-2 border rounded-lg">
            <Image
              src={typeof src === "string" ? src : URL.createObjectURL(src)}
              alt="Uploaded img"
              className="object-contain p-2 rounded-lg"
              layout="fill"
            />
            {typeof src === "object" && (
              <XMarkIcon
                className="absolute w-5 h-5 p-1 text-gray-100 duration-200 rounded-full cursor-pointer bg-gray-500/60 right-1 top-1 hover:text-white hover:bg-gray-500/90"
                onClick={handleRemoveFile}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
