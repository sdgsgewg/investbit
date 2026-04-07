import { TOPIC_COMPONENTS } from "./topics";

export default function TopicRenderer({ contentKey }: { contentKey: string }) {
  const Component = TOPIC_COMPONENTS[contentKey as keyof typeof TOPIC_COMPONENTS];

  if (!Component) return <div>Content not found</div>;

  return <Component />;
}