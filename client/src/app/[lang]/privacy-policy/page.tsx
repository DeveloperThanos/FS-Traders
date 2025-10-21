"use client";

import React from "react";
import { useParams } from "next/navigation";
import privacyPolicyContent from "../../../data/privacy-policy/content.json";

export default function PrivacyPolicyPage() {
  const params = useParams();
  const lang = params.lang as "en" | "zh" | "si";

  const heading = privacyPolicyContent.heading[lang] || privacyPolicyContent.heading.en;
  const sections = privacyPolicyContent.sections;

  return (
    <main className="p-4 md:p-8">
      {/* Heading */}
      <section className="max-w-6xl mx-auto mb-12 md:mb-20">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-primary mb-8 md:mb-12">
          {heading}
        </h1>
      </section>

      {/* Sections */}
      <section className="max-w-4xl mx-auto space-y-8">
        {sections.map((section) => {
          const title = section[lang]?.title || section.en.title;
          const description = section[lang]?.description || section.en.description;
          const points = section[lang]?.points || section.en.points;

          return (
            <div key={section.id} className="space-y-4">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
                {title}
              </h2>
              <p className="text-[var(--color-text)] leading-relaxed text-sm md:text-base">
                {description}
              </p>
              {points && (
                <ul className="list-disc pl-5 text-[var(--color-text)] text-sm md:text-base space-y-2">
                  {points.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </section>
    </main>
  );
}