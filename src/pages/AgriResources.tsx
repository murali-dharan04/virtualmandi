import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { BookOpen, FileText, Video, Download } from 'lucide-react';

const AgriResources = () => {
    return (
        <div className="min-h-screen relative isolate">
            <Navbar />
            <main className="pt-32 pb-16 container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <BookOpen className="w-16 h-16 text-primary mx-auto mb-6" />
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Agri-Resources</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Access a library of guides, research papers, and video tutorials on modern agricultural practices.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="glass-card p-8 rounded-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <FileText className="w-6 h-6 text-primary" />
                            <h2 className="text-2xl font-bold">PDF Guides & Reports</h2>
                        </div>
                        <ul className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <li key={i} className="flex items-center justify-between p-4 bg-muted/40 rounded-xl hover:bg-muted/60 transition-colors">
                                    <span className="font-medium">Modern Crop Management Guide 2026.pdf</span>
                                    <Download className="w-5 h-5 cursor-pointer text-primary" />
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="glass-card p-8 rounded-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <Video className="w-6 h-6 text-primary" />
                            <h2 className="text-2xl font-bold">Video Tutorials</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="aspect-video bg-muted/60 rounded-xl flex items-center justify-center">
                                    <Video className="w-8 h-8 opacity-20" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AgriResources;
