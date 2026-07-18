interface Props {
  title: string;
}

const PageHeader = ({ title }: Props) => {
  return (
    <div className="flex items-center gap-4">
      {/* Title */}
      <div className="flex items-center gap-3">
        <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/80">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default PageHeader;
