import React from "react";

interface SectionWrapperProps {
  children: React.ReactNode;
}

const SectionWrapper = ({ children }: SectionWrapperProps) => {
  return (
    <section className="bg-card/50 rounded-2xl p-6 md:p-8 border border-border shadow-sm space-y-6">
      {children}
    </section>
  );
};

export default SectionWrapper;
