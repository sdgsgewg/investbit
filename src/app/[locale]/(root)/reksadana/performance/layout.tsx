"use client";

export default function ReksaDanaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="container mx-auto py-8 px-4">{children}</div>;
}
