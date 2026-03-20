import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick, onMouseEnter, onMouseLeave }) => {
    return (
        <div
            className={`bg-white rounded-xl shadow-sm border border-gray-100 ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''} ${className}`}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {children}
        </div>
    );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <div className={`px-6 py-4 border-b border-gray-100 ${className}`}>
        {children}
    </div>
);

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <div className={`p-6 ${className}`}>
        {children}
    </div>
);

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <div className={`px-6 py-4 bg-gray-50 border-t border-gray-100 ${className}`}>
        {children}
    </div>
);

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <h3 className={`font-semibold leading-none tracking-tight ${className}`}>
        {children}
    </h3>
);
