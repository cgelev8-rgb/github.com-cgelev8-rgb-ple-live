import React from "react";
import HomepageQuestionnaireForm from "@/components/features/HomepageQuestionnaireForm";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export const metadata: Metadata = {
    title: "Custom Manufacturing Application | Private Label Express",
    description: "Start your custom supplement manufacturing project by filling out our brief pre-qualification questionnaire.",
};

export default function CustomApplicationPage() {
    return (
        <main className="min-h-screen bg-gray-50 pt-12 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-ple-navy mb-4">Custom Formula Application</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Provide your formula and volume details to help us review your custom manufacturing project.
                    </p>
                </div>
                <HomepageQuestionnaireForm />
            </div>
        </main>
    );
}
