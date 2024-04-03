import { Spinner } from "@material-tailwind/react";

const Loading: React.FC = () => {
  return (
    <div className="loading">
      <Spinner />
    </div>
  );
};

export default Loading;
