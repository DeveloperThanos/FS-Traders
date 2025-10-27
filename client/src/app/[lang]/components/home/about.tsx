"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import aboutContent from "../../../../data/home/about/contents.json";

export default function AboutSection() {
  const params = useParams();
  const lang = (params.lang as "en" | "zh" | "si") || "en";

  const title = aboutContent.title[lang] || aboutContent.title.en;
  const description = aboutContent.description[lang] || aboutContent.description.en;
  const statuses = aboutContent.status;

  return (
    <section className="max-w-6xl mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
      {/* Left Column: Title and Description */}
      <div className="flex flex-col justify-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-6">
          {title}
        </h2>
        <p className="text-lg text-[var(--color-text)]">
          {description}
        </p>
      </div>

      {/* Right Column: Status Cards */}
      <div className="flex flex-col gap-6 pl-40">
        {statuses.map((status) => (
          <StatusCard key={status.id} count={status.count} label={status[lang] || status.en} />
        ))}
      </div>
    </section>
  );
}

function StatusCard({ count, label }: { count: string; label: string }) {
  const [animatedCount, setAnimatedCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById(label);
      if (element) {
        const rect = element.getBoundingClientRect();
        const isInViewport = rect.top >= 0 && rect.bottom <= window.innerHeight;
        if (isInViewport) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [label]);

  useEffect(() => {
    if (isVisible) {
      const target = parseInt(count.replace(/\D/g, ""), 10);
      const duration = 2000; // Animation duration in ms
      const increment = target / (duration / 50); // Increment per frame

      const interval = setInterval(() => {
        setAnimatedCount((prev) => {
          const nextValue = Math.min(prev + increment, target);
          if (nextValue === target) clearInterval(interval);
          return nextValue;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isVisible, count]);

  return (
    <div
      id={label}
      className="flex items-center justify-between p-6 rounded-lg bg-[var(--color-primary)] text-[var(--color-background)] shadow-md"
    >
      <span className="text-4xl font-extrabold">
        {Math.floor(animatedCount)}+
      </span>
      <p className="text-lg font-medium">{label}</p>
    </div>
  );
}