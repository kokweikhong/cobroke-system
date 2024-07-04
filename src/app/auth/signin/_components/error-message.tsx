"use client";

import ErrorMessageCard from "@/components/error-message-card";
import { useSearchParams } from "next/navigation";

const ErrorMessage = () => {
  const searchParams = useSearchParams();
  const errMessage = searchParams.get("message");

  return (
    <>
      {errMessage && (
        <ErrorMessageCard>
          <p>{errMessage}</p>
        </ErrorMessageCard>
      )}
    </>
  );
};

export default ErrorMessage;
