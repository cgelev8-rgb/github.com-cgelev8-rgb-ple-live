"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import Link from 'next/link';

type Step = 'intent' | 'experience' | 'preference' | 'timeline' | 'budget' | 'result';

interface QuizAnswers {
    intent: 'exploring' | 'buy_now';
    experience: 'new' | 'experienced';
    preference: 'custom' | 'stock' | 'unsure';
    timeline: '8-12_weeks' | '3-5_weeks' | 'asap';
    budget: 'under_2500' | '2500_10000' | '10000_25000' | 'over_25000';
}

export const SolutionFinder = () => {
    const [step, setStep] = useState<Step>('intent');
    const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});

    const handleAnswer = (key: keyof QuizAnswers, value: string) => {
        const newAnswers = { ...answers, [key]: value };
        setAnswers(newAnswers);

        // Logic to move to next step
        if (key === 'intent') setStep('experience');
        else if (key === 'experience') setStep('preference');
        else if (key === 'preference') setStep('timeline');
        else if (key === 'timeline') setStep('budget');
        else if (key === 'budget') setStep('result');
    };

    const getRecommendation = () => {
        const { experience, preference, timeline, budget } = answers;

        // 1. Custom Formula Route (The "Anchor")
        // Must explicitly want custom, have time, and have budget
        if (preference === 'custom' && timeline === '8-12_weeks' && (budget === '10000_25000' || budget === 'over_25000')) {
            return {
                title: "Custom Manufacturing",
                description: "You're ready for a bespoke solution. Let's build your unique formula.",
                action: "Request Custom Quote",
                href: "/comparison", // Ideally a custom quote form
                tier: "Custom"
            };
        }

        // 2. Drop Ship / Starter Route (The "Launchpad")
        // New sellers with low budget or need ASAP
        if (experience === 'new' && (budget === 'under_2500' || timeline === 'asap')) {
            return {
                title: "Drop Shipping / Starter Program",
                description: "Low risk, low startup cost. Test the market before you scale.",
                action: "Start for $300",
                href: "/products", // Filtered view ideally
                tier: "Starter"
            };
        }

        // 3. White Label Route (The "Sweet Spot")
        // Default for most others
        return {
            title: "White Label (200 Bottles)",
            description: "The sweet spot. Free label design, better margins, fast turnaround.",
            action: "View Catalog",
            href: "/products",
            tier: "White Label"
        };
    };

    const recommendation = step === 'result' ? getRecommendation() : null;

    return (
        <div className="max-w-2xl mx-auto p-4">
            {/* Progress Bar */}
            <div className="flex items-center justify-between mb-8 gap-2">
                {['intent', 'experience', 'preference', 'timeline', 'budget', 'result'].map((s, i) => {
                    const steps = ['intent', 'experience', 'preference', 'timeline', 'budget', 'result'];
                    const currentIndex = steps.indexOf(step);
                    const stepIndex = steps.indexOf(s);
                    return (
                        <div
                            key={s}
                            className={`h-2 flex-1 rounded-full transition-colors duration-300 ${stepIndex <= currentIndex ? 'bg-ple-orange' : 'bg-gray-200'}`}
                        />
                    );
                })}
            </div>

            <Card className="min-h-[400px] flex flex-col justify-center shadow-xl border-gray-100">

                {/* STEP 1: INTENT */}
                {step === 'intent' && (
                    <>
                        <CardHeader className="text-center border-none pb-0">
                            <h2 className="text-3xl font-bold text-ple-navy mb-2">What brings you here today?</h2>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8">
                            <button onClick={() => handleAnswer('intent', 'exploring')} className="p-6 border-2 border-gray-100 rounded-xl hover:border-ple-orange hover:bg-orange-50 transition-all text-center group">
                                <div className="text-4xl mb-4">🔍</div>
                                <h3 className="font-bold text-ple-navy">Just Exploring</h3>
                            </button>
                            <button onClick={() => handleAnswer('intent', 'buy_now')} className="p-6 border-2 border-gray-100 rounded-xl hover:border-ple-navy hover:bg-blue-50 transition-all text-center group">
                                <div className="text-4xl mb-4">🚀</div>
                                <h3 className="font-bold text-ple-navy">Ready to Launch</h3>
                            </button>
                        </CardContent>
                    </>
                )}

                {/* STEP 2: EXPERIENCE */}
                {step === 'experience' && (
                    <>
                        <CardHeader className="text-center border-none pb-0">
                            <h2 className="text-3xl font-bold text-ple-navy mb-2">Have you sold products online before?</h2>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8">
                            <button onClick={() => handleAnswer('experience', 'new')} className="p-6 border-2 border-gray-100 rounded-xl hover:border-ple-orange hover:bg-orange-50 transition-all text-center group">
                                <div className="text-4xl mb-4">🌱</div>
                                <h3 className="font-bold text-ple-navy">I'm New to This</h3>
                            </button>
                            <button onClick={() => handleAnswer('experience', 'experienced')} className="p-6 border-2 border-gray-100 rounded-xl hover:border-ple-navy hover:bg-blue-50 transition-all text-center group">
                                <div className="text-4xl mb-4">📈</div>
                                <h3 className="font-bold text-ple-navy">I'm an Experienced Seller</h3>
                            </button>
                        </CardContent>
                    </>
                )}

                {/* STEP 3: PREFERENCE */}
                {step === 'preference' && (
                    <>
                        <CardHeader className="text-center border-none pb-0">
                            <h2 className="text-3xl font-bold text-ple-navy mb-2">Do you have a product in mind?</h2>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
                            <button onClick={() => handleAnswer('preference', 'custom')} className="p-4 border-2 border-gray-100 rounded-xl hover:border-ple-navy hover:bg-blue-50 transition-all text-center">
                                <div className="text-3xl mb-2">🧪</div>
                                <h3 className="font-bold text-ple-navy">Custom Formula</h3>
                            </button>
                            <button onClick={() => handleAnswer('preference', 'stock')} className="p-4 border-2 border-gray-100 rounded-xl hover:border-ple-orange hover:bg-orange-50 transition-all text-center">
                                <div className="text-3xl mb-2">📦</div>
                                <h3 className="font-bold text-ple-navy">In-Stock Product</h3>
                            </button>
                            <button onClick={() => handleAnswer('preference', 'unsure')} className="p-4 border-2 border-gray-100 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all text-center">
                                <div className="text-3xl mb-2">🤔</div>
                                <h3 className="font-bold text-ple-navy">Not Sure</h3>
                            </button>
                        </CardContent>
                    </>
                )}

                {/* STEP 4: TIMELINE */}
                {step === 'timeline' && (
                    <>
                        <CardHeader className="text-center border-none pb-0">
                            <h2 className="text-3xl font-bold text-ple-navy mb-2">When do you need the product?</h2>
                        </CardHeader>
                        <CardContent className="space-y-3 pt-4">
                            <button onClick={() => handleAnswer('timeline', '8-12_weeks')} className="w-full p-4 border-2 border-gray-100 rounded-xl hover:border-ple-navy hover:bg-blue-50 text-left flex justify-between items-center group">
                                <span className="font-bold text-ple-navy">8-12 Weeks</span>
                                <span className="text-sm text-gray-500 group-hover:text-ple-navy">Standard for Custom</span>
                            </button>
                            <button onClick={() => handleAnswer('timeline', '3-5_weeks')} className="w-full p-4 border-2 border-gray-100 rounded-xl hover:border-ple-orange hover:bg-orange-50 text-left flex justify-between items-center group">
                                <span className="font-bold text-ple-navy">3-5 Weeks</span>
                                <span className="text-sm text-gray-500 group-hover:text-ple-orange">Standard for White Label</span>
                            </button>
                            <button onClick={() => handleAnswer('timeline', 'asap')} className="w-full p-4 border-2 border-gray-100 rounded-xl hover:border-green-500 hover:bg-green-50 text-left flex justify-between items-center group">
                                <span className="font-bold text-ple-navy">ASAP</span>
                                <span className="text-sm text-gray-500 group-hover:text-green-600">Unlabeled / Drop Ship</span>
                            </button>
                        </CardContent>
                    </>
                )}

                {/* STEP 5: BUDGET */}
                {step === 'budget' && (
                    <>
                        <CardHeader className="text-center border-none pb-0">
                            <h2 className="text-3xl font-bold text-ple-navy mb-2">What is your estimated budget?</h2>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4 pt-8">
                            <button onClick={() => handleAnswer('budget', 'under_2500')} className="p-4 border-2 border-gray-100 rounded-xl hover:border-ple-orange hover:bg-orange-50 font-bold text-ple-navy">
                                Under $2,500
                            </button>
                            <button onClick={() => handleAnswer('budget', '2500_10000')} className="p-4 border-2 border-gray-100 rounded-xl hover:border-ple-orange hover:bg-orange-50 font-bold text-ple-navy">
                                $2,500 - $10k
                            </button>
                            <button onClick={() => handleAnswer('budget', '10000_25000')} className="p-4 border-2 border-gray-100 rounded-xl hover:border-ple-navy hover:bg-blue-50 font-bold text-ple-navy">
                                $10k - $25k
                            </button>
                            <button onClick={() => handleAnswer('budget', 'over_25000')} className="p-4 border-2 border-gray-100 rounded-xl hover:border-ple-navy hover:bg-blue-50 font-bold text-ple-navy">
                                Over $25k
                            </button>
                        </CardContent>
                    </>
                )}

                {/* RESULT */}
                {step === 'result' && recommendation && (
                    <>
                        <CardHeader className="text-center border-none">
                            <div className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-bold mb-4">
                                YOUR RECOMMENDED PATH
                            </div>
                            <h2 className="text-3xl font-bold text-ple-navy">{recommendation.title}</h2>
                            <p className="text-gray-500 mt-2 text-lg">{recommendation.description}</p>
                        </CardHeader>
                        <CardContent className="flex justify-center pt-4">
                            <Link href={recommendation.href}>
                                <Button size="lg" className="text-lg px-8 py-6 shadow-xl shadow-ple-orange/20">
                                    {recommendation.action}
                                </Button>
                            </Link>
                        </CardContent>
                        <CardFooter className="flex justify-center pb-8">
                            <button onClick={() => setStep('intent')} className="text-sm text-gray-400 hover:text-ple-navy underline">
                                Start Over
                            </button>
                        </CardFooter>
                    </>
                )}
            </Card>
        </div>
    );
};
