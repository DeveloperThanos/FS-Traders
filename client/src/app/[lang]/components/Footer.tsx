"use client";

import React from "react";
import { useParams } from "next/navigation";
import footerContent from "../../../data/footer/contents.json";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter as X,
  Youtube,
  Phone,
  Mail,
} from "lucide-react";

interface LocalizedText {
  en: string;
  zh?: string;
  si?: string;
  path?: string;
}

// Fallback data in case the JSON file is missing or inaccessible
const fallbackFooterContent = {
  companyName: {
    en: "Default Company",
    zh: "默认公司",
    si: "පෙරනිමි සමාගම",
  },
  companyDescription: {
    en: "Default description for the company.",
    zh: "公司的默认描述。",
    si: "සමාගමේ පෙරනිමි විස්තරය.",
  },
  links: {
    side1: { heading: { en: "Quick Links" } },
    side2: { heading: { en: "About" } },
    side3: { heading: { en: "Products" } },
    side4: {
      heading: { en: "Contact" },
      phone: "123-456-7890",
      email: "info@default.com",
    },
  },
  logoPath: "/default-logo.png",
};

// Normalize paths to ensure consistency
const normalizePath = (path: string) => {
  // Ensure paths are consistent and start with a slash
  return path.startsWith("/") ? path : `/${path}`;
};

export default function Footer() {
  const params = useParams();
  const lang = (params.lang as "en" | "zh" | "si") || "en";

  const companyName =
    footerContent?.companyName?.[lang] ||
    fallbackFooterContent.companyName[lang];
  const companyDescription =
    footerContent?.companyDescription?.[lang] ||
    fallbackFooterContent.companyDescription[lang];
  const links = footerContent?.links || fallbackFooterContent.links;

  return (
    <footer className="bg-[var(--color-primary)] text-[var(--color-background)] py-8 sm:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 sm:gap-10 md:gap-6">
        {/* ===== Left Column - Logo and Company Info ===== */}
        <div className="flex flex-col items-start col-span-2 sm:col-span-3 md:col-span-2 space-y-4">
          <img
            src={footerContent?.logoPath || fallbackFooterContent.logoPath}
            alt="Company Logo"
            className="w-28 sm:w-36 mb-3"
          />
          <h2 className="text-lg sm:text-xl font-bold">{companyName}</h2>
          <p className="text-sm leading-relaxed max-w-sm">
            {companyDescription}
          </p>

          {/* ===== Social Media Icons ===== */}
          <div className="flex justify-start space-x-3 sm:space-x-4 mt-4">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--color-background)] p-1.5 sm:p-2 rounded-full"
            >
              <Linkedin className="text-[var(--color-primary)] w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--color-background)] p-1.5 sm:p-2 rounded-full"
            >
              <Facebook className="text-[var(--color-primary)] w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--color-background)] p-2 rounded-full"
            >
              <Instagram className="text-[var(--color-primary)] w-5 h-5" />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--color-background)] p-2 rounded-full"
            >
              <X className="text-[var(--color-primary)] w-5 h-5" />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--color-background)] p-2 rounded-full"
            >
              <Youtube className="text-[var(--color-primary)] w-5 h-5" />
            </a>
          </div>
        </div>

        {/* ===== Right Columns - Link Groups ===== */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-6 md:col-span-3">
          {/* --- Side 1 --- */}
          <div>
            <h3 className="text-lg font-semibold mb-2 opacity-90">
              {links.side1.heading?.[lang] ||
                links.side1.heading?.en ||
                "Quick Links"}
            </h3>
            <ul className="space-y-3">
              {Object.entries(links.side1)
                .filter(([key]) => key !== "heading")
                .map(([key, value]) => (
                  <li key={key}>
                    <a
                      href={`/${lang}${normalizePath((value as LocalizedText).path || "")}`}
                      className="text-sm hover:underline"
                    >
                      {(value as LocalizedText)[lang] ||
                        (value as LocalizedText).en}
                    </a>
                  </li>
                ))}
            </ul>
          </div>

          {/* --- Side 2 --- */}
          <div>
            <h3 className="text-lg font-semibold mb-2 opacity-90">
              {links.side2.heading?.[lang] ||
                links.side2.heading?.en ||
                "About"}
            </h3>
            <ul className="space-y-3">
              {Object.entries(links.side2)
                .filter(([key]) => key !== "heading")
                .map(([key, value]) => (
                  <li key={key}>
                    <a
                      href={`/${lang}${normalizePath((value as LocalizedText).path || "")}`}
                      className="text-sm hover:underline"
                    >
                      {(value as LocalizedText)[lang] ||
                        (value as LocalizedText).en}
                    </a>
                  </li>
                ))}
            </ul>
          </div>

          {/* --- Side 3 --- */}
          <div>
            <h3 className="text-lg font-semibold mb-2 opacity-90">
              {links.side3.heading?.[lang] ||
                links.side3.heading?.en ||
                "Products"}
            </h3>
            <ul className="space-y-3">
              {Object.entries(links.side3)
                .filter(([key]) => key !== "heading")
                .map(([key, value]) => (
                  <li key={key}>
                    <a
                      href={`/${lang}${normalizePath((value as LocalizedText).path || "")}`}
                      className="text-sm hover:underline"
                    >
                      {(value as LocalizedText)[lang] ||
                        (value as LocalizedText).en}
                    </a>
                  </li>
                ))}
            </ul>
          </div>

          {/* --- Side 4 --- */}
          <div>
            <h3 className="text-lg font-semibold mb-2 opacity-90">
              {links.side4.heading?.[lang] ||
                links.side4.heading?.en ||
                "Contact"}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[var(--color-background)]" />
                <p className="text-sm">{links.side4.phone}</p>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[var(--color-background)]" />
                <p className="text-sm">{links.side4.email}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ===== Bottom Copyright ===== */}
      <div className="mt-12 border-t border-[var(--color-background)] pt-6 text-center">
        <p className="text-xs opacity-80">
          © {new Date().getFullYear()} {companyName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
