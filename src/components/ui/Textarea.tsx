import React from "react";

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                className={`flex min-h-[80px] w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base font-semibold text-ple-navy ring-offset-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ple-orange focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
                ref={ref}
                {...props}
            />
        );
    }
);
Textarea.displayName = "Textarea";

export { Textarea };
