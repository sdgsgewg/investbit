import ImageWrapper from "@/components/shared/ImageWrapper";
import ContentParagraph from "../ContentParagraph";
import { ImageData } from "@/app/types/learn/ImageData";

interface ImageSectionProps {
  data: ImageData;
}

const ImageSection = ({ data }: ImageSectionProps) => {
  const { text, image } = data;

  return (
    <section className="bg-linear-to-br from-card to-muted/30 rounded-3xl p-6 md:p-8 border border-border/50 overflow-hidden relative shadow-md">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col gap-2">
        <ContentParagraph text={text} />
        <div className="bg-background rounded-lg p-2 border border-border/50 shadow-sm">
          <ImageWrapper src={image} alt={`Chart`} />
        </div>
      </div>
    </section>
  );
};

export default ImageSection;
