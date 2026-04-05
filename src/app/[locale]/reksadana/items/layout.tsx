"use client";

export default function ItemsManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="container mx-auto py-8 px-4">{children}</div>;
}
