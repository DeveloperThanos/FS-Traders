"use client";

import React from "react";
import { useParams } from "next/navigation";
import ctaContent from "../../../../data/home/cta-section/contents.json";

export default function CTASection() {
  const params = useParams();
  const lang = (params.lang as "en" | "zh" | "si") || "en";

  const heading = ctaContent.heading[lang] || ctaContent.heading.en;
  const subheading = ctaContent.subheading[lang] || ctaContent.subheading.en;
  const description = ctaContent.description[lang] || ctaContent.description.en;
  const buttonText = ctaContent.btn[lang] || ctaContent.btn.en;

  return (
    <section className="max-w-7xl mx-auto py-12 px-6 text-center bg-[var(--color-primary)] text-white rounded-3xl mb-15">
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">
        {heading}
      </h1>

      {/* Subheading */}
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
        {subheading}
      </h2>

      {/* Description */}
      <p className="text-lg mb-8 max-w-4xl mx-auto">
        {description}
      </p>

      {/* Button */}
      <button
        className="px-6 py-3 border border-white font-semibold rounded-full shadow-md hover:bg-white hover:text-[var(--color-primary)] transition-colors duration-300"
      >
        {buttonText}
      </button>
    </section>
  );
}