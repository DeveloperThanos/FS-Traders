import React from "react";
import productContents from "../../../data/products/content.json";
import "../../globals.css"; 

/* =====================
   Type Definitions
===================== */
interface LocalizedString {
  en: string;
  zh?: string;
  si?: string;
}

interface ProductItemLang {
  imageName: string;
  origins: string[];
}

interface ProductItem {
  imagePath: string;
  en: ProductItemLang;
  zh?: ProductItemLang;
  si?: ProductItemLang;
}

interface ProductCategoryLang {
  category: string;
}

interface ProductCategory {
  en: ProductCategoryLang;
  zh?: ProductCategoryLang;
  si?: ProductCategoryLang;
  items: ProductItem[];
}

interface Headings {
  heading: string;
  subheadingImport: string;
  subheadingExport: string;
}

interface ProductContents {
  headings: Record<"en" | "zh" | "si", Headings>;
  import: Record<string, ProductCategory>;
  export: Record<string, ProductCategory>;
}

interface PageProps {
  params: {
    lang: "en" | "zh" | "si";
  };
}

/* =====================
   Component
===================== */
export default async function ProductsPage({ params }: PageProps) {
  const awaitedParams = await params;
  const { lang } = awaitedParams;
  const content = productContents as ProductContents;

  const headings = content.headings[lang] || content.headings["en"];

  const importCategories = Object.values(content.import).map((category) => ({
    category: category[lang]?.category || category.en.category,
    items: category.items.map((item) => ({
      imagePath: item.imagePath,
      imageName: item[lang]?.imageName || item.en.imageName,
      origins: item[lang]?.origins || item.en.origins,
    })),
  }));

  const exportCategories = Object.values(content.export).map((category) => ({
    category: category[lang]?.category || category.en.category,
    items: category.items.map((item) => ({
      imagePath: item.imagePath,
      imageName: item[lang]?.imageName || item.en.imageName,
      origins: item[lang]?.origins || item.en.origins,
    })),
  }));

  return (
    <main className="p-8 mx-auto max-w-7xl bg-background">
      {/* Main Heading */}
      <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-center text-primary">
        {headings.heading}
      </h1>

      {/* Import Section */}
      <h2 className="text-2xl text-primary mb-8 text-center font-bold">
        {headings.subheadingImport}
      </h2>

      {importCategories.map((category, index) => (
        <section key={index} className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-primary">
            {category.category}
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {category.items.map((item, idx) => (
              <div
                key={idx}
                className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group"
              >
                {/* Image */}
                <img
                  src={item.imagePath}
                  alt={item.imageName}
                  className="w-full h-[250px] sm:h-[350px] object-cover transform group-hover:scale-105 transition-transform duration-500"
                />

                {/* Subtle Overlay (fade effect) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Text Overlay (light bg on hover) */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transition-colors duration-300 bg-transparent group-hover:bg-black/40">
                  <h4 className="text-lg font-semibold mb-1 text-white drop-shadow-md">
                    {item.imageName}
                  </h4>
                  <p className="text-sm text-gray-200 drop-shadow-md">
                    {item.origins.join(", ")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Export Section */}
      <h2 className="text-2xl text-primary mb-8 text-center font-bold">
        {headings.subheadingExport}
      </h2>

      {exportCategories.map((category, index) => (
        <section key={index} className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-primary">
            {category.category}
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {category.items.map((item, idx) => (
              <div
                key={idx}
                className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group"
              >
                {/* Image */}
                <img
                  src={item.imagePath}
                  alt={item.imageName}
                  className="w-full h-[250px] sm:h-[350px] object-cover transform group-hover:scale-105 transition-transform duration-500"
                />

                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Text Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transition-colors duration-300 bg-transparent group-hover:bg-black/40">
                  <h4 className="text-lg font-semibold mb-1 text-white drop-shadow-md">
                    {item.imageName}
                  </h4>
                  <p className="text-sm text-gray-200 drop-shadow-md">
                    {item.origins.join(", ")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
