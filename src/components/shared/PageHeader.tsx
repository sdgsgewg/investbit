import React from "react";

interface Props {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
  children?: React.ReactNode;
}

const PageHeader = ({
  title,
  subtitle,
  icon,
  leftAction,
  rightAction,
  children,
}: Props) => {
  return (
    <div className="flex items-center justify-between gap-4 pb-4 border-b border-border/40">
      <div className="flex items-center justify-between gap-4 w-full">
        <div className="flex items-center gap-4">
          {/* Ex: back button */}
          {leftAction}

          {/* Icon and Title */}
          <div className="flex items-center gap-3">
            {icon && (
              <div className="p-2.5 bg-primary/10 rounded-xl">{icon}</div>
            )}

            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/80">
                {title}
              </h1>

              {subtitle && (
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>
          </div>
        </div>

        {/* Ex: search bar */}
        <div>{rightAction}</div>
      </div>

      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
};

export default PageHeader;
