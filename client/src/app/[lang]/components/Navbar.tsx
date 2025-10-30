"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import navbarContent from "../../../data/navbar/content.json";
import productContent from "../../../data/products/content.json";

type NavbarProps = {
  lang: "en" | "zh" | "si";
};

// Product JSON types (narrowed to avoid `any` and satisfy eslint)
type LocalizedEntry = {
  category?: string;
  assetName?: string;
  items?: unknown[];
};

type ProductCategory = Partial<Record<'en' | 'zh' | 'si', LocalizedEntry>>;

const Navbar: React.FC<NavbarProps> = ({ lang }) => {
  const router = useRouter();

  // ✅ Load navbar text based on language
  const navData = navbarContent[lang] || navbarContent["en"];

  // ✅ Load product headings and categories dynamically
  const productData = productContent;
  const importHeading =
    productData.headings?.[lang]?.subheadingImport ||
    productData.headings?.["en"]?.subheadingImport ||
    "Import Products";

  const exportHeading =
    productData.headings?.[lang]?.subheadingExport ||
    productData.headings?.["en"]?.subheadingExport ||
    "Export Products";

  const importCategories = Object.values(productData.import || {})
    .map((cat: ProductCategory) => cat[lang]?.category || cat.en?.category)
    .filter((c): c is string => typeof c === "string");

  const exportCategories = Object.values(productData.export || {})
    .map((cat: ProductCategory) => cat[lang]?.category || cat.en?.category)
    .filter((c): c is string => typeof c === "string");

  // ✅ States
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ✅ Language-aware navigation
  const navigate = (path: string) => {
    router.push(`/${lang}${path}`);
    setIsMenuOpen(false);
    setHoveredMenu(null);
    setExpandedMobile(null);
  };

  const handleCategoryClick = (category: string) => {
    router.push(`/${lang}/products?category=${encodeURIComponent(category)}`);
    setIsMenuOpen(false);
    setHoveredMenu(null);
    setExpandedMobile(null);
  };

  const handleMouseEnter = (menu: string) => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    setHoveredMenu(menu);
  };

  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => setHoveredMenu(null), 200);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-2 sm:p-3 md:p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-[var(--color-primary)]/10 text-[var(--color-text-light)] rounded-2xl px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 shadow-lg backdrop-blur-lg border border-white/20 relative">
        
        {/* 🔷 Logo */}
        <div
          className="flex items-center gap-2 sm:gap-3 cursor-pointer flex-shrink-0"
          onClick={() => navigate("/")}
        >
          <div className="w-8 sm:w-9 md:w-10 h-5 sm:h-6 bg-white rounded-full shadow-md"></div>
          <span className="hidden sm:inline text-sm md:text-base font-semibold">Logo</span>
        </div>

        {/* 📱 Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 flex flex-col gap-1.5 ml-auto"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* 💻 Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10 flex-1 justify-center">
          <ul className="flex items-center gap-6 lg:gap-10">
            {/* Home */}
            <li
              className="hover:text-[var(--color-secondary)] cursor-pointer transition-colors duration-200 text-sm lg:text-base"
              onClick={() => navigate("/")}
            >
              {navData.home}
            </li>

            {/* About Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("about")}
              onMouseLeave={handleMouseLeave}
            >
              <li className="flex items-center gap-1 cursor-pointer hover:text-[var(--color-secondary)] text-sm lg:text-base">
                {navData.about.title}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    hoveredMenu === "about" ? "rotate-180" : ""
                  }`}
                />
              </li>

              <div
                className={`absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-80 bg-white/95 backdrop-blur-md text-[var(--color-primary)] rounded-2xl shadow-2xl border border-white/30 p-4 grid gap-2 transition-all duration-200 ${
                  hoveredMenu === "about"
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                }`}
              >
                {[
                  { label: navData.about.subNav.ourCompany, path: "/our-company" },
                  { label: navData.about.subNav.ourSuppliers, path: "/" },
                  { label: navData.about.subNav.ourLeadership, path: "/" },
                  { label: navData.about.subNav.ourHistory, path: "/" },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => navigate(item.path)}
                    className="text-left p-3 rounded-lg hover:bg-[var(--color-primary)]/10 transition-all duration-200 text-sm font-medium"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("products")}
              onMouseLeave={handleMouseLeave}
            >
              <li className="flex items-center gap-1 cursor-pointer hover:text-[var(--color-secondary)] text-sm lg:text-base">
                {navData.products}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    hoveredMenu === "products" ? "rotate-180" : ""
                  }`}
                />
              </li>

              <div
                className={`absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-[500px] bg-white/95 backdrop-blur-md text-[var(--color-primary)] rounded-2xl shadow-2xl border border-white/30 p-6 grid grid-cols-2 gap-6 transition-all duration-200 ${
                  hoveredMenu === "products"
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                }`}
              >
                <div>
                  <h4 className="font-semibold mb-3 border-b border-gray-200 pb-2 text-sm">
                    {importHeading}
                  </h4>
                  <div className="flex flex-col gap-1">
                    {importCategories.map((category, index) => (
                      <button
                        key={index}
                        className="text-left text-sm p-2 rounded-md hover:bg-[var(--color-primary)]/10"
                        onClick={() => handleCategoryClick(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 border-b border-gray-200 pb-2 text-sm">
                    {exportHeading}
                  </h4>
                  <div className="flex flex-col gap-1">
                    {exportCategories.map((category, index) => (
                      <button
                        key={index}
                        className="text-left text-sm p-2 rounded-md hover:bg-[var(--color-primary)]/10"
                        onClick={() => handleCategoryClick(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ul>
        </div>

        {/* CTA */}
        <button className="hidden md:block bg-[var(--color-text-light)] text-[var(--color-primary)] px-6 py-2 rounded-full hover:bg-white/90 shadow-md text-sm lg:text-base font-semibold transition-all duration-200">
          {navData.getQuotation}
        </button>

        {/* 📱 Mobile Menu */}
        <div
          className={`${
            isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          } absolute top-full left-0 right-0 md:hidden flex flex-col gap-4 bg-[var(--color-primary)]/95 backdrop-blur-md p-5 mt-2 rounded-2xl transition-all duration-300 overflow-hidden shadow-2xl border border-white/20`}
        >
          <button
            onClick={() => navigate("/")}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 transition text-sm sm:text-base font-medium"
          >
            {navData.home}
          </button>

          {/* About Accordion */}
          <div>
            <button
              onClick={() =>
                setExpandedMobile(expandedMobile === "about" ? null : "about")
              }
              className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 flex justify-between items-center text-sm sm:text-base font-medium"
            >
              {navData.about.title}
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  expandedMobile === "about" ? "rotate-180" : ""
                }`}
              />
            </button>
            {expandedMobile === "about" && (
              <div className="pl-6 flex flex-col gap-1 border-l-2 border-white/20">
                {[
                  { label: navData.about.subNav.ourCompany, path: "/our-company" },
                  { label: navData.about.subNav.ourSuppliers, path: "/our-suppliers" },
                  { label: navData.about.subNav.ourLeadership, path: "/our-leadership" },
                  { label: navData.about.subNav.ourHistory, path: "/" },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => navigate(item.path)}
                    className="text-left px-4 py-2 rounded-lg hover:bg-white/10 text-xs sm:text-sm font-medium"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Products Accordion */}
          <div>
            <button
              onClick={() =>
                setExpandedMobile(
                  expandedMobile === "products" ? null : "products"
                )
              }
              className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 flex justify-between items-center text-sm sm:text-base font-medium"
            >
              {navData.products}
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  expandedMobile === "products" ? "rotate-180" : ""
                }`}
              />
            </button>

            {expandedMobile === "products" && (
              <div className="pt-2 flex flex-col gap-2">
                <div className="px-4">
                  <h4 className="font-semibold text-xs sm:text-sm mb-2 text-white/80">
                    {importHeading}
                  </h4>
                  {importCategories.map((category, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleCategoryClick(category)}
                      className="block text-left py-1.5 px-2 rounded hover:bg-white/10 text-xs sm:text-sm"
                    >
                      {category}
                    </button>
                  ))}
                </div>
                <div className="px-4">
                  <h4 className="font-semibold text-xs sm:text-sm mb-2 text-white/80">
                    {exportHeading}
                  </h4>
                  {exportCategories.map((category, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleCategoryClick(category)}
                      className="block text-left py-1.5 px-2 rounded hover:bg-white/10 text-xs sm:text-sm"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* CTA */}
          <button className="w-full bg-[var(--color-text-light)] text-[var(--color-primary)] px-6 py-3 rounded-full hover:bg-white/90 shadow-md text-sm font-semibold mt-2">
            {navData.getQuotation}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
