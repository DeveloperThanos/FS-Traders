import { ReactNode } from "react";
import { notFound } from "next/navigation";
import "../globals.css";
import RightSidebar from "../../components/rightSidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
      className="flex flex-col min-h-screen w-full overflow-x-hidden text-text"
      style={{ backgroundColor: "#F7EDE2" }}
    >
      {/* Navbar */}
      <Navbar lang={lang} />

      {/* Page Wrapper */}
      <div className="flex flex-1 relative w-full">
        {/* Sidebar */}
        <RightSidebar initialLang={lang} />

        {/* Main Content Area */}
        <main className="flex-1 w-full overflow-x-hidden">
          <div className="w-full">
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
      </div>
      );
}
