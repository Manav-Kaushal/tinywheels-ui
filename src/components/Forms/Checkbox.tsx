import { useField } from "formik";
import React, { ReactNode } from "react";

type CheckboxProps = {
  name: string;
  label: string | ReactNode;
};

const Checkbox: React.FC<CheckboxProps> = ({ name, label }) => {
  const [field, meta] = useField(name);

  return (
    <div className="flex items-center">
      <label className="flex items-center">
        <input
          type="checkbox"
          {...field}
          className="w-4 h-4 mr-2 cursor-pointer text-primary-500"
        />
        <div className="text-gray-600">{label}</div>
      </label>
      {meta.touched && meta.error && (
        <div className="ml-2 text-sm text-red-500">{meta.error}</div>
      )}
    </div>
  );
};

export default Checkbox;
