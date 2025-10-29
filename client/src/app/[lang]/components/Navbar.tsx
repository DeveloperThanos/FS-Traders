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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 p-2 sm:p-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between bg-[var(--color-primary)]/40 text-[var(--color-text-light)] rounded-xl sm:rounded-2xl px-4 sm:px-6 py-2 shadow-md backdrop-blur-md">
        {/* Left toggle */}
        <div className="flex items-center gap-4">
          <button className="w-8 sm:w-10 h-5 sm:h-6 bg-white rounded-full shadow-md"></button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="w-6 h-0.5 bg-white mb-1"></div>
          <div className="w-6 h-0.5 bg-white mb-1"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </button>

        {/* Right menu items + button */}
        <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex absolute md:relative top-full left-0 right-0 md:top-auto md:left-auto md:right-auto flex-col md:flex-row items-start md:items-center gap-4 md:gap-12 ml-auto bg-[var(--color-primary)]/95 md:bg-transparent p-4 md:p-0 mt-2 md:mt-0 rounded-xl md:rounded-none`}>
          <ul className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-12 w-full md:w-auto">
            <li className="hover:text-[var(--color-secondary)] cursor-pointer w-full md:w-auto">{navData.home}</li>
            <li
              className="relative cursor-pointer w-full md:w-auto"
              onClick={() => setShowAboutDropdown(!showAboutDropdown)}
              onMouseEnter={() => !isMenuOpen && setShowAboutDropdown(true)}
              onMouseLeave={() => !isMenuOpen && setShowAboutDropdown(false)}
            >
              {navData.about.title}
              {showAboutDropdown && (
                <div className="md:absolute relative top-full mt-2 right-0 w-full md:w-48 bg-white text-[var(--color-primary)] rounded-lg shadow-lg flex flex-col">
                  <button className="p-2 text-left hover:bg-gray-100">{navData.about.subNav.ourCompany}</button>
                  <button className="p-2 text-left hover:bg-gray-100">{navData.about.subNav.ourLeadership}</button>
                  <button className="p-2 text-left hover:bg-gray-100">{navData.about.subNav.ourHistory}</button>
                </div>
              )}
            </li>
            <li
              className="relative cursor-pointer w-full md:w-auto"
              onClick={() => setShowProductsDropdown(!showProductsDropdown)}
              onMouseEnter={() => !isMenuOpen && setShowProductsDropdown(true)}
              onMouseLeave={() => !isMenuOpen && setShowProductsDropdown(false)}
            >
              {navData.products}
              {showProductsDropdown && (
                <div className="md:absolute relative top-full mt-2 right-0 w-full md:w-96 bg-white text-[var(--color-primary)] rounded-lg shadow-lg flex flex-col md:flex-row justify-between p-4">
                  <div className="mb-4 md:mb-0">
                    <h4 className="font-bold mb-2">Import</h4>
                    {importCategories.map((category, index) => (
                      <button
                        key={index}
                        className="block w-full p-2 text-left hover:bg-gray-100"
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
                        className="block w-full p-2 text-left hover:bg-gray-100"
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
          <button className="w-full md:w-auto bg-[var(--color-text-light)] text-[var(--color-primary)] px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-white/90 shadow-md text-sm sm:text-base" suppressHydrationWarning={true}>
            {navData.getQuotation}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
