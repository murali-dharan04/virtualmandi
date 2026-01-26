import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, Thermometer } from 'lucide-react';
import { motion } from 'framer-motion';

const WeatherWidget = () => {
    const [weather, setWeather] = useState({
        temp: 28,
        condition: 'Sunny',
        humidity: 65,
        wind: 12,
        location: 'New Delhi'
    });

    // Mock weather cycle
    useEffect(() => {
        const interval = setInterval(() => {
            setWeather(prev => ({
                ...prev,
                temp: 25 + Math.floor(Math.random() * 10)
            }));
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    const getIcon = (condition: string) => {
        switch (condition) {
            case 'Sunny': return <Sun className="w-10 h-10 text-agri-gold animate-pulse" />;
            case 'Rainy': return <CloudRain className="w-10 h-10 text-accent animate-bounce" />;
            default: return <Cloud className="w-10 h-10 text-muted-foreground" />;
        }
    };

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="glass-card p-6 rounded-3xl"
        >
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-1">Local Weather</h3>
                    <p className="text-2xl font-bold flex items-center gap-2">
                        {weather.location}
                    </p>
                </div>
                {getIcon(weather.condition)}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                    <Thermometer className="w-5 h-5 text-primary" />
                    <div>
                        <p className="text-xs text-muted-foreground">Temp</p>
                        <p className="font-bold">{weather.temp}°C</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Wind className="w-5 h-5 text-primary" />
                    <div>
                        <p className="text-xs text-muted-foreground">Wind</p>
                        <p className="font-bold">{weather.wind} km/h</p>
                    </div>
                </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border/50">
                <p className="text-xs text-primary font-bold">Recommended: Optimal for Wheat Irrigation</p>
            </div>
        </motion.div>
    );
};

export default WeatherWidget;
