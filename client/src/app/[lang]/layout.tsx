import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import '../../app/globals.css';
import RightSidebar from '../../components/rightSidebar';

const supportedLangs = ["en", "zh", "si"] as const;
type Lang = (typeof supportedLangs)[number];

type LocaleLayoutProps = {
  children: ReactNode;
  params: { lang: Lang };
};

export default function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const lang = params.lang;

  if (!supportedLangs.includes(lang)) notFound();

  return (
    <>
      {/* Client component */}
      <RightSidebar initialLang={lang} />
      {children}
    </>
  );
}