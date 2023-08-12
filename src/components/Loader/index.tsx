type Props = {};

const Loader = (props: Props) => {
  return (
    <div className="relative">
      <div className="border-2 rounded-full w-7 h-7 border-primary-200"></div>
      <div className="absolute top-0 left-0 border-t-2 rounded-full w-7 h-7 border-primary-700 animate-spin"></div>
    </div>
  );
};

export default Loader;
