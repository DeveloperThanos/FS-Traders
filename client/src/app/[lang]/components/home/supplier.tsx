"use client";

import React from "react";
import { useParams } from "next/navigation";
import supplierContent from "../../../../data/home/supplier/contents.json";

export default function SupplierSection() {
  const params = useParams();
  const lang = (params.lang as "en" | "zh" | "si") || "en";

  const heading = supplierContent.heading[lang] || supplierContent.heading.en;
  const description = supplierContent.description[lang] || supplierContent.description.en;
  const imagePath = supplierContent.imagePath;

  return (
    <section className="max-w-6xl mx-auto py-12 px-6 text-center">
      {/* Centered Heading */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-primary)] mb-6">
        {heading}
      </h1>

      {/* Centered Description */}
      <p className="text-lg text-[var(--color-text)] mb-8">
        {description}
      </p>

      {/* Full-Width Image */}
      <div className="w-full">
        <img
          src={imagePath}
          alt="Supplier"
          className="w-full h-72 object-cover rounded-4xl shadow-md"
        />
      </div>
    </section>
  );
}