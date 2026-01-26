import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Landmark, CheckCircle2 } from 'lucide-react';

const GovernmentSchemes = () => {
    return (
        <div className="min-h-screen relative isolate">
            <Navbar />
            <main className="pt-32 pb-16 container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <Landmark className="w-16 h-16 text-primary mx-auto mb-6" />
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Government Schemes</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Explore the latest initiatives and subsidies provided by the government to support sustainable farming.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className="glass-card p-6 rounded-2xl"
                        >
                            <div className="flex items-start gap-4 mb-4">
                                <div className="p-3 bg-primary/10 rounded-xl">
                                    <CheckCircle2 className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold">Scheme Name Placeholder {i}</h3>
                            </div>
                            <p className="text-muted-foreground mb-6">
                                Detailed description about the benefits and eligibility criteria for this specific agricultural scheme.
                            </p>
                            <button className="text-primary font-semibold hover:underline">Learn More →</button>
                        </motion.div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default GovernmentSchemes;
