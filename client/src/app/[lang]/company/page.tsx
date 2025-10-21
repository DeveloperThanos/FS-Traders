"use client";

import React, { useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import companyContent from "../../../data/company/content.json";

interface LocalizedText {
  en: string;
  zh?: string;
  si?: string;
}

interface CardContent {
  id: string;
  imagePath?: string;
  en: { title: string; description: string; button: string };
  zh?: { title: string; description: string; button: string };
  si?: { title: string; description: string; button: string };
}


export default function CompanyPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const params = useParams();
  const lang = params.lang as "en" | "zh" | "si";
  const content = companyContent as any;

  // About Section
  const about = content.about[lang] || content.about.en;
  const videoPath = content.videoSection?.path;
  const connection = content.connection[lang] || content.connection.en;
  const vision = content.vision[lang] || content.vision.en;
  const mission = content.mission[lang] || content.mission.en;
  const cards: CardContent[] = content.cards;
  const btnText = content.btn?.[lang] || content.btn?.en || "Explore";

  // Autoplay video on first user interaction
  useEffect(() => {
    const handleUserInteraction = () => {
      if (videoRef.current) videoRef.current.muted = false;
      window.removeEventListener("click", handleUserInteraction);
    };
    window.addEventListener("click", handleUserInteraction);
    return () => window.removeEventListener("click", handleUserInteraction);
  }, []);

  return (
    <main className="p-4 md:p-8">
      {/* About Us Section */}
      <section className="max-w-6xl mx-auto mb-12 md:mb-20">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-primary mb-8 md:mb-12">
          {about.heading}
        </h1>
        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-16">
          {/* Left: Text */}
          <div className="flex-1 w-full">
            <h2 className="text-lg sm:text-xl md:text-3xl font-bold mb-2 md:mb-3 text-primary">{about.title}</h2>
            <p className="text-[var(--color-text)] leading-relaxed text-sm md:text-base">{about.description}</p>
          </div>
          {/* Right: Video */}
          <div className="flex-1 flex justify-center md:justify-end w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-lg w-full max-w-[420px] h-[200px] sm:h-[240px] md:max-w-[520px] md:h-[300px] bg-black">
              {videoPath ? (
                <video
                  ref={videoRef}
                  src={videoPath}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls={false}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-400 text-sm">
                  No video available
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Connection Section */}
      <section className="max-w-4xl mx-auto my-8 md:my-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-primary mb-2 md:mb-4">
          {connection.heading}
        </h2>
      </section>

      {/* Vision & Mission */}
      <section className="max-w-3xl mx-auto mb-8 md:mb-12">
        <div className="mb-6 md:mb-8">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-center text-primary mb-1 md:mb-2">{vision.heading}</h3>
          <p className="text-center text-[var(--color-text)] text-sm md:text-base">{vision.description}</p>
        </div>
        <div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-center text-primary mb-1 md:mb-2">{mission.heading}</h3>
          <p className="text-center text-[var(--color-text)] text-sm md:text-base">{mission.description}</p>
        </div>
      </section>

      {/* Cards */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 justify-items-center gap-6 md:gap-8 mt-8 md:mt-12">
        {cards.map((card) => {
          const cardContent = card[lang] || card.en;
          return (
            <div
              key={card.id}
              className="relative rounded-2xl overflow-hidden shadow-md text-white flex flex-col justify-between w-full max-w-[340px] sm:max-w-[480px] h-[220px] sm:h-[320px]"
            >
              {card.imagePath && (
                <img
                  src={card.imagePath}
                  alt={cardContent.title}
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />
              )}
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-10" />
              <div className="relative z-20 p-4 sm:p-6 pb-10 sm:pb-12 overflow-hidden flex flex-col items-center text-center">
                <h4 className="text-base sm:text-xl font-bold mb-1 sm:mb-2">{cardContent.title}</h4>
                <p className="text-xs sm:text-sm mb-2 sm:mb-4 line-clamp-5 sm:line-clamp-6">{cardContent.description}</p>
              </div>
              <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-20">
                <a
                  href={`#${card.id}`}
                  className="px-4 sm:px-6 py-2 rounded-4xl text-white font-semibold shadow border border-[var(--color-background)] hover:bg-[var(--color-background)] hover:text-black transition-colors text-xs sm:text-base"
                >
                  {cardContent.button || btnText}
                </a>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
