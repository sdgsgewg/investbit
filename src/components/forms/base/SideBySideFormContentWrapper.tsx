import React from "react";
import FormContentWrapper from "./FormContentWrapper";

interface Props {
  left: React.ReactNode;
  right: React.ReactNode;
}

const SideBySideFormContentWrapper = ({ left, right }: Props) => {
  return (
    <FormContentWrapper className="flex flex-col gap-5 md:flex-row md:gap-12">
      <div className="shrink-0">{left}</div>
      <div className="flex-1 space-y-5">{right}</div>
    </FormContentWrapper>
  );
};

export default SideBySideFormContentWrapper;
