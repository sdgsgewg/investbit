interface Props {
  children: React.ReactNode;
}

export default function PublicPageWrapper({ children }: Props) {
  return (
    <div className="container mx-auto py-12 px-4 space-y-6">{children}</div>
  );
}
