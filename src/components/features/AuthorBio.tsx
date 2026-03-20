import React from 'react';
import Image from 'next/image';
import { BadgeCheck, Linkedin } from 'lucide-react';

interface AuthorBioProps {
    name: string;
    title: string;
    expertise: string[];
    bio: string;
    imageUrl?: string;
    linkedinUrl?: string;
    reviewBoard?: string;
    hideFooter?: boolean;
}

export const AuthorBio = ({
    name,
    title,
    expertise,
    bio,
    imageUrl,
    linkedinUrl,
    reviewBoard,
    hideFooter = false,
}: AuthorBioProps) => {
    return (
        <div className="bg-white border text-left border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row gap-6 items-start mt-12 mb-12">
            <div className="shrink-0 relative">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border-4 border-white shadow-md relative">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={name}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <span className="text-3xl font-bold text-gray-300">{name.charAt(0)}</span>
                    )}
                </div>
                {linkedinUrl && (
                    <a
                        href={linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-0 right-0 bg-[#0A66C2] text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                    >
                        <Linkedin className="w-4 h-4" fill="currentColor" />
                    </a>
                )}
            </div>

            <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                    <h3 className="text-xl font-bold text-ple-navy m-0 leading-none flex items-center gap-2">
                        {name} <BadgeCheck className="w-5 h-5 text-blue-500" />
                    </h3>
                    <span className="hidden sm:inline text-gray-300">|</span>
                    <span className="text-ple-orange font-semibold tracking-wide text-sm uppercase">
                        {title}
                    </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {expertise.map((skill) => (
                        <span key={skill} className="px-2.5 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-md border border-gray-100">
                            {skill}
                        </span>
                    ))}
                </div>

                <div className="text-gray-600 text-sm leading-relaxed mb-0 whitespace-pre-line">
                    {bio}
                </div>
                {!hideFooter && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-xs text-gray-400 font-medium">
                            Fact-checked by {reviewBoard || "Private Label Express Medical & Operations Review Board"} • <span className="text-gray-500">Updated March 2026</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
