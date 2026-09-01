import React from "react";

interface LoadingProps {
  message?: string;
}

const Loading = ({ message }: LoadingProps) => {
  return <div className="p-4">{message || "Loading..."}</div>;
};

export default Loading;
