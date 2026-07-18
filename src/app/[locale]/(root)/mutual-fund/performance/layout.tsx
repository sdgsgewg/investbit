import PublicPageWrapper from "@/components/wrappers/PublicPageWrapper";

export default function RdnPerformancePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicPageWrapper>{children}</PublicPageWrapper>;
}
