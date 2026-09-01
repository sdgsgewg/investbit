import React from "react";

interface Props {
  id?: string;
  message?: string;
}

const ErrorMessage = ({ id, message }: Props) => {
  return (
    <p id={id} className="text-sm text-destructive">
      {message}
    </p>
  );
};

export default ErrorMessage;
