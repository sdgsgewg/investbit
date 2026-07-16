import { requireManageSystem } from "@/lib/auth/authorization";

export default async function SystemManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireManageSystem();

  return children;
}
