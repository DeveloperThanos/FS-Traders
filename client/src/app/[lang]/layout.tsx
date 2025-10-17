// src/app/[lang]/layout.tsx
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import "../globals.css";
import RightSidebar from "../../components/rightSidebar";
import Navbar from "./components/Navbar";

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
    <div style={{ backgroundColor: '#F7EDE2' }} className="flex min-h-screen text-text">
      {/* Navbar */}
      <Navbar lang={lang} />

      {/* Sidebar */}
      <RightSidebar initialLang={lang} />

      {/* Main Content Area */}
      <main className="flex-1 px-4 sm:px-8 py-6 mt-16">{children}</main>
    </div>
  );
}
