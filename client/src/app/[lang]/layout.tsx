import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import '../../app/globals.css';
import RightSidebar from '../../components/rightSidebar';

const supportedLangs = ["en", "zh", "si"] as const;
type Lang = (typeof supportedLangs)[number];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: string };
}) {
  const { lang } = await Promise.resolve(params); 

  if (!supportedLangs.includes(lang as Lang)) notFound();

  return (
    <>
      {/* Client component */}
      <RightSidebar initialLang={lang as Lang} />
      {children}
    </>
  );
}