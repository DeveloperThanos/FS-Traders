// src/app/[lang]/layout.tsx
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import "../globals.css";
import RightSidebar from "../../components/rightSidebar";

const supportedLangs = ["en", "zh", "si"] as const;
type Lang = (typeof supportedLangs)[number];

function isSupportedLang(lang: string): lang is Lang {
  return (supportedLangs as readonly string[]).includes(lang);
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
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
