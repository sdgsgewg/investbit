"use client";

export default function DasboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Navbar */}

      <div>
        {/* Sidebar */}

        {/* Content */}
        <div>{children}</div>
      </div>
    </div>
  );
}
