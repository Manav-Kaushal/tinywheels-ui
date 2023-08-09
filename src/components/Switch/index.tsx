import { useField } from "formik";
import { useEffect } from "react";

type SwitchProps = {
  name: string;
  defaultChecked?: boolean;
  disabled?: boolean;
};

const Switch = ({ name, defaultChecked = false, disabled }: SwitchProps) => {
  const [field, meta, helpers] = useField(name);

  useEffect(() => {
    helpers.setValue(defaultChecked);
  }, [defaultChecked, helpers]);

  const handleToggle = () => {
    if (!disabled) {
      const newValue = !field.value;
      helpers.setValue(newValue);
      //! More research
      // if (field.onBlur) {
      //   field.onBlur();
      // }
    }
  };

  return (
    <label
      className={`relative w-10 h-6 cursor-pointer ${
        disabled ? "opacity-50" : ""
      }`}
    >
      <input
        type="checkbox"
        {...field}
        onChange={handleToggle}
        onBlur={() => helpers.setTouched(true)}
        disabled={disabled}
        checked={field.value}
        className="hidden"
      />
      <div
        className={`w-10 h-6 flex items-center px-3 rounded-full ${
          field.value
            ? "justify-end bg-primary-500"
            : "justify-start bg-gray-200"
        }`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
            field.value ? "translate-x-2" : "-translate-x-2"
          }`}
        />
      </div>
      {meta.touched && meta.error && (
        <div className="mt-1 text-sm text-red-500">{meta.error}</div>
      )}
    </label>
  );
};

export default Switch;
