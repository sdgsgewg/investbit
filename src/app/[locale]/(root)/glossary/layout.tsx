import PublicPageWrapper from "@/components/wrappers/PublicPageWrapper";

export default function GlossaryPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicPageWrapper>{children}</PublicPageWrapper>;
}
