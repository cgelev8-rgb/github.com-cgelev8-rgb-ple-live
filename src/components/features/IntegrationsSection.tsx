"use client";

import React from 'react';

const integrations = [
    { name: 'Shopify', url: 'https://cdn.simpleicons.org/shopify' },
    { name: 'WooCommerce', url: 'https://cdn.simpleicons.org/woocommerce' },
    { name: 'Amazon', url: 'https://cdn.simpleicons.org/amazon' },
    { name: 'eBay', url: 'https://cdn.simpleicons.org/ebay' },
    { name: 'Magento', url: 'https://cdn.simpleicons.org/magento' },
    { name: 'BigCommerce', url: 'https://cdn.simpleicons.org/bigcommerce' },
    { name: 'Etsy', url: 'https://cdn.simpleicons.org/etsy' },
    { name: 'Walmart', url: 'https://cdn.simpleicons.org/walmart' },
    { name: 'TikTok', url: 'https://cdn.simpleicons.org/tiktok', comingSoon: true },
    { name: 'TEMU', custom: true, comingSoon: true }
];

export const IntegrationsSection = () => {
    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl font-bold text-ple-navy mb-4">Seamless Platform Integrations</h2>
                <p className="text-xl text-gray-500 max-w-3xl mx-auto mb-16">
                    Get up and running in minutes with easy integrations that we handle for you at no additional cost...
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
                    {integrations.map((platform) => (
                        <div key={platform.name} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center h-40 group hover:border-ple-orange hover:shadow-md transition-all relative">
                            {platform.comingSoon && (
                                <div className="absolute top-2 right-2 bg-ple-orange text-white text-[10px] font-bold px-2 py-0.5 rounded-full">SOON</div>
                            )}

                            <div className="flex-1 flex items-center justify-center w-full">
                                {platform.custom ? (
                                    // Custom TEMU Logo (Text based approximation)
                                    <div className="flex flex-col items-center justify-center">
                                        <span className="font-extrabold text-2xl tracking-tighter" style={{ color: '#FB7701' }}>TEMU</span>
                                        <div className="flex gap-1 mt-1">
                                            <span className="w-1 h-1 bg-[#FB7701] rounded-full"></span>
                                            <span className="w-1 h-1 bg-[#FB7701] rounded-full"></span>
                                            <span className="w-1 h-1 bg-[#FB7701] rounded-full"></span>
                                        </div>
                                    </div>
                                ) : (
                                    <img
                                        src={platform.url}
                                        alt={`${platform.name} logo`}
                                        className="h-12 w-auto max-w-[80%] opacity-80 group-hover:opacity-100 transition-opacity"
                                    />
                                )}
                            </div>

                            <span className="text-sm font-medium text-gray-400 group-hover:text-ple-navy transition-colors mt-4">{platform.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
