'use client';

import React, { use, useState } from "react";
import supplierContents from "../../../data/suppliers/contents.json";
import supplierReviews from "../../../data/suppliers/reviews.json";
import axios from 'axios'; 

/* =====================
   Type Definitions
===================== */
interface LocalizedText {
    en: string;
    zh?: string;
    si?: string;
}

interface SupplierManager {
    imagePath: string;
    name: LocalizedText;
    role: LocalizedText;
    heading: LocalizedText;
    description: LocalizedText;
}

interface SupplierMap {
    heading: LocalizedText;
    description: LocalizedText;
    imagePath: string;
}

interface SupplierForm {
    heading: LocalizedText;
    description: LocalizedText;
    formFields: Record<string, LocalizedText | { label: LocalizedText; options: Record<string, LocalizedText> }>;
    submitButton: LocalizedText;
}

interface SupplierContent {
    heading: LocalizedText;
    manager: SupplierManager;
    supplierMap: SupplierMap;
    supplierForm: SupplierForm;
}

interface SupplierReview {
    id: string;
    supplierCompanyName: LocalizedText;
    country: LocalizedText;
    supplierLogoPath: string;
    message: LocalizedText;
}

interface SupplierReviewContent {
    supplierReview: {
        heading: LocalizedText;
        description: LocalizedText;
        reviews: SupplierReview[];
    };
}

interface PageProps {
    params: Promise<{
        lang: "en" | "zh" | "si";
    }>;

}

/* =====================
   Component
===================== */
export default function SuppliersPage({ params }: PageProps) {
    const resolvedParams = use(params);
    const { lang } = resolvedParams;
    const content = supplierContents as SupplierContent;
    const reviewsContent = supplierReviews as SupplierReviewContent;

    const [selectedReview, setSelectedReview] = React.useState<SupplierReview | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Ensure consistent text resolution
    const getText = (obj: LocalizedText) => obj[lang as keyof LocalizedText] || obj.en;

    // Updated handleSubmit to send payload to API
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        const payload = {
            lang,
            formFields: Object.entries(content.supplierForm.formFields).map(([key, field]) => {
                if (typeof field === "object" && "label" in field) {
                    return {
                        key,
                        value: (document.querySelector(`[name="${key}"]`) as HTMLSelectElement)?.value || "",
                    };
                }
                return {
                    key,
                    value: (document.querySelector(`[name="${key}"]`) as HTMLInputElement)?.value || "",
                };
            }),
        };

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASEURL}/send-quotations`, payload);
            alert("Form submitted successfully: " + response.data.message);
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Failed to submit form. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="p-8 mt-20">
            {/* Main Heading */}
            <h1 className="text-3xl md:text-4xl font-extrabold mb-12 text-center text-primary">
                {getText(content.heading)}
            </h1>

            {/* Supplier Manager Section */}
            <section className="mb-24">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-24">
                    <div className="flex-[0_0_auto]">
                        <div className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group">
                            <img
                                src={content.manager.imagePath}
                                alt={getText(content.manager.name)}
                                className="w-[300px] h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[rgba(3,18,47,0.4)] via-transparent to-transparent">
                                <h3 className="text-lg font-semibold mb-1 text-[var(--color-text-light)] drop-shadow-md">
                                    {getText(content.manager.name)}
                                </h3>
                                <p className="text-sm text-gray-200 drop-shadow-md">
                                    {getText(content.manager.role)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <h2 className="text-2xl font-semibold mb-4 text-primary">
                            {getText(content.manager.heading)}
                        </h2>
                        <p className="text-[var(--color-text)] leading-relaxed">
                            {getText(content.manager.description)}
                        </p>
                    </div>
                </div>
            </section>

            {/* Supplier Reviews Section */}
            <section className="mb-24 relative">
                <h2 className="text-2xl md:text-3xl font-extrabold mb-4 text-center text-primary">
                    {getText(reviewsContent.supplierReview.heading)}
                </h2>
                <p className="max-w-xl text-gray-700 text-center mx-auto mb-8">
                    {getText(reviewsContent.supplierReview.description)}
                </p>
                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {reviewsContent.supplierReview.reviews.map((review) => (
                        <div
                            key={review.id}
                            className="flex items-center justify-between p-4 bg-[var(--color-primary)] text-[var(--color-text-light)] rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                            onClick={() => setSelectedReview(review)}
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={review.supplierLogoPath}
                                    alt={getText(review.supplierCompanyName)}
                                    className="w-12 h-12 object-contain"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        {getText(review.supplierCompanyName)}
                                    </h3>
                                    <p className="text-sm text-gray-300">
                                        {getText(review.country)}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                    />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal */}
                {selectedReview && (
                    <div className="absolute inset-0 bg-opacity-95 flex items-center justify-center z-50">
                        <div className="mt-25 bg-[var(--color-primary)] text-[var(--color-text-light)] rounded-lg p-6 max-w-5xl w-full max-h-[500px] flex flex-col relative">
                            <button
                                className="absolute top-4 right-4 text-[var(--color-text-light)] hover:text-gray-300 w-6 h-6 flex items-center justify-center"
                                onClick={() => setSelectedReview(null)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                            <div className="flex items-center gap-4 mb-4 flex-shrink-0 pt-4">
                                <img
                                    src={selectedReview.supplierLogoPath}
                                    alt={getText(selectedReview.supplierCompanyName)}
                                    className="w-16 h-16 object-contain"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        {getText(selectedReview.supplierCompanyName)}
                                    </h3>
                                    <p className="text-sm text-[var(--color-text-light)]">
                                        {getText(selectedReview.country)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto">
                                <p className="text-[var(--color-text-light)] leading-relaxed mb-4">
                                    {getText(selectedReview.message)}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            {/* Supplier Map Section */}
            <section className="mb-24">
                <h2 className="text-2xl md:text-3xl font-extrabold mb-4 text-center text-primary">
                    {getText(content.supplierMap.heading)}
                </h2>
                <p className="max-w-xl text-gray-700 text-center mx-auto mb-8">
                    {getText(content.supplierMap.description)}
                </p>
                <div className="max-w-6xl mx-auto">
                    <img
                        src={content.supplierMap.imagePath}
                        alt={getText(content.supplierMap.heading)}
                        className="w-full h-80 rounded-2xl shadow-md"
                    />
                </div>
            </section>

            {/* Supplier Form Section */}
            <section className="mb-24">
                <h2 className="text-3xl font-semibold mb-2 text-center text-primary">
                    {getText(content.supplierForm.heading)}
                </h2>
                <p className="max-w-xl text-gray-700 text-center mx-auto mb-8">
                    {getText(content.supplierForm.description)}
                </p>
                <form className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                    {Object.entries(content.supplierForm.formFields).map(([key, field]) => {
                        if (typeof field === "object" && "label" in field) {
                            return (
                                <div key={key} className="flex flex-col">
                                    <label className="text-sm font-semibold mb-2">
                                        {getText(field.label)}
                                    </label>
                                    <select
                                        name={key} // Added name attribute
                                        className="border border-gray-300 rounded-lg p-2 max-h-20 overflow-y-auto"
                                        suppressHydrationWarning={true}
                                    >
                                        {Object.entries(field.options).map(([optionKey, optionValue]) => (
                                            <option key={optionKey} value={optionKey} suppressHydrationWarning={true}>
                                                {getText(optionValue)}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            );
                        }
                        return (
                            <div key={key} className="flex flex-col">
                                <label className="text-sm font-semibold mb-2">
                                    {getText(field as LocalizedText)}
                                </label>
                                <input
                                    name={key} // Added name attribute
                                    type="text"
                                    className="border border-gray-300 rounded-lg p-2"
                                    placeholder={getText(field as LocalizedText)}
                                    suppressHydrationWarning={true}
                                />
                            </div>
                        );
                    })}
                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            className="w-full bg-[var(--color-primary)] text-[var(--color-background)] font-semibold py-3 px-6 rounded-lg shadow hover:bg-[var(--color-primary)] transition-colors"
                            suppressHydrationWarning={true}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <svg
                                        className="animate-spin h-5 w-5 mr-3 text-[var(--color-background)]"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                        ></path>
                                    </svg>
                                    Loading...
                                </div>
                            ) : (
                                getText(content.supplierForm.submitButton)
                            )}
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
}
