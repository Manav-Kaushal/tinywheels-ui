import { Switch } from "@headlessui/react";
import classNames from "classnames";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";

interface SwitchProps {
  name: string;
  label: string;
  labelClass?: string;
  required?: boolean;
}

const CustomSwitch: React.FC<SwitchProps> = ({
  name,
  label,
  labelClass,
  required,
}) => {
  const { values, setFieldValue } = useFormikContext<any>();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(!!values[name]);
  }, [values[name]]);

  const handleChange = () => {
    setChecked(!checked);
    setFieldValue(name, !checked);
  };

  return (
    <div className="flex items-center space-x-2">
      <p
        className={classNames(
          "text-sm text-gray-500",
          required ? "after:content-['*'] after:inline after:ml-1" : "",
          labelClass
        )}
      >
        {label}
      </p>
      <Switch
        checked={checked}
        onChange={handleChange}
        className={classNames(
          "relative inline-flex items-center h-6 rounded-full w-10 transition-colors focus:outline-none",
          checked ? "bg-primary" : "bg-gray-300"
        )}
      >
        <span
          className={classNames(
            "inline-block w-4 h-4 transform bg-white rounded-full transition-transform",
            checked ? "translate-x-5" : "translate-x-1"
          )}
        />
      </Switch>
    </div>
  );
};

export default CustomSwitch;
