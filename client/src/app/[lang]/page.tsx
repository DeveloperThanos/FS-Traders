"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Mouse } from "lucide-react";
import Image from "next/image";

// === IMPORT SECTIONS ===
import heroContent from "../../data/home/hero-section/contents.json";
import aboutContent from "../../data/home/about/contents.json";
import leadersContent from "../../data/home/leadership/contents.json";
import supplierContent from "../../data/home/supplier/contents.json";
import productContents from "../../data/home/products/contents.json";
import ctaContent from "../../data/home/cta-section/contents.json";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <LeadersSection />
      <SupplierSection />
      <ProductsSection />
      <CTASection />
    </main>
  );
}

// ======================== HERO SECTION ========================
function HeroSection() {
  const params = useParams();
  const lang = (params.lang as "en" | "zh" | "si") || "en";

  const heading = heroContent.heading[lang] || heroContent.heading.en;
  const subheading = heroContent.subheading[lang] || heroContent.subheading.en;
  const buttonText = heroContent.btn[lang] || heroContent.btn.en;
  const scrollDownText = heroContent.scrolldown[lang] || heroContent.scrolldown.en;
  const backgrounds = Object.values(heroContent.background);
  const supplierBrandings = Object.values(heroContent["suppliers-branding"]);

  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgrounds.length]);

  return (
    <main className="relative w-full overflow-hidden">
      <section className="relative w-full h-screen flex flex-col justify-center items-center text-center text-white overflow-hidden">
        {backgrounds.map((path, i) => (
          <div
            key={`bg-${i}`}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              i === currentBg ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${path})` }}
          ></div>
        ))}

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 max-w-3xl px-4 mx-auto w-full">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg leading-tight">
            {heading}
          </h1>
          <p className="text-base xs:text-lg sm:text-xl mb-8 drop-shadow-md px-2 sm:px-0">{subheading}</p>
          <button
            className="px-4 sm:px-6 py-2 border font-semibold rounded-4xl shadow transition duration-300 text-sm sm:text-base"
            style={{
              borderColor: "var(--color-background)",
              color: "white",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-background)";
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

        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10">
          <p className="text-sm md:text-base text-white mb-2 tracking-wider">
            {scrollDownText}
          </p>
          <Mouse className="w-8 h-8 text-[var(--color-background)]" />
        </div>
      </section>

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
        <style jsx>{`
          @keyframes slide {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-100%);
            }
          }
        `}</style>
      </section>
    </main>
  );
}

// ======================== ABOUT SECTION ========================
function AboutSection() {
  const params = useParams();
  const lang = (params.lang as "en" | "zh" | "si") || "en";
  const title = aboutContent.title[lang] || aboutContent.title.en;
  const description = aboutContent.description[lang] || aboutContent.description.en;
  const statuses = aboutContent.status;

  return (
    <section className="bg-[var(--color-background)] max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
      <div className="flex flex-col justify-center">
        <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-4 sm:mb-6 text-center md:text-left">{title}</h2>
        <p className="text-base sm:text-lg text-[var(--color-text)] text-center md:text-left">{description}</p>
      </div>

      <div className="flex flex-col gap-4 sm:gap-6 pl-0 md:pl-20 lg:pl-40 mt-6 md:mt-0">
        {statuses.map((status: { id: string; count: string; en: string; zh?: string; si?: string }) => (
          <StatusCard key={status.id} count={status.count} label={status[lang] || status.en} />
        ))}
      </div>
    </section>
  );
}

function StatusCard({ count, label }: { count: string; label: string }) {
  const [animatedCount, setAnimatedCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById(label);
      if (element) {
        const rect = element.getBoundingClientRect();
        const isInViewport = rect.top >= 0 && rect.bottom <= window.innerHeight;
        if (isInViewport) setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [label]);

  useEffect(() => {
    if (isVisible) {
      const target = parseInt(count.replace(/\D/g, ""), 10);
      const duration = 2000;
      const increment = target / (duration / 50);
      const interval = setInterval(() => {
        setAnimatedCount((prev) => {
          const nextValue = Math.min(prev + increment, target);
          if (nextValue === target) clearInterval(interval);
          return nextValue;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isVisible, count]);

  return (
    <div
      id={label}
      className="flex items-center justify-between p-6 rounded-lg bg-[var(--color-primary)] text-[var(--color-background)] shadow-md"
    >
      <span className="text-4xl font-extrabold">{Math.floor(animatedCount)}+</span>
      <p className="text-lg font-medium">{label}</p>
    </div>
  );
}

// ======================== LEADERS SECTION ========================
function LeadersSection() {
  const params = useParams();
  const lang = (params.lang as "en" | "zh" | "si") || "en";

  const heading = leadersContent.heading[lang] || leadersContent.heading.en;
  const title = leadersContent.title[lang] || leadersContent.title.en;
  const description = leadersContent.description[lang] || leadersContent.description.en;
  const btnText = leadersContent.btn[lang] || leadersContent.btn.en;
  const leaders: Array<{
    id: string;
    name: { en: string; zh?: string; si?: string };
    role: { en: string; zh?: string; si?: string };
    imagePath: string;
  }> = leadersContent.leaders;

  const getText = (obj: { en: string; zh?: string; si?: string }) => obj[lang] || obj.en;

  return (
    <section className="bg-[var(--color-background)] max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
      <h1 className="text-2xl xs:text-3xl sm:text-4xl font-extrabold text-center text-[var(--color-primary)] mb-8 sm:mb-12">{heading}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mx-auto w-full">
          {leaders.map((leader) => (
            <div
              key={leader.id}
              className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group w-full max-w-[300px] mx-auto"
            >
              <img src={leader.imagePath} alt={getText(leader.name)} className="w-full h-72 sm:h-96 object-cover" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-left w-full bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-transparent">
                <h4 className="text-base sm:text-lg font-bold mb-1 text-white">{getText(leader.name)}</h4>
                <p className="text-xs sm:text-sm text-gray-200">{getText(leader.role)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-center text-center md:text-left">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-4 sm:mb-6">{title}</h2>
          <p className="text-base sm:text-lg text-[var(--color-text)] mb-4 sm:mb-6 px-2 md:px-0">{description}</p>
          <div className="mt-4 sm:mt-5 flex justify-center md:justify-start">
            <a
              href={`/${lang}/leadership`}
              className="inline-block border border-[var(--color-primary)] text-[var(--color-text)] font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-4xl shadow transition-colors duration-200 hover:bg-[var(--color-primary)] hover:text-white text-sm sm:text-base"
            >
              {btnText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ======================== SUPPLIER SECTION ========================
function SupplierSection() {
  const params = useParams();
  const lang = (params.lang as "en" | "zh" | "si") || "en";

  const heading = supplierContent.heading[lang] || supplierContent.heading.en;
  const description = supplierContent.description[lang] || supplierContent.description.en;
  const imagePath = supplierContent.imagePath;

  return (
    <section className="bg-[var(--color-background)] max-w-6xl mx-auto py-8 sm:py-12 px-4 sm:px-6 text-center">
      <h1 className="text-2xl xs:text-3xl sm:text-4xl font-extrabold text-[var(--color-primary)] mb-4 sm:mb-6">{heading}</h1>
      <p className="text-base sm:text-lg text-[var(--color-text)] mb-6 sm:mb-8 px-2 sm:px-0">{description}</p>
      <div className="w-full">
        <Image
          src={supplierContent.imagePath}
          alt="Supplier"
          width={800} // Adjust width as needed
          height={400} // Adjust height as needed
          className="w-full h-48 sm:h-72 object-cover rounded-2xl sm:rounded-4xl shadow-md"
        />
      </div>
    </section>
  );
}

// ======================== PRODUCTS SECTION ========================
function ProductsSection() {
  const params = useParams();
  const lang = (params.lang as "en" | "zh" | "si") || "en";

  const heading = productContents.heading[lang] || productContents.heading.en;
  const description = productContents.description[lang] || productContents.description.en;
  const categories: Array<{
    id: string;
    name: { en: string; zh?: string; si?: string };
    imagePath: string;
  }> = productContents.categories;

  return (
    <section className="bg-[var(--color-background)] max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 text-center">
      <h1 className="text-2xl xs:text-3xl sm:text-4xl font-extrabold text-[var(--color-primary)] mb-4 sm:mb-6">{heading}</h1>
      <p className="text-base sm:text-lg text-[var(--color-text)] mb-6 sm:mb-8 max-w-3xl mx-auto px-2 sm:px-0">{description}</p>

      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
        {categories.slice(0, 4).map((category) => (
          <div
            key={category.id}
            className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group"
          >
            <Image
              src={category.imagePath}
              alt={category.name[lang] || category.name.en}
              width={300} // Adjust width as needed
              height={300} // Adjust height as needed
              className="w-full h-[200px] xs:h-[250px] sm:h-[300px] md:h-[350px] object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-black/40 text-left">
              <h4 className="text-base sm:text-lg font-semibold text-white">{category.name[lang] || category.name.en}</h4>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 justify-center mx-auto max-w-5xl">
        {categories.slice(4).map((category) => (
          <div
            key={category.id}
            className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group"
          >
            <Image
              src={category.imagePath}
              alt={category.name[lang] || category.name.en}
              width={300} // Adjust width as needed
              height={300} // Adjust height as needed
              className="w-full h-[200px] xs:h-[250px] sm:h-[300px] md:h-[350px] object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-black/60 text-left">
              <h4 className="text-base sm:text-lg font-semibold text-white">{category.name[lang] || category.name.en}</h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ======================== CTA SECTION ========================
function CTASection() {
  const params = useParams();
  const lang = (params.lang as "en" | "zh" | "si") || "en";

  const heading = ctaContent.heading[lang] || ctaContent.heading.en;
  const subheading = ctaContent.subheading[lang] || ctaContent.subheading.en;
  const description = ctaContent.description[lang] || ctaContent.description.en;
  const buttonText = ctaContent.btn[lang] || ctaContent.btn.en;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
      <section className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-8 text-center bg-[var(--color-primary)] text-white rounded-2xl sm:rounded-3xl mb-8 sm:mb-15">
        <h1 className="text-2xl xs:text-3xl sm:text-4xl font-extrabold mb-3 sm:mb-4">{heading}</h1>
        <h2 className="text-xl xs:text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">{subheading}</h2>
        <p className="text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto px-2 sm:px-0">{description}</p>
        <button className="px-4 sm:px-6 py-2 sm:py-3 border border-white font-semibold rounded-full shadow-md hover:bg-white hover:text-[var(--color-primary)] transition-colors duration-300 text-sm sm:text-base">
          {buttonText}
        </button>
      </section>
    </div>
  );
}
