import React from "react";
import Image from "next/image";
import leadershipContents from "../../../../data/leadership/content.json";

interface LocalizedText {
    en: string;
    zh?: string;
    si?: string;
}

interface LeadershipMember {
    name: LocalizedText;
    title: LocalizedText;
    imagePath: string;
    blogs?: { heading: LocalizedText; description: LocalizedText }[];
}

interface Headings {
    heading: string;
    subheadingDestination2: string;
    exploreBlogBtn: string;
}

interface LeadershipContent {
    headings: Record<"en" | "zh" | "si", Headings>;
    destination2: LeadershipMember;
}

export async function generateStaticParams() {
    return [
        { lang: "en" },
        { lang: "zh" },
        { lang: "si" },
    ];
}

// Make the component async to await params
export default async function FounderPage({ params }: { params: { lang: "en" | "zh" | "si" } }) {
    const awaitedParams = await params;
    const lang = awaitedParams.lang;

    const content = leadershipContents as LeadershipContent;
    const headings = content.headings[lang] || content.headings["en"];
    const destination2 = content.destination2;

    const getText = (obj: LocalizedText) => obj[lang] || obj.en;

    return (
        <main className="p-8">
            {/* Main Heading */}
            <h1 className="text-3xl md:text-4xl font-extrabold mb-24 text-center text-primary">
                {headings.heading}
            </h1>

            <section className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-24">
                {/* Image Card */}
                <div className="flex-[0_0_auto]">
                    <div className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group">
                        <Image
                            src={destination2.imagePath}
                            alt={getText(destination2.name)}
                            width={350} // Adjust width as needed
                            height={450} // Adjust height as needed
                            className="w-[350px] h-[450px] object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[rgba(3,18,47,0.4)] via-transparent to-transparent">
                            <h3 className="text-lg font-semibold mb-1 text-white drop-shadow-md">
                                {getText(destination2.name)}
                            </h3>
                            <p className="text-sm text-gray-200 drop-shadow-md">
                                {getText(destination2.title)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Blog Section (Scrollable) */}
                <div className="flex-1 max-h-[450px] overflow-y-auto pr-4 scrollbar-hide">
                    {destination2.blogs?.map((blog, index) => (
                        <div key={index} className="mb-6">
                            <h3 className="text-xl font-bold text-primary mb-2">
                                {getText(blog.heading)}
                            </h3>
                            <p className="text-[var(--color-text)] leading-relaxed">
                                {getText(blog.description)}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
