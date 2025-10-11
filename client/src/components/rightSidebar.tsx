"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const supportedLangs = ["en", "zh", "si"] as const;
type Lang = (typeof supportedLangs)[number];

// --- Flags ---
const EnglishFlag = ({ size = 32 }: { size?: number }) => <div>🇬🇧</div>;
const ChineseFlag = ({ size = 32 }: { size?: number }) => <div>🇨🇳</div>;
const SinhalaFlag = ({ size = 32 }: { size?: number }) => <div>🇱🇰</div>;

// --- Sidebar ---
export default function RightSidebar({ initialLang }: { initialLang: Lang }) {
  const [lang, setLang] = useState<Lang>(initialLang);
  const [showLanguages, setShowLanguages] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Update lang on client after mount
  useEffect(() => {
    const currentLang = pathname.split("/")[1] as Lang;
    if (supportedLangs.includes(currentLang) && currentLang !== lang) setLang(currentLang);
  }, [pathname]);

  const changeLanguage = (newLang: Lang) => {
    const parts = pathname.split("/");
    parts[1] = newLang;
    router.push(parts.join("/"));
    setLang(newLang);
    setShowLanguages(false);
  };

  const getFlag = (code: Lang) => {
    switch (code) {
      case "en": return <EnglishFlag />;
      case "zh": return <ChineseFlag />;
      case "si": return <SinhalaFlag />;
    }
  };

  const otherLangs = supportedLangs.filter(l => l !== lang);

  return (
    <div className="fixed right-4 top-1/3 flex flex-col gap-4 items-center">
      <div className="relative">
        <button onClick={() => setShowLanguages(!showLanguages)}>
          {getFlag(lang)}
        </button>
        {showLanguages && (
          <div className="absolute top-full mt-2 flex flex-col gap-2 bg-white p-2 border rounded-lg shadow-lg">
            {otherLangs.map(l => (
              <button key={l} onClick={() => changeLanguage(l)}>
                {getFlag(l)}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
