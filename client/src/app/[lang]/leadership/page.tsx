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

interface Headings {
  heading: string;
  subheadingDestination1: string;
  subheadingDestination2: string;
  subheadingDestination3: string;
  destination3Description: string;
  exploreBlogBtn: string;
}

interface LeadershipContent {
  headings: Record<"en" | "zh" | "si", Headings>;
  destination1: LeadershipMember;
  destination2: LeadershipMember;
  destination3: LeadershipMember[];
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
      {/* Heading */}
      <h1 className="text-5xl font-bold mb-12 text-center">{headings.heading}</h1>

      {/* Destination1 Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          {headings.subheadingDestination1}
        </h2>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <img
            src={destination1.imagePath}
            alt={getText(destination1.name)}
            className="w-64 h-64 object-cover rounded-full shadow-lg"
          />
          <div>
            <h3 className="text-2xl font-bold">{getText(destination1.name)}</h3>
            <p className="text-gray-500 mb-4">{getText(destination1.title)}</p>
            <p className="text-gray-700 leading-relaxed">{getText(destination1.message!)}</p>
            <div className="mt-4">
              <a
                href={`/${lang}/blog`}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition-colors duration-200"
              >
                {headings.exploreBlogBtn}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Destination2 Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          {headings.subheadingDestination2}
        </h2>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row-reverse items-center gap-8">
          <img
            src={destination2.imagePath}
            alt={getText(destination2.name)}
            className="w-64 h-64 object-cover rounded-full shadow-lg"
          />
          <div>
            <h3 className="text-2xl font-bold">{getText(destination2.name)}</h3>
            <p className="text-gray-500 mb-4">{getText(destination2.title)}</p>
            <p className="text-gray-700 leading-relaxed">{getText(destination2.message!)}</p>
            <div className="mt-4">
              <a
                href={`/${lang}/blog`}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition-colors duration-200"
              >
                {headings.exploreBlogBtn}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Destination3 Section */}
      <section>
        <h2 className="text-3xl font-semibold mb-6 text-center">{headings.subheadingDestination3}</h2>
        <p className="text-gray-600 text-center mb-4">{headings.destination3Description}</p>
        {destination3Paragraph && (
          <p className="text-gray-700 text-center mb-8">{destination3Paragraph}</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {destination3.map((member, index) => (
            <div
              key={index}
              className="text-center border rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4"
            >
              <img
                src={member.imagePath}
                alt={getText(member.name)}
                className="w-40 h-40 object-cover rounded-full mx-auto mb-4"
              />
              <h4 className="text-lg font-bold">{getText(member.name)}</h4>
              <p className="text-sm text-gray-500">{getText(member.title)}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
