import { LESSON_COMPONENTS } from "./lessons";

export default function LessonRenderer({ contentKey }: { contentKey: string }) {
  const Component = LESSON_COMPONENTS[contentKey as keyof typeof LESSON_COMPONENTS];

  if (!Component) return <div>Content not found</div>;

  return <Component />;
}