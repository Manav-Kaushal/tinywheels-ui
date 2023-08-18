import classNames from "classnames";

type Props = {
  label?: string;
  sx?: string;
};

const Divider = ({ label, sx }: Props) => {
  return (
    <div className={classNames("relative", sx)}>
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center">
        <span className="px-3 text-base font-normal leading-6 text-gray-600 bg-white">
          {label}
        </span>
      </div>
    </div>
  );
};

export default Divider;
