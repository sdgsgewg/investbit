import ContentParagraph from "../ContentParagraph";

const ParagraphSection = ({ paragraphs }: { paragraphs: string[] }) => {
  return (
    <div className="space-y-2">
      {paragraphs.map((paragraph, index) => (
        <ContentParagraph key={index} text={paragraph} />
      ))}
    </div>
  );
};

export default ParagraphSection;
