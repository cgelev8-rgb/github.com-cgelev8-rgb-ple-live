import React from 'react';
import {
    Award,
    BarChart3,
    TrendingUp,
    Scale,
    FlaskConical,
    Users
} from 'lucide-react';

export const StrategicBenefits = () => {
    return (
        <section className="py-24 bg-ple-navy relative overflow-hidden">
            {/* Background Texture/Glow */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-ple-orange/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -ml-32 -mb-32"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <span className="text-ple-orange font-bold tracking-wider uppercase text-sm mb-3 block">
                        The PLE Standard
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Infrastructure Built for Confidence
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        We provide the operational "Bedrock" that allows modern brands to scale without sleepless nights.
                    </p>
                </div>

                {/* 6-Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Card 1: Authority */}
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors duration-300 group">
                        <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-xl flex items-center justify-center mb-6 border border-green-500/20 group-hover:scale-110 transition-transform">
                            <Award className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Instant Authority</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Bypass retailer scrutiny. Our <strong className="text-white">c-GMP & NSF Certified</strong> facilities provide the immediate "trust signals" major retailers demand.
                        </p>
                    </div>

                    {/* Card 2: Security */}
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors duration-300 group">
                        <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center mb-6 border border-blue-500/20 group-hover:scale-110 transition-transform">
                            <BarChart3 className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Zero-Stockout Security</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Maintain momentum. Our <strong className="text-white">Real-Time Inventory Dashboard</strong> gives you 100% visibility so you never miss a sale.
                        </p>
                    </div>

                    {/* Card 3: Legal */}
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors duration-300 group">
                        <div className="w-12 h-12 bg-red-500/20 text-red-400 rounded-xl flex items-center justify-center mb-6 border border-red-500/20 group-hover:scale-110 transition-transform">
                            <Scale className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Legal Safeguard</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Sleep soundly. Our <strong className="text-white">Regulatory Experts</strong> ensure your labels and claims are FDA/FTC compliant to prevent costly enforcement.
                        </p>
                    </div>

                    {/* Card 4: De-risked Entry */}
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors duration-300 group">
                        <div className="w-12 h-12 bg-ple-orange/20 text-ple-orange rounded-xl flex items-center justify-center mb-6 border border-ple-orange/20 group-hover:scale-110 transition-transform">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">De-risked Entry</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Test new concepts without the burn. <strong className="text-white">Low MOQs</strong> allow needed agility for trends like Longevity or GLP-1 support.
                        </p>
                    </div>

                    {/* Card 5: Differentiation */}
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors duration-300 group">
                        <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center mb-6 border border-purple-500/20 group-hover:scale-110 transition-transform">
                            <FlaskConical className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Differentiation</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Escape the "Sea of Sameness". Our <strong className="text-white">Internal R&D Team</strong> helps you engineer proprietary blends that competitors can't copy.
                        </p>
                    </div>

                    {/* Card 6: Expert Guidance (NEW) */}
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors duration-300 group">
                        <div className="w-12 h-12 bg-teal-500/20 text-teal-400 rounded-xl flex items-center justify-center mb-6 border border-teal-500/20 group-hover:scale-110 transition-transform">
                            <Users className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Expert Guidance</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            We work closely with all of our customers to help guide them in many matters including <strong className="text-white">formulating the perfect supplement</strong> for their brand.
                        </p>
                    </div>

                </div>

            </div>
        </section>
    );
};
