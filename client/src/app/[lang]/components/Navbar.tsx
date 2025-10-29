"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import content from "../../../data/navbar/content.json";
import productContent from "../../../data/products/content.json";

type NavbarProps = {
  lang: "en" | "zh" | "si";
};

const Navbar: React.FC<NavbarProps> = ({ lang }) => {
  const navData = content[lang];
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const [showProductsDropdown, setShowProductsDropdown] = useState(false);
  const router = useRouter();

  const importCategories = Object.values(productContent.import).map(
    (category) => category.en.category
  );
  const exportCategories = Object.values(productContent.export).map(
    (category) => category.en.category
  );

  const handleCategoryClick = (category: string) => {
    router.push(`/${lang}/products?category=${encodeURIComponent(category)}`);
  };

  return (
    <nav className="fixed top-0 w-full z-50 p-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between bg-[var(--color-primary)]/40 text-[var(--color-text-light)] rounded-2xl px-6 py-2 shadow-md backdrop-blur-md">
        {/* Left toggle */}
        <div className="flex items-center gap-4">
          <button className="w-10 h-6 bg-white rounded-full shadow-md"></button>
        </div>

        {/* Right menu items + button */}
        <div className="flex items-center gap-12 ml-auto">
          <ul className="flex items-center gap-12">
            <li className="hover:text-[var(--color-secondary)] cursor-pointer">{navData.home}</li>
            <li
              className="relative cursor-pointer"
              onMouseEnter={() => setShowAboutDropdown(true)}
              onMouseLeave={() => setShowAboutDropdown(false)}
            >
              {navData.about.title}
              {showAboutDropdown && (
                <div className="absolute top-full mt-2 right-0 w-48 bg-white text-[var(--color-primary)] rounded-lg shadow-lg flex flex-col">
                  <button className="p-2 text-left hover:bg-gray-100">{navData.about.subNav.ourCompany}</button>
                  <button className="p-2 text-left hover:bg-gray-100">{navData.about.subNav.ourLeadership}</button>
                  <button className="p-2 text-left hover:bg-gray-100">{navData.about.subNav.ourHistory}</button>
                </div>
              )}
            </li>
            <li
              className="relative cursor-pointer"
              onMouseEnter={() => setShowProductsDropdown(true)}
              onMouseLeave={() => setShowProductsDropdown(false)}
            >
              {navData.products}
              {showProductsDropdown && (
                <div className="absolute top-full mt-2 right-0 w-96 bg-white text-[var(--color-primary)] rounded-lg shadow-lg flex flex-row justify-between p-4">
                  <div>
                    <h4 className="font-bold mb-2">Import</h4>
                    {importCategories.map((category, index) => (
                      <button
                        key={index}
                        className="block p-2 text-left hover:bg-gray-100"
                        onClick={() => handleCategoryClick(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Export</h4>
                    {exportCategories.map((category, index) => (
                      <button
                        key={index}
                        className="block p-2 text-left hover:bg-gray-100"
                        onClick={() => handleCategoryClick(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </li>
          </ul>

          {/* Right button */}
          <button className="bg-[var(--color-text-light)] text-[var(--color-primary)] px-6 py-3 rounded-full hover:bg-white/90 shadow-md" suppressHydrationWarning={true}>
            {navData.getQuotation}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
