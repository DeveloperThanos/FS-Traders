"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Mouse } from "lucide-react";
import heroContent from "../../../../data/home/hero-section/contents.json";

export default function HeroSection() {
  const params = useParams();
  const lang = (params.lang as "en" | "zh" | "si") || "en";

  const heading = heroContent.heading[lang] || heroContent.heading.en;
  const subheading = heroContent.subheading[lang] || heroContent.subheading.en;
  const buttonText = heroContent.btn[lang] || heroContent.btn.en;
  const scrollDownText =
    heroContent.scrolldown[lang] || heroContent.scrolldown.en;
  const backgrounds = Object.values(heroContent.background);
  const supplierBrandings = Object.values(heroContent["suppliers-branding"]);

  // === Background Slideshow Logic ===
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 5000); // change every 5 seconds
    return () => clearInterval(interval);
  }, [backgrounds.length]);

  return (
    <main className="relative w-full overflow-hidden">
      {/* === Hero Section with Background Slideshow === */}
      <section className="relative w-full h-screen flex flex-col justify-center items-center text-center text-white overflow-hidden">
        {/* Backgrounds (fade transition) */}
        {backgrounds.map((path, i) => (
          <div
            key={`bg-${i}`}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              i === currentBg ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${path})` }}
          ></div>
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Text Content */}
        <div className="relative z-10 max-w-3xl px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
            {heading}
          </h1>
          <p className="text-lg sm:text-xl mb-8 drop-shadow-md">{subheading}</p>
          <button
            className="px-6 py-2 border font-semibold rounded-4xl shadow transition duration-300"
            style={{
              borderColor: "var(--color-background)",
              color: "white",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                "var(--color-background)";
              e.currentTarget.style.color = "var(--color-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "white";
            }}
          >
            {buttonText}
          </button>
        </div>

        {/* === Scroll Down Text + Mouse Icon (Pinned Bottom) === */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10">
          <p className="text-sm md:text-base text-white mb-2 tracking-wider">
            {scrollDownText}
          </p>
          <Mouse className="w-8 h-8 text-[var(--color-background)]" />
        </div>
      </section>

      {/* === Supplier Branding Section with Continuous Scrolling === */}
      <section className="w-full bg-[#F7EDE2] py-12 overflow-hidden">
        <div className="w-full bg-[var(--color-primary)] py-10 px-6">
          <div
            className="flex items-center gap-16 flex-nowrap animate-slide"
            style={{ animation: "slide 20s linear infinite" }}
          >
            {[...supplierBrandings, ...supplierBrandings].map((logo, i) => (
              <img
                key={`branding-${i}`}
                src={logo}
                alt={`Supplier ${i + 1}`}
                className="h-15 md:h-20 object-contain"
              />
            ))}
          </div>
        </div>

        {/* Add CSS for sliding animation */}
        <style jsx>{`
          @keyframes slide {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </section>
    </main>
  );
}
