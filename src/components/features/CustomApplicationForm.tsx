"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Check, ChevronRight, ChevronLeft, Send, Plus, Trash2 } from "lucide-react";
import Link from 'next/link';

// Form Steps Configuration
const STEPS = [
    { id: 1, title: "Current Status" },
    { id: 2, title: "Product Specs" },
    { id: 3, title: "Formula Details" },
    { id: 4, title: "Ingredients" },
    { id: 5, title: "Budget & Terms" },
    { id: 6, title: "Contact Info" },
];

export default function CustomApplicationForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        // Step 1
        isSellingNow: "",
        deliveryLocation: "",
        leadTimeAcceptable: "",

        // Step 2
        deliveryForm: "",
        bottleQuantity: "",
        fillQuantity: "",
        packagingType: "",

        // Step 3
        targetPrice: "",
        function: "",
        hasSupplementFacts: "",
        hasLabTest: "",

        // Step 4
        ingredients: [{ name: "", amount: "" }],

        // Step 5
        targetBudget: "",
        paymentTerms: "",

        // Step 6
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

    const handleIngredientChange = (index: number, field: "name" | "amount", value: string) => {
        const newIngredients = [...formData.ingredients];
        newIngredients[index][field] = value;
        setFormData((prev) => ({ ...prev, ingredients: newIngredients }));
    };

    const addIngredient = () => {
        setFormData((prev) => ({
            ...prev,
            ingredients: [...prev.ingredients, { name: "", amount: "" }]
        }));
    };

    const removeIngredient = (index: number) => {
        if (formData.ingredients.length > 1) {
            const newIngredients = formData.ingredients.filter((_, i) => i !== index);
            setFormData((prev) => ({ ...prev, ingredients: newIngredients }));
        }
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
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setIsSuccess(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isSuccess) {
        return (
            <div className="max-w-xl mx-auto text-center py-20 px-4">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Check className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-ple-navy mb-4">Application Received!</h2>
                <p className="text-xl text-gray-600 mb-8">
                    Thank you for submitting your custom formulation request. Our R&D team will review your specs and contact you shortly.
                </p>
                <Link href="/">
                    <Button className="px-8">Return Home</Button>
                </Link>
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
                                <label className="block text-lg font-medium text-ple-navy">Are you currently selling this formula?</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => handleInputChange("isSellingNow", "Yes")}
                                        className={`p-4 rounded-xl border-2 text-left transition-all ${formData.isSellingNow === "Yes" ? "border-ple-orange bg-orange-50 text-ple-navy" : "border-gray-100 hover:border-gray-200"
                                            }`}
                                    >
                                        <span className="font-bold">Yes</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleInputChange("isSellingNow", "No")}
                                        className={`p-4 rounded-xl border-2 text-left transition-all ${formData.isSellingNow === "No" ? "border-ple-orange bg-orange-50 text-ple-navy" : "border-gray-100 hover:border-gray-200"
                                            }`}
                                    >
                                        <span className="font-bold">No</span>
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="block text-lg font-medium text-ple-navy">Will the product be delivered within the US?</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => handleInputChange("deliveryLocation", "US")}
                                        className={`p-4 rounded-xl border-2 text-left transition-all ${formData.deliveryLocation === "US" ? "border-ple-orange bg-orange-50 text-ple-navy" : "border-gray-100 hover:border-gray-200"
                                            }`}
                                    >
                                        <span className="font-bold">Yes, US Delivery</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleInputChange("deliveryLocation", "International")}
                                        className={`p-4 rounded-xl border-2 text-left transition-all ${formData.deliveryLocation === "International" ? "border-ple-orange bg-orange-50 text-ple-navy" : "border-gray-100 hover:border-gray-200"
                                            }`}
                                    >
                                        <span className="font-bold">No, International</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: Product Specs */}
                    {currentStep === 2 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                            <h2 className="text-2xl font-bold text-ple-navy border-b pb-4">Product Specifications</h2>

                            <div className="space-y-4">
                                <label className="block text-lg font-medium text-ple-navy">Delivery Form</label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {["Capsule", "Gummy", "Tablet", "Softgel", "Powder"].map((type) => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => handleInputChange("deliveryForm", type)}
                                            className={`p-4 rounded-xl border-2 text-center transition-all ${formData.deliveryForm === type ? "border-ple-orange bg-orange-50 text-ple-navy" : "border-gray-100 hover:border-gray-200"
                                                }`}
                                        >
                                            <span className="font-bold">{type}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="block text-lg font-medium text-ple-navy">Estimated Bottle Quantity</label>
                                <select
                                    className="w-full h-14 rounded-xl border-2 border-gray-100 bg-white px-4 text-lg outline-none focus:border-ple-orange transition-colors"
                                    value={formData.bottleQuantity}
                                    onChange={(e) => handleInputChange("bottleQuantity", e.target.value)}
                                >
                                    <option value="">Select Quantity...</option>
                                    <option value="2500-5000">2,500 - 5,000</option>
                                    <option value="5000-10000">5,000 - 10,000</option>
                                    <option value="10000-20000">10,000 - 20,000</option>
                                    <option value="20000+">20,000+</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: Details */}
                    {currentStep === 3 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                            <h2 className="text-2xl font-bold text-ple-navy border-b pb-4">Formula Details</h2>

                            <div className="space-y-4">
                                <label className="block text-lg font-medium text-ple-navy">Primary Function</label>
                                <Input
                                    placeholder="e.g. Weight Loss, Nootropic, Joint Support"
                                    value={formData.function}
                                    onChange={(e) => handleInputChange("function", e.target.value)}
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="block text-lg font-medium text-ple-navy">Do you have a completed Supplement Facts panel?</label>
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => handleInputChange("hasSupplementFacts", "Yes")}
                                        className={`flex-1 p-4 rounded-xl border-2 text-center transition-all ${formData.hasSupplementFacts === "Yes" ? "border-ple-orange bg-orange-50 text-ple-navy" : "border-gray-100 hover:border-gray-200"
                                            }`}
                                    >
                                        <span className="font-bold">Yes</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleInputChange("hasSupplementFacts", "No")}
                                        className={`flex-1 p-4 rounded-xl border-2 text-center transition-all ${formData.hasSupplementFacts === "No" ? "border-ple-orange bg-orange-50 text-ple-navy" : "border-gray-100 hover:border-gray-200"
                                            }`}
                                    >
                                        <span className="font-bold">No</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 4: Ingredients */}
                    {currentStep === 4 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                            <h2 className="text-2xl font-bold text-ple-navy border-b pb-4">Active Ingredients</h2>
                            <p className="text-gray-500 text-sm">List the key ingredients you want in your formula.</p>

                            <div className="space-y-4">
                                {formData.ingredients.map((ing, index) => (
                                    <div key={index} className="flex gap-4 items-start animate-in fade-in slide-in-from-bottom-4">
                                        <div className="flex-1">
                                            <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Ingredient Name</label>
                                            <Input
                                                value={ing.name}
                                                onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
                                                placeholder="e.g. Vitamin C"
                                            />
                                        </div>
                                        <div className="w-1/3">
                                            <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Mg / Amount</label>
                                            <Input
                                                value={ing.amount}
                                                onChange={(e) => handleIngredientChange(index, "amount", e.target.value)}
                                                placeholder="500mg"
                                            />
                                        </div>
                                        <div className="pt-7">
                                            <button
                                                type="button"
                                                onClick={() => removeIngredient(index)}
                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Button
                                type="button"
                                variant="outline"
                                onClick={addIngredient}
                                className="w-full border-dashed border-2 py-6 text-gray-500 hover:text-ple-orange hover:border-ple-orange"
                            >
                                <Plus size={20} className="mr-2" /> Add Another Ingredient
                            </Button>
                        </div>
                    )}

                    {/* STEP 5: Budget */}
                    {currentStep === 5 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                            <h2 className="text-2xl font-bold text-ple-navy border-b pb-4">Budget & Financials</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="block text-lg font-medium text-ple-navy">Target Price Per Bottle</label>
                                    <Input
                                        type="text"
                                        placeholder="$"
                                        value={formData.targetPrice}
                                        onChange={(e) => handleInputChange("targetPrice", e.target.value)}
                                        className="text-lg"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="block text-lg font-medium text-ple-navy">Total Project Budget</label>
                                    <Input
                                        type="text"
                                        placeholder="$"
                                        value={formData.targetBudget}
                                        onChange={(e) => handleInputChange("targetBudget", e.target.value)}
                                        className="text-lg"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="block text-lg font-medium text-ple-navy">Are you comfortable with wire transfer payments?</label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {["Yes", "No", "Other Arrangement"].map(opt => (
                                        <button
                                            key={opt}
                                            type="button"
                                            onClick={() => handleInputChange("paymentTerms", opt)}
                                            className={`p-4 rounded-xl border-2 text-center transition-all ${formData.paymentTerms === opt ? "border-ple-orange bg-orange-50 text-ple-navy" : "border-gray-100 hover:border-gray-200"
                                                }`}
                                        >
                                            <span className="font-bold">{opt}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 6: Contact */}
                    {currentStep === 6 && (
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
                        <Button type="button" onClick={nextStep} className="flex items-center gap-2 px-8">
                            Next Step <ChevronRight size={16} />
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            className="flex items-center gap-2 px-10 shadow-lg shadow-ple-orange/20"
                            disabled={isSubmitting}
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
