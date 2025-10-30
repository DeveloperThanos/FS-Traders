"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const supportedLangs = ["en", "zh", "si"] as const;
type Lang = (typeof supportedLangs)[number];

export default function RightSidebar({ initialLang }: { initialLang: Lang }) {
  const [lang, setLang] = useState<Lang>(initialLang);
  const [showLanguages, setShowLanguages] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Sync language with URL
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

  // Flag icons (small, circular)
  const langFlags: Record<Lang, string> = {
    en: "https://flagcdn.com/w40/gb.png",
    zh: "https://flagcdn.com/w40/cn.png",
    si: "https://flagcdn.com/w40/lk.png",
  };

  return (
    <div className="fixed right-2 sm:right-4 top-1/4 sm:top-1/3 flex flex-col items-center gap-3 sm:gap-3 z-50">
      {/* === Language Switcher Button === */}
      <button
        onClick={() => setShowLanguages(!showLanguages)}
        className="focus:outline-none"
        title="Change Language"
      >
        <img
          src="/assets/images/lang-icon.png"
          alt="Language Selector"
          title="Change Language"
          className="w-8 h-8 sm:w-10 sm:h-10 hover:scale-110 transition-transform duration-300 ease-in-out"
        />
      </button>

      {/* === Icons (Language Flags OR Socials) === */}
      <div className="flex flex-col items-center gap-2 sm:gap-3 transition-all duration-300 ease-in-out">
        {showLanguages ? (
          // --- Show Language Flags ---
          supportedLangs.map((l) => (
            <button
              key={l}
              onClick={() => changeLanguage(l)}
              className="focus:outline-none"
              title={
                l === "en"
                  ? "Switch to English"
                  : l === "zh"
                  ? "切换到中文"
                  : "සිංහලට මාරු වන්න"
              }
            >
              <img
                src={langFlags[l]}
                alt={`${l.toUpperCase()} Flag`}
                title={
                  l === "en"
                    ? "English"
                    : l === "zh"
                    ? "Mandarin"
                    : "Sinhala"
                }
                className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border border-white/70 shadow-md hover:scale-110 transition-transform duration-300 ease-in-out object-cover"
              />
            </button>
          ))
        ) : (
          // --- Show Social Media Icons ---
          <>
            {/* Gmail */}
            <a
              href="mailto:yourname@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Contact via Email"
            >
              <img
                src="https://img.icons8.com/bubbles/100/gmail-new.png"
                alt="Email"
                className="w-8 h-8 sm:w-10 sm:h-10 hover:scale-110 transition-transform duration-300 ease-in-out"
              />
            </a>

            {/* WeChat */}
            <a
              href="weixin://dl/chat?yourwechatid"
              target="_blank"
              rel="noopener noreferrer"
              title="Contact via WeChat"
            >
              <img
                src="https://img.icons8.com/bubbles/100/weixing--v1.png"
                alt="WeChat"
                className="w-8 h-8 sm:w-10 sm:h-10 hover:scale-110 transition-transform duration-300 ease-in-out"
              />
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              title="Contact via WhatsApp"
            >
              <img
                src="https://img.icons8.com/bubbles/100/whatsapp.png"
                alt="WhatsApp"
                className="w-8 h-8 sm:w-10 sm:h-10 hover:scale-110 transition-transform duration-300 ease-in-out"
              />
            </a>
          </>
        )}
      </div>
    </div>
  );
}
