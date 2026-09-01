import React from "react";
import UnsavedChangesGuard from "./UnsavedChangesGuard";

interface Props {
  isDirty?: boolean;
  children: React.ReactNode;
}

const FormWrapper = ({ isDirty, children }: Props) => {
  return (
    <div className="lg:col-span-6">
      {/* <div className="bg-card border border-border/50 shadow-sm rounded-2xl overflow-hidden sticky top-24"> */}
      <div className="bg-card border border-border/50 shadow-sm rounded-2xl overflow-hidden">
        {isDirty && <UnsavedChangesGuard when={isDirty} />}

        {children}
      </div>
    </div>
  );
};

export default FormWrapper;
