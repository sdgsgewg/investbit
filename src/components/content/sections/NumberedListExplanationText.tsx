const NumberedListExplanationText = ({
  index,
  text,
}: {
  index: number;
  text: string;
}) => {
  return (
    <div className="flex gap-4">
      <div className="shrink-0 mt-1 flex items-center justify-center h-6 w-6 rounded-full bg-primary/20 text-primary text-xs font-bold ring-2 ring-background">
        {index + 1}
      </div>
      <p className="text-muted-foreground leading-relaxed">{text}</p>
    </div>
  );
};

export default NumberedListExplanationText;
