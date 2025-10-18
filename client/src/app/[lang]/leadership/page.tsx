import React from "react";
import leadershipContents from "../../../data/leadership/content.json";

/* =====================
   Type Definitions
===================== */
interface LocalizedText {
  en: string;
  zh?: string;
  si?: string;
}

interface LeadershipMember {
  name: LocalizedText;
  title: LocalizedText;
  imagePath: string;
  message?: LocalizedText;
}

interface Destination3Member extends LeadershipMember {
  description: LocalizedText;
}

type Headings = {
  heading: string;
  subheadingDestination1: string;
  subheadingDestination2: string;
  subheadingDestination3: string;
  subheading2Destination3: string;
  exploreBlogBtn: string;
  destination3Description?: string;
};

interface LeadershipContent {
  headings: Record<"en" | "zh" | "si", Headings>;
  destination1: LeadershipMember;
  destination2: LeadershipMember;
  destination3: Destination3Member[];
  destination3Description?: Record<string, string>;
}

interface PageProps {
  params: {
    lang: "en" | "zh" | "si";
  };
}

/* =====================
   Component
===================== */
export default async function LeadershipPage({ params }: PageProps) {
  const awaitedParams = await params;
  const { lang } = awaitedParams;
  const content = leadershipContents as LeadershipContent & { destination3Description?: Record<string, string> };

  const headings = content.headings[lang] || content.headings["en"];
  const destination1 = content.destination1;
  const destination2 = content.destination2;
  const destination3 = content.destination3;
  const destination3Paragraph = content.destination3Description?.[lang] || content.destination3Description?.["en"] || "";

  const getText = (obj: LocalizedText) => obj[lang] || obj.en;

  return (
    <main className="p-8">
      {/* Main Heading */}
      <h1 className="text-3xl md:text-4xl font-extrabold mb-12 text-center text-primary">{headings.heading}</h1>

      {/* Destination1 Section */}
      <section className="mb-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-24">
          <div className="flex-[0_0_auto]">
            <div className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group">
              <img
                src={destination1.imagePath}
                alt={getText(destination1.name)}
                className="w-[300px] h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[rgba(3,18,47,0.4)] via-transparent to-transparent">
                <h3 className="text-lg font-semibold mb-1 text-white drop-shadow-md">
                  {getText(destination1.name)}
                </h3>
                <p className="text-sm text-gray-200 drop-shadow-md">
                  {getText(destination1.title)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-4 text-primary">{headings.subheadingDestination1}</h2>
            <p className="text-[var(--color-text)] leading-relaxed">{getText(destination1.message!)}</p>
            <div className="mt-10">
              <a
                href={`/${lang}/blog`}
                className="border border-[var(--color-primary)] text-[var(--color-text)] font-semibold py-3 px-6 rounded-4xl shadow transition-colors duration-200 hover:bg-[var(--color-primary)] hover:text-white"
              >
                {headings.exploreBlogBtn}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Destination2 Section */}
      <section className="mb-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse items-center gap-24">
          <div className="flex-[0_0_auto]">
            <div className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group">
              <img
                src={destination2.imagePath}
                alt={getText(destination2.name)}
                className="w-[300px] h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[rgba(3,18,47,0.4)] via-transparent to-transparent">
                <h3 className="text-lg font-semibold mb-1 text-white drop-shadow-md">
                  {getText(destination2.name)}
                </h3>
                <p className="text-sm text-gray-200 drop-shadow-md">
                  {getText(destination2.title)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-4 text-primary">{headings.subheadingDestination2}</h2>
            <p className="text-[var(--color-text)] leading-relaxed">{getText(destination2.message!)}</p>
            <div className="mt-10">
              <a
                href={`/${lang}/blog`}
                className="border border-[var(--color-primary)] text-[var(--color-text)] font-semibold py-3 px-6 rounded-4xl shadow transition-colors duration-200 hover:bg-[var(--color-primary)] hover:text-white"
              >
                {headings.exploreBlogBtn}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Destination3 Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-2 text-center text-primary">{headings.subheadingDestination3}</h2>
        <p className="text-2xl font-medium text-center mb-6 text-primary">{headings.subheading2Destination3}</p>
        {destination3Paragraph && (
          <p className="max-w-xl text-gray-700 text-center mx-auto mb-8">{destination3Paragraph}</p>
        )}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {destination3.map((member, index) => (
            <div
              key={index}
              className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group"
            >
              {/* Card image */}
              <img
                src={member.imagePath}
                alt={getText(member.name)}
                className="w-full h-80 object-cover"
              />

              {/* Name and title gradient at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-left w-full bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-transparent">
                <h4 className="text-lg font-bold mb-1 text-white">{getText(member.name)}</h4>
                <p className="text-sm text-gray-200">{getText(member.title)}</p>
              </div>

              {/* Hover overlay remains the same */}
              <div className="absolute inset-0 bg-[rgba(3,18,47,0.9)] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col">
                {/* Top section: small avatar + name & title */}
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={member.imagePath}
                    alt={getText(member.name)}
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex flex-col">
                    <h4 className="text-lg font-bold">{getText(member.name)}</h4>
                    <p className="text-sm">{getText(member.title)}</p>
                  </div>
                </div>
                {/* Description/content below */}
                <p className="text-sm mt-2">{member.description[lang] || member.description.en}</p>
              </div>
            </div>
          ))}
        </div>
      </section>


    </main>
  );
}
