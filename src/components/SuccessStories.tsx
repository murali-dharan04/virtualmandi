import React from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { User, Quote } from 'lucide-react';

const stories = [
    {
        name: 'Rajesh Kumar',
        region: 'Punjab',
        text: 'Virtual Mandi transformed how I sell my wheat. I get 20% more profit now without the middlemen.',
        image: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=200'
    },
    {
        name: 'Lakshmi Devi',
        region: 'Andhra Pradesh',
        text: 'The weather alerts and direct buyer connection saved my tomato crop this season. Truly revolutionary.',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'
    },
    {
        name: 'Arjun Singh',
        region: 'Madhya Pradesh',
        text: 'Easy to use even for someone like me. The Government Schemes section is very helpful.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
    }
];

const SuccessStories = () => {
    const [emblaRef] = useEmblaCarousel({ loop: true });

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black mb-4">Farmer <span className="text-primary text-gradient-primary">Success Stories</span></h2>
                    <p className="text-muted-foreground text-lg">Real impact, real voices from the heart of India.</p>
                </div>

                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex gap-6">
                        {stories.map((story, i) => (
                            <div key={i} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0">
                                <motion.div
                                    whileHover={{ y: -10 }}
                                    className="glass-card p-10 rounded-[2.5rem] h-full flex flex-col justify-between border-primary/5"
                                >
                                    <div>
                                        <Quote className="w-12 h-12 text-primary/20 mb-6" />
                                        <p className="text-xl font-medium leading-relaxed italic mb-8">"{story.text}"</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl overflow-hidden bg-muted">
                                            <img src={story.image} alt={story.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg">{story.name}</h4>
                                            <p className="text-primary text-xs font-black uppercase tracking-widest">{story.region}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SuccessStories;
