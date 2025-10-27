"use client";

import React from "react";
import { useParams } from "next/navigation";
import leadersContent from "../../../../data/home/leadership/contents.json";

interface LocalizedText {
  en: string;
  zh?: string;
  si?: string;
}

export default function LeadersSection() {
  const params = useParams();
  const lang = (params.lang as "en" | "zh" | "si") || "en";

  const heading = leadersContent.heading[lang] || leadersContent.heading.en;
  const title = leadersContent.title[lang] || leadersContent.title.en;
  const description = leadersContent.description[lang] || leadersContent.description.en;
  const btnText = leadersContent.btn[lang] || leadersContent.btn.en;
  const leaders = leadersContent.leaders;

  const getText = (obj: LocalizedText) => obj[lang] || obj.en;

  return (
    <section className="max-w-7xl mx-auto py-12 px-6">
      {/* Top Heading */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-[var(--color-primary)] mb-12">
        {heading}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Left Column: Leader Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {leaders.map((leader) => (
            <div
              key={leader.id}
              className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group"
            >
              <img
                src={leader.imagePath}
                alt={getText(leader.name)}
                className="w-[300px] h-96 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-left w-full bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-transparent">
                <h4 className="text-lg font-bold mb-1 text-white">{getText(leader.name)}</h4>
                <p className="text-sm text-gray-200">{getText(leader.role)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Title, Description, and Button */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-6">
            {title}
          </h2>
          <p className="text-lg text-[var(--color-text)] mb-6">
            {description}
          </p>
          <div className="mt-5">
            <a
              href={`/${lang}/leadership`}
              className="border border-[var(--color-primary)] text-[var(--color-text)] font-semibold py-3 px-6 rounded-4xl shadow transition-colors duration-200 hover:bg-[var(--color-primary)] hover:text-white"
            >
              {btnText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}