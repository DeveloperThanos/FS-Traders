"use client";

import React from "react";
import { useParams } from "next/navigation";
import productContents from "../../../../data/home/products/contents.json";

export default function ProductsSection() {
  const params = useParams();
  const lang = (params.lang as "en" | "zh" | "si") || "en";

  const heading = productContents.heading[lang] || productContents.heading.en;
  const description = productContents.description[lang] || productContents.description.en;
  const categories = productContents.categories;

  return (
    <section className="max-w-7xl mx-auto py-12 px-6 text-center">
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-primary)] mb-6">
        {heading}
      </h1>

      {/* Description */}
      <p className="text-lg text-[var(--color-text)] mb-8 max-w-3xl mx-auto">
        {description}
      </p>

      {/* First 4 Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {categories.slice(0, 4).map((category) => (
          <div
            key={category.id}
            className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group"
          >
            <img
              src={category.imagePath}
              alt={category.name[lang] || category.name.en}
              className="w-full h-[250px] sm:h-[350px] object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/40 text-left">
              <h4 className="text-lg font-semibold text-white">
                {category.name[lang] || category.name.en}
              </h4>
            </div>
          </div>
        ))}
      </div>

      {/* Remaining Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 justify-center mx-auto max-w-5xl">
        {categories.slice(4).map((category) => (
          <div
            key={category.id}
            className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group"
          >
            <img
              src={category.imagePath}
              alt={category.name[lang] || category.name.en}
              className="w-full h-[250px] sm:h-[350px] object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/60 text-left">
              <h4 className="text-lg font-semibold text-white">
                {category.name[lang] || category.name.en}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}