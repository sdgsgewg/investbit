import React from "react";

interface TableWrapperProps {
  headerChildren: React.ReactNode;
  bodyChildren: React.ReactNode;
}

const TableWrapper = ({ headerChildren, bodyChildren }: TableWrapperProps) => {
  return (
    <div className="overflow-auto max-h-[65vh] border border-zinc-200 dark:border-zinc-800 rounded-md">
      <table className="w-full text-left bg-white dark:bg-zinc-900 border-collapse">
        <thead className="sticky top-0 z-20 bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 shadow-sm">
          <tr>{headerChildren}</tr>
        </thead>
        <tbody>{bodyChildren}</tbody>
      </table>
    </div>
  );
};

export default TableWrapper;
