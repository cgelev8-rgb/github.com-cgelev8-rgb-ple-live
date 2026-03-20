"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}

const AccordionItem = ({ question, answer, isOpen, onClick }: AccordionItemProps) => {
    return (
        <div className="border-b border-gray-100 last:border-0">
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between py-6 text-left group transition-colors hover:text-ple-orange focus:outline-none"
            >
                <span className={`text-lg font-bold transition-colors ${isOpen ? "text-ple-orange" : "text-ple-navy"}`}>
                    {question}
                </span>
                <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-ple-orange" : "group-hover:text-ple-orange"}`}
                />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100 pb-6" : "max-h-0 opacity-0"
                    }`}
            >
                <p className="text-gray-600 leading-relaxed pr-8">{answer}</p>
            </div>
        </div>
    );
};

export interface FAQItem {
    question: string;
    answer: string;
}

interface AccordionProps {
    items: FAQItem[];
}

export default function Accordion({ items }: AccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 px-8">
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    question={item.question}
                    answer={item.answer}
                    isOpen={openIndex === index}
                    onClick={() => handleToggle(index)}
                />
            ))}
        </div>
    );
}
