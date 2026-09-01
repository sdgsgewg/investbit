import React from "react";

interface Props {
  className?: string;
  children: React.ReactNode;
}

const FormContentWrapper = ({ className, children }: Props) => {
  return <div className={`${className} py-8 px-6`}>{children}</div>;
};

export default FormContentWrapper;
