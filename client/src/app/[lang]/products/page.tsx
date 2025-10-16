import React from "react";
import productContents from "../../../data/products/content.json";

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

  const headings =
    content.headings[lang] || content.headings["en"];

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
    <main className="p-8">
      <h1 className="text-5xl font-bold mb-4 text-center">
        {headings.heading}
      </h1>

      {/* Import Section */}
      <h2 className="text-xl text-gray-600 mb-8 text-center">
        {headings.subheadingImport}
      </h2>
      {importCategories.map((category, index) => (
        <section key={index} className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">
            {category.category}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {category.items.map((item, idx) => (
              <div
                key={idx}
                className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={item.imagePath}
                  alt={item.imageName}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-bold mb-2">
                    {item.imageName}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {item.origins.join(", ")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Export Section */}
      <h2 className="text-xl text-gray-600 mb-8 text-center">
        {headings.subheadingExport}
      </h2>
      {exportCategories.map((category, index) => (
        <section key={index} className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">
            {category.category}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {category.items.map((item, idx) => (
              <div
                key={idx}
                className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={item.imagePath}
                  alt={item.imageName}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-bold mb-2">
                    {item.imageName}
                  </h4>
                  <p className="text-sm text-gray-500">
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
