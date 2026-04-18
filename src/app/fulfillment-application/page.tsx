import React from "react";
import FulfillmentQuestionnaireForm from "@/components/features/FulfillmentQuestionnaireForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Fulfillment Services Application | Private Label Express",
    description: "Apply for our high-volume supplement fulfillment and shipping services.",
};

export default function FulfillmentApplicationPage() {
    return (
        <main className="min-h-screen bg-gray-50 pt-12 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-ple-navy mb-4">Fulfillment Services Application</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Tell us about your shipping volume and requirements to see if our fulfillment center is the right fit for your brand.
                    </p>
                </div>
                <FulfillmentQuestionnaireForm />
            </div>
        </main>
    );
}
