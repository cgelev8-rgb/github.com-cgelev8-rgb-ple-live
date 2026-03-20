'use client';

import Link from 'next/link';
import { sendGAEvent } from '@next/third-parties/google';
import React from 'react';

interface TrackingLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    eventName: string;
    children: React.ReactNode;
    className?: string;
}

export function TrackingLink({ href, eventName, children, className, ...props }: TrackingLinkProps) {
    const handleClick = () => {
        sendGAEvent('event', 'click', {
            event_category: 'Scheduling',
            event_label: eventName,
        });
    };

    // If it's an external link, default to standard anchor. Otherwise use Next.js Link
    const isExternal = href.startsWith('http');

    if (isExternal) {
        return (
            <a href={href} onClick={handleClick} className={className} {...props}>
                {children}
            </a>
        );
    }

    return (
        <Link href={href} onClick={handleClick} className={className} {...props}>
            {children}
        </Link>
    );
}
