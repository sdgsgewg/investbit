import React from "react";

interface PerformanceSectionWrapperProps {
  children: React.ReactNode;
}

const PerformanceSectionWrapper = ({
  children,
}: PerformanceSectionWrapperProps) => {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-100 dark:border-zinc-800/50">
      {children}
    </div>
  );
};

export default PerformanceSectionWrapper;
