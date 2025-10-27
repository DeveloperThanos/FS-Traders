"use client";

import React from "react";
import { useParams } from "next/navigation";
import historyContent from "../../../data/history/content.json";

export default function HistoryPage() {
  const params = useParams();
  const lang = params.lang as "en" | "zh" | "si";

  const heading = historyContent.heading[lang] || historyContent.heading.en;
  const timeline: Array<{
    id: string;
    year: string;
    en: { title: string; description: string };
    zh?: { title: string; description: string };
    si?: { title: string; description: string };
  }> = historyContent.timeline;

  return (
    <main className="p-4 md:p-8">
      {/* Heading */}
      <section className="max-w-6xl mx-auto mb-12 md:mb-20">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-[var(--color-primary)] mb-8 md:mb-12">
          {heading}
        </h1>
      </section>

      {/* Scrollable Timeline */}
      <section className="relative max-w-6xl mx-auto">
        {/* Wrapper to contain the vertical line and content */}
        <div className="relative">
          {/* Center vertical line - Hidden on larger screens */}
          <div className="absolute left-1/2 top-0 w-0.5 bg-[var(--color-primary)] -translate-x-1/2 hidden sm:block" style={{ height: "100%" }}></div>

          {/* Desktop Timeline - Hidden on mobile */}
          <div className="hidden sm:block max-h-[70vh] overflow-y-auto relative">
            {timeline.map((entry, index) => {
              const title = entry[lang]?.title || entry.en.title;
              const description = entry[lang]?.description || entry.en.description;
              const isEven = index % 2 === 1;
              const isLast = index === timeline.length - 1;

              return (
                <div key={`desktop-${entry.id}`} className="relative w-full mb-28 md:mb-20">
                  {/* Row for Year, Title, and Dot */}
                  <div className="w-full flex items-center relative">
                    {/* Dot centered vertically on the row */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 md:w-3 md:h-3 bg-[var(--color-primary)] rounded-full z-20"></div>

                    {/* Odd entries: Year left, Title right */}
                    {!isEven ? (
                      <>
                        <div className="w-1/2 flex justify-center pr-32 md:pr-16 relative">
                          <div className="absolute top-1/2 right-5 h-0.5 bg-[var(--color-primary)] w-60 md:w-24 transform -translate-y-1/2"></div>
                          <span className="font-bold text-xl md:text-lg relative z-10 text-[var(--color-primary)] flex items-center">{entry.year}</span>
                        </div>
                        <div className="w-1/2 pl-32 md:pl-16">
                          <h3 className="text-xl md:text-lg font-bold mb-2 flex items-center">{title}</h3>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-1/2 pr-32 md:pr-16 flex justify-end">
                          <h3 className="text-xl md:text-lg font-bold mb-2 flex items-center">{title}</h3>
                        </div>
                        <div className="w-1/2 flex justify-center relative">
                          <div className="absolute top-1/2 left-5 h-0.5 bg-[var(--color-primary)] w-60 md:w-24 transform -translate-y-1/2"></div>
                          <span className="ml-5 font-bold text-xl md:text-lg relative z-10 text-[var(--color-primary)] flex items-center">{entry.year}</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Description below title */}
                  <div className="w-full flex mt-4">
                    {!isEven ? (
                      <>
                        <div className="w-1/2"></div>
                        <div className="w-1/2 pl-32 md:pl-16">
                          <p className="text-base md:text-sm text-[var(--color-text)] leading-relaxed text-justify max-w-md">{description}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-1/2 pr-32 md:pr-16 flex justify-end">
                          <p className="text-base md:text-sm text-[var(--color-text)] leading-relaxed text-justify max-w-md">{description}</p>
                        </div>
                        <div className="w-1/2"></div>
                      </>
                    )}
                  </div>
                  {!isLast && <div className="h-28 md:h-20"></div>}
                </div>
              );
            })}
          </div>

          {/* Mobile Timeline - Only visible on small screens */}
          <div className="sm:hidden max-h-[70vh] overflow-y-auto relative space-y-12">
            {timeline.map((entry, index) => {
              const title = entry[lang]?.title || entry.en.title;
              const description = entry[lang]?.description || entry.en.description;
              const isLast = index === timeline.length - 1;

              return (
                <div key={`mobile-${entry.id}`} className="relative w-full">
                  {/* Center aligned content */}
                  <div className="flex flex-col items-center relative">
                    {/* Year */}
                    <span className="font-bold text-xl text-[var(--color-primary)] mb-2">{entry.year}</span>
                    
                    {/* Title */}
                    <h3 className="text-lg font-bold mb-4 text-center">{title}</h3>
                    
                    {/* Description */}
                    <p className="text-sm text-[var(--color-text)] leading-relaxed text-center px-4 mb-6">{description}</p>
                    
                    {/* Horizontal line - full width */}
                    <div className="w-full h-0.5 bg-[var(--color-primary)] mb-6"></div>
                    
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}