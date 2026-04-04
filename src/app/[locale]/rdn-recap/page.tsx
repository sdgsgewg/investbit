import { redirect } from 'next/navigation';

export default async function ReksaDanaRedirect({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/rdn-recap/input`);
}
