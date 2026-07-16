import { requireManageContent } from "@/lib/auth/authorization";

export default async function ContentManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireManageContent();

  return children;
}
