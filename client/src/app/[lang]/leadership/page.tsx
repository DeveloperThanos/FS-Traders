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
  subheadingFounder: string;
  subheadingCEO: string;
  subheadingDirectors: string;
  directorsDescription: string;
  exploreBlogBtn: string;
}

interface LeadershipContent {
  headings: Record<"en" | "zh" | "si", Headings>;
  founder: LeadershipMember;
  ceo: LeadershipMember;
  directors: LeadershipMember[];
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
  const content = leadershipContents as LeadershipContent & { directorParagraph?: Record<string, string> };

  const headings = content.headings[lang] || content.headings["en"];
  const founder = content.founder;
  const ceo = content.ceo;
  const directors = content.directors;
  const directorParagraph = content.directorParagraph?.[lang] || content.directorParagraph?.["en"] || "";

  const getText = (obj: LocalizedText) => obj[lang] || obj.en;

  return (
    <main className="p-8">
      {/* Heading */}
      <h1 className="text-5xl font-bold mb-12 text-center">
        {headings.heading}
      </h1>

      {/* Founder Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          {headings.subheadingFounder}
        </h2>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <img
            src={founder.imagePath}
            alt={getText(founder.name)}
            className="w-64 h-64 object-cover rounded-full shadow-lg"
          />
          <div>
            <h3 className="text-2xl font-bold">{getText(founder.name)}</h3>
            <p className="text-gray-500 mb-4">{getText(founder.title)}</p>
            <p className="text-gray-700 leading-relaxed">
              {getText(founder.message!)}
            </p>
            <div className="mt-4">
              <a href={`/${lang}/blog`} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition-colors duration-200">
                {headings.exploreBlogBtn}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CEO Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          {headings.subheadingCEO}
        </h2>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row-reverse items-center gap-8">
          <img
            src={ceo.imagePath}
            alt={getText(ceo.name)}
            className="w-64 h-64 object-cover rounded-full shadow-lg"
          />
          <div>
            <h3 className="text-2xl font-bold">{getText(ceo.name)}</h3>
            <p className="text-gray-500 mb-4">{getText(ceo.title)}</p>
            <p className="text-gray-700 leading-relaxed">
              {getText(ceo.message!)}
            </p>
            <div className="mt-4">
              <a href={`/${lang}/blog`} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition-colors duration-200">
                {headings.exploreBlogBtn}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Directors Section */}
      <section>
        <h2 className="text-3xl font-semibold mb-6 text-center">
          {headings.subheadingDirectors}
        </h2>
        <p className="text-gray-600 text-center mb-4">
          {headings.directorsDescription}
        </p>
        {directorParagraph && (
          <p className="text-gray-700 text-center mb-8">
            {directorParagraph}
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {directors.map((director, index) => (
            <div
              key={index}
              className="text-center border rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4"
            >
              <img
                src={director.imagePath}
                alt={getText(director.name)}
                className="w-40 h-40 object-cover rounded-full mx-auto mb-4"
              />
              <h4 className="text-lg font-bold">
                {getText(director.name)}
              </h4>
              <p className="text-sm text-gray-500">
                {getText(director.title)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
