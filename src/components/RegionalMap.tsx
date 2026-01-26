import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Info } from 'lucide-react';

const RegionalMap = () => {
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

    const regions = [
        { id: 'north', name: 'North India', schemes: 12, priceIndex: '+5%' },
        { id: 'south', name: 'South India', schemes: 8, priceIndex: '+2%' },
        { id: 'west', name: 'West India', schemes: 15, priceIndex: '+8%' },
        { id: 'east', name: 'East India', schemes: 6, priceIndex: '-1%' },
    ];

    return (
        <section className="py-24 container mx-auto px-4">
            <div className="glass-card p-4 md:p-12 rounded-[3rem] overflow-hidden relative">
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    <div className="flex-1 w-full relative">
                        <div className="text-left mb-12">
                            <h2 className="text-4xl font-black mb-4 leading-tight">Interactive <br /><span className="text-secondary text-gradient-gold">Regional Hub</span></h2>
                            <p className="text-muted-foreground">Select a region to explore localized government schemes and real-time market price indices.</p>
                        </div>

                        <div className="space-y-4">
                            {regions.map((region) => (
                                <button
                                    key={region.id}
                                    onClick={() => setSelectedRegion(region.id)}
                                    className={`w-full text-left p-6 rounded-2xl border transition-all flex items-center justify-between ${selectedRegion === region.id
                                            ? 'bg-primary text-white border-primary shadow-xl scale-[1.02]'
                                            : 'bg-muted/30 border-transparent hover:border-primary/20'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <MapPin className={`w-6 h-6 ${selectedRegion === region.id ? 'text-white' : 'text-primary'}`} />
                                        <span className="font-bold text-lg">{region.name}</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] uppercase font-black opacity-60">Price Index</p>
                                        <p className="font-black">{region.priceIndex}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 w-full aspect-square bg-muted/20 rounded-[2rem] flex items-center justify-center relative group">
                        <motion.div
                            animate={{ scale: [1, 1.05, 1], rotate: [0, 1, 0] }}
                            transition={{ duration: 10, repeat: Infinity }}
                            className="bg-primary/5 w-4/5 h-4/5 rounded-full blur-[80px] absolute"
                        />
                        <div className="relative text-center p-12">
                            <Info className="w-16 h-16 mx-auto mb-6 text-primary opacity-20" />
                            <p className="text-sm font-medium opacity-60">Map Visualisation Integration <br />(Ready for Google Maps/D3.js)</p>
                            {selectedRegion && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="mt-8 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-2xl border border-primary/10"
                                >
                                    <h4 className="font-black text-primary text-xl mb-2">{regions.find(r => r.id === selectedRegion)?.name}</h4>
                                    <p className="text-sm">Available Schemes: <span className="font-black text-secondary">{regions.find(r => r.id === selectedRegion)?.schemes}</span></p>
                                    <button className="mt-4 text-xs font-black uppercase text-primary tracking-widest hover:underline">View Detailed Report</button>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegionalMap;
