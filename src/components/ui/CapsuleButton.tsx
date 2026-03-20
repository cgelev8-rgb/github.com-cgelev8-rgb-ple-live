"use client";

import React from 'react';
import Link from 'next/link';

interface CapsuleButtonProps {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
}

export const CapsuleButton: React.FC<CapsuleButtonProps> = ({
    children,
    href,
    onClick,
    className = '',
    size = 'md',
    disabled = false
}) => {
    // Size variants
    const sizeClasses = {
        sm: 'px-5 py-3 text-xs',
        md: 'px-6 py-[18px] text-xs',
        lg: 'px-8 py-5 text-sm'
    };

    // Inner button core (orange pill)
    const innerButton = (
        <span className={`
            block
            bg-[#fbae17]
            rounded-[25px]
            ${sizeClasses[size]}
            font-bold
            uppercase
            text-white
            text-center
            transition-all
            duration-300
        `}>
            {children}
        </span>
    );

    // Outer metallic rim container
    const outerContainer = (
        <div className={`
            inline-block
            p-[5px]
            rounded-full
            bg-gradient-to-br
            from-[#eeeeee] from-49%
            to-[#9b9b9b] to-50%
            hover:-translate-y-[10px]
            transition-all
            duration-300
            ease-in-out
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            ${className}
        `}
            style={{
                backgroundImage: 'linear-gradient(170deg, #eeeeee 49%, #9b9b9b 50%)'
            }}>
            {innerButton}
        </div>
    );

    // Render as link or button
    if (href && !disabled) {
        return (
            <Link href={href} className="inline-block">
                {outerContainer}
            </Link>
        );
    }

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="inline-block border-0 bg-transparent p-0"
        >
            {outerContainer}
        </button>
    );
};
