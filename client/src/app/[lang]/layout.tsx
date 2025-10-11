// app/[lang]/layout.tsx
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import "../globals.css";
import RightSidebar from "../../components/rightSidebar";

const supportedLangs = ["en", "zh", "si"] as const;
type Lang = (typeof supportedLangs)[number];

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: Lang };
}) {
  const { lang } = params;

  if (!supportedLangs.includes(lang)) {
    notFound();
  }

  return (
    <html lang={lang}>
      <body>
        <RightSidebar initialLang={lang} />
        {children}
      </body>
    </html>
  );
}
