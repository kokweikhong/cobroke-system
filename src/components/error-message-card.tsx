import { XIcon } from "lucide-react";
import { FC } from "react";

type ErrorMessageCardProps = {
  children: React.ReactNode;
};

const ErrorMessageCard: FC<ErrorMessageCardProps> = ({ children }) => {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            There are something wrong
          </h3>
          <div className="mt-2 text-sm text-red-700">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessageCard;
