"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const supportedLangs = ["en", "zh", "si"] as const;
type Lang = (typeof supportedLangs)[number];

// --- Flags ---
const EnglishFlag = () => <div className="text-xl">🇬🇧</div>;
const ChineseFlag = () => <div className="text-xl">🇨🇳</div>;
const SinhalaFlag = () => <div className="text-xl">🇱🇰</div>;

// --- Sidebar ---
export default function RightSidebar({ initialLang }: { initialLang: Lang }) {
  const [lang, setLang] = useState<Lang>(initialLang);
  const [showLanguages, setShowLanguages] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Sync lang with URL
  useEffect(() => {
    const currentLang = pathname.split("/")[1] as Lang;
    if (supportedLangs.includes(currentLang) && currentLang !== lang) {
      setLang(currentLang);
    }
  }, [pathname, lang]);

  // Change language
  const changeLanguage = (newLang: Lang) => {
    const parts = pathname.split("/");
    parts[1] = newLang;
    router.push(parts.join("/"));
    setLang(newLang);
    setShowLanguages(false);
  };

  // Get flag component
  const getFlag = (code: Lang) => {
    switch (code) {
      case "en":
        return <EnglishFlag />;
      case "zh":
        return <ChineseFlag />;
      case "si":
        return <SinhalaFlag />;
    }
  };

  const otherLangs = supportedLangs.filter((l) => l !== lang);

  return (
    <div className="fixed right-4 top-1/3 flex flex-col gap-4 items-center z-50">
      <div className="relative">
        {/* Main button */}
        <button
          onClick={() => setShowLanguages(!showLanguages)}
          className="bg-primary text-white p-2 rounded-full shadow-md hover:bg-primary/90 transition-colors"
        >
          {getFlag(lang)}
        </button>

        {/* Dropdown */}
        {showLanguages && (
          <div className="absolute top-full mt-2 flex flex-col gap-2 bg-primary p-2 rounded-lg shadow-lg">
            {otherLangs.map((l) => (
              <button
                key={l}
                onClick={() => changeLanguage(l)}
                className="text-white p-2 rounded hover:bg-primary/80 transition-colors"
              >
                {getFlag(l)}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
