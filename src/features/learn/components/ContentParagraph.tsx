const ContentParagraph = ({ text }: { text: string }) => {
  return (
    <p className="prose prose-invert max-w-none text-base leading-relaxed">
      {text}
    </p>
  );
};

export default ContentParagraph;
