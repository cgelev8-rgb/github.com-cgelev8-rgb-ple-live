import React from "react";
import HomepageQuestionnaireForm from "@/components/features/HomepageQuestionnaireForm";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export const metadata: Metadata = {
    title: "Book a Discovery Call | Private Label Express",
    description: "Schedule your free 15-minute discovery call with our supplement manufacturing and fulfillment experts.",
};

export default function BookACallPage() {
    return (
        <main className="min-h-screen bg-gray-50 pt-12 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-ple-navy mb-4">Book Your Discovery Call</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Tell us a bit about your project so we can prepare the right experts for your 15-minute call.
                    </p>
                </div>
                <HomepageQuestionnaireForm />
            </div>
        </main>
    );
}
