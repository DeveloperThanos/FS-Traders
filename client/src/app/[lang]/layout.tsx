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
    <div
      className="flex flex-col min-h-screen text-text"
      style={{ backgroundColor: "#F7EDE2" }} // ✅ your background color
    >
      {/* Navbar */}
      <Navbar lang={lang} />

      {/* Page Wrapper */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <RightSidebar initialLang={lang} />

        {/* Main Content Area */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
