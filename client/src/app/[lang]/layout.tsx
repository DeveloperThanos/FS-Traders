import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import '../../app/globals.css';
import RightSidebar from '../../components/rightSidebar';

const supportedLangs = ["en", "zh", "si"] as const;
type Lang = (typeof supportedLangs)[number];

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: string };
}) {
  const lang = params.lang as Lang; // Removed unnecessary Promise.resolve

  if (!supportedLangs.includes(lang)) notFound();

  return (
    <>
      {/* Client component */}
      <RightSidebar initialLang={lang} />
      {children}
    </>
  );
}