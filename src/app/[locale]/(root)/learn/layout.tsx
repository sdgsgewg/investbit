import PublicPageWrapper from "@/components/wrappers/PublicPageWrapper";

export default function LearnPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicPageWrapper>{children}</PublicPageWrapper>;
}
