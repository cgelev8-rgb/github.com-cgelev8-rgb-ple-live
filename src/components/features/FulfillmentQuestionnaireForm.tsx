"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Check, ChevronRight, ChevronLeft, Send } from "lucide-react";
import Link from 'next/link';

// Form Steps Configuration
const STEPS = [
    { id: 1, title: "Current Status" },
    { id: 2, title: "Timeline" },
    { id: 3, title: "Additional Interests" },
    { id: 4, title: "Contact Info" },
];

export default function FulfillmentQuestionnaireForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        // Step 1
        currentStatus: "",

        // Step 2
        timeline: "",

        // Step 3
        additionalInterests: "",

        // Step 4
        firstName: "",
        lastName: "",
        companyName: "",
        email: "",
        phone: "",
        preferredContact: [] as string[]
    });

    const toggleContactMethod = (method: string) => {
        setFormData((prev) => {
            const current = prev.preferredContact;
            const updated = current.includes(method)
                ? current.filter((m) => m !== method)
                : [...current, method];
            return { ...prev, preferredContact: updated };
        });
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const nextStep = () => {
        if (currentStep < STEPS.length) setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/fulfillment-notification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to send notification');
            }

            setIsSuccess(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error('Submission error:', error);
            alert('There was a problem submitting your application. Please try again or contact support.');
        } finally {
            setIsSubmitting(false);
        }
    };

    React.useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => {
                window.location.href = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1m6jH4IyZOQ33dF_QyFmoO3ua6suIQbiO3VoIFGrYtzK348k6gKQ7S7QByscm6kH2dT5xFNXkN";
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [isSuccess]);

    if (isSuccess) {
        return (
            <div className="max-w-xl mx-auto text-center py-20 px-4">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Check className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-ple-navy mb-4">We look forward to connecting soon!</h2>
                <p className="text-xl text-gray-600 mb-8">
                    We have received your meeting request. Redirecting you to our calendar in 2 seconds...
                </p>

                <div className="flex flex-col gap-4 items-center justify-center max-w-sm mx-auto">
                    <a
                        href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1m6jH4IyZOQ33dF_QyFmoO3ua6suIQbiO3VoIFGrYtzK348k6gKQ7S7QByscm6kH2dT5xFNXkN"
                        className="w-full"
                    >
                        <Button className="w-full text-lg shadow-lg shadow-ple-orange/20 py-6">
                            Redirecting to Calendar...
                        </Button>
                    </a>

                    <Link href="/" className="w-full">
                        <Button variant="outline" className="w-full text-gray-500 hover:text-ple-navy">
                            Return Home
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            {/* Progress Bar */}
            <div className="mb-12">
                <div className="flex justify-between mb-4">
                    <span className="text-sm font-bold text-ple-navy">Step {currentStep} of {STEPS.length}</span>
                    <span className="text-sm font-bold text-ple-orange">{Math.round((currentStep / STEPS.length) * 100)}% Completed</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-ple-orange transition-all duration-500 ease-out"
                        style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
                    />
                </div>
                <div className="flex justify-between mt-4 px-2">
                    {STEPS.map((step) => (
                        <div key={step.id} className={`flex flex-col items-center ${step.id === currentStep ? 'text-ple-navy font-bold' : 'text-gray-400'}`}>
                            <span className="text-xs hidden md:block">{step.title}</span>
                        </div>
                    ))}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                <div className="p-8 md:p-12">

                    {/* STEP 1: Current Status */}
                    {currentStep === 1 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                            <h2 className="text-2xl font-bold text-ple-navy border-b pb-4">Current Status</h2>

                            <div className="space-y-4">
                                <label className="block text-lg font-medium text-ple-navy">Are you currently selling products or is this a brand new business venture? <span className="text-red-500">*</span></label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        "Yes, I am currently selling products",
                                        "This is a brand new business venture"
                                    ].map(opt => (
                                        <button
                                            key={opt}
                                            type="button"
                                            onClick={() => handleInputChange("currentStatus", opt)}
                                            className={`p-4 rounded-xl border-2 text-left transition-all ${formData.currentStatus === opt ? "border-ple-orange bg-orange-50 text-ple-navy" : "border-gray-200 text-ple-navy hover:border-ple-orange/50"
                                                }`}
                                        >
                                            <span className="font-bold">{opt}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: Timeline */}
                    {currentStep === 2 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                            <h2 className="text-2xl font-bold text-ple-navy border-b pb-4">Timeline</h2>

                            <div className="space-y-4">
                                <label className="block text-lg font-medium text-ple-navy">Are you just doing research or are you looking to get started soon? <span className="text-red-500">*</span></label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        "I'm just doing research",
                                        "I need to get started very soon"
                                    ].map(opt => (
                                        <button
                                            key={opt}
                                            type="button"
                                            onClick={() => handleInputChange("timeline", opt)}
                                            className={`p-4 rounded-xl border-2 text-left transition-all ${formData.timeline === opt ? "border-ple-orange bg-orange-50 text-ple-navy" : "border-gray-200 text-ple-navy hover:border-ple-orange/50"
                                                }`}
                                        >
                                            <span className="font-bold">{opt}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: Additional Interests */}
                    {currentStep === 3 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                            <h2 className="text-2xl font-bold text-ple-navy border-b pb-4">Additional Interests</h2>

                            <div className="space-y-4">
                                <label className="block text-lg font-medium text-ple-navy">Are you also interested to explore custom supplement manufacturing as well? <span className="text-red-500">*</span></label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        "Yes, tell me more about custom supplement manufacturing",
                                        "Not at this time"
                                    ].map(opt => (
                                        <button
                                            key={opt}
                                            type="button"
                                            onClick={() => handleInputChange("additionalInterests", opt)}
                                            className={`p-4 rounded-xl border-2 text-left transition-all ${formData.additionalInterests === opt ? "border-ple-orange bg-orange-50 text-ple-navy" : "border-gray-200 text-ple-navy hover:border-ple-orange/50"
                                                }`}
                                        >
                                            <span className="font-bold">{opt}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 4: Contact */}
                    {currentStep === 4 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                            <h2 className="text-2xl font-bold text-ple-navy border-b pb-4">Contact Information</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-500">First Name <span className="text-red-500">*</span></label>
                                    <Input
                                        required
                                        value={formData.firstName}
                                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-500">Last Name <span className="text-red-500">*</span></label>
                                    <Input
                                        required
                                        value={formData.lastName}
                                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-500">Company Name</label>
                                <Input
                                    value={formData.companyName}
                                    onChange={(e) => handleInputChange("companyName", e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-500">Email Address <span className="text-red-500">*</span></label>
                                    <Input
                                        type="email"
                                        required
                                        pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
                                        title="Please enter a valid email address (e.g. name@domain.com)"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange("email", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-500">Phone Number <span className="text-red-500">*</span></label>
                                    <Input
                                        type="tel"
                                        required
                                        pattern="[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}"
                                        title="Please enter a valid phone number (e.g. (555) 123-4567 or +1-555-123-4567)"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange("phone", e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="block text-lg font-medium text-ple-navy">Preferred Contact Method</label>
                                <div className="flex gap-4 flex-wrap">
                                    {["Phone Call", "Email", "Text Message"].map(method => (
                                        <button
                                            key={method}
                                            type="button"
                                            onClick={() => toggleContactMethod(method)}
                                            className={`px-6 py-3 rounded-full border transition-all ${formData.preferredContact.includes(method) ? "bg-ple-navy text-white border-ple-navy" : "bg-white border-gray-200 text-gray-600 hover:border-ple-navy"
                                                }`}
                                        >
                                            <span className="font-bold">{method}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                </div>

                {/* Footer Actions */}
                <div className="bg-gray-50 px-8 py-6 border-t border-gray-100 flex justify-between items-center">
                    {currentStep > 1 ? (
                        <Button type="button" variant="outline" onClick={prevStep} className="flex items-center gap-2">
                            <ChevronLeft size={16} /> Back
                        </Button>
                    ) : (
                        <div></div> // Spacer
                    )}

                    {currentStep < STEPS.length ? (
                        <Button
                            type="button"
                            onClick={nextStep}
                            className="flex items-center gap-2 px-8"
                            disabled={
                                (currentStep === 1 && !formData.currentStatus) ||
                                (currentStep === 2 && !formData.timeline) ||
                                (currentStep === 3 && !formData.additionalInterests)
                            }
                        >
                            Next Step <ChevronRight size={16} />
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            className="flex items-center gap-2 px-10 shadow-lg shadow-ple-orange/20"
                            disabled={isSubmitting || !formData.firstName || !formData.lastName || !formData.email || !formData.phone}
                        >
                            {isSubmitting ? "Submitting..." : (
                                <>Submit Application <Send size={16} /></>
                            )}
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
}
