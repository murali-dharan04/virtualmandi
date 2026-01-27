import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/theme-provider';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Living Fields™ - Primary Hero Background
 * Flowing field contours inspired by cultivated agricultural land
 * Features ultra-slow lateral animation with natural gradients
 */
export const LivingFields: React.FC = () => {
    const { theme } = useTheme();
    const prefersReducedMotion = useReducedMotion();

    const isDark = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    // Field contour paths - representing agricultural terraces
    const fieldPaths = [
        'M0,120 Q200,100 400,120 T800,120 T1200,120 T1600,120 T2000,120',
        'M0,180 Q250,160 500,180 T1000,180 T1500,180 T2000,180',
        'M0,240 Q300,220 600,240 T1200,240 T1800,240 T2400,240',
        'M0,300 Q200,280 400,300 T800,300 T1200,300 T1600,300 T2000,300',
        'M0,360 Q350,340 700,360 T1400,360 T2100,360 T2800,360',
    ];

    // Color schemes for light and dark modes
    const colors = isDark ? {
        green: 'rgba(34, 197, 94, 0.15)',
        soil: 'rgba(120, 53, 15, 0.2)',
        harvest: 'rgba(251, 191, 36, 0.12)',
        background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.9))',
    } : {
        green: 'rgba(34, 197, 94, 0.08)',
        soil: 'rgba(161, 98, 7, 0.1)',
        harvest: 'rgba(251, 191, 36, 0.08)',
        background: 'linear-gradient(to bottom, rgba(224, 242, 254, 0.5), rgba(254, 252, 232, 0.5))',
    };

    const animationDuration = prefersReducedMotion ? 0 : 60;

    return (
        <div className="fixed inset-0 -z-40 overflow-hidden pointer-events-none">
            {/* Background gradient */}
            <div
                className="absolute inset-0 transition-all duration-1000"
                style={{ background: colors.background }}
            />

            {/* SVG Field Contours */}
            <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 1600 800"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    {/* Gradient definitions for field colors */}
                    <linearGradient id="fieldGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={colors.green} />
                        <stop offset="50%" stopColor={colors.soil} />
                        <stop offset="100%" stopColor={colors.harvest} />
                    </linearGradient>
                    <linearGradient id="fieldGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={colors.harvest} />
                        <stop offset="50%" stopColor={colors.green} />
                        <stop offset="100%" stopColor={colors.soil} />
                    </linearGradient>
                    <linearGradient id="fieldGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={colors.soil} />
                        <stop offset="50%" stopColor={colors.harvest} />
                        <stop offset="100%" stopColor={colors.green} />
                    </linearGradient>
                </defs>

                {/* Animated field contour lines */}
                {fieldPaths.map((path, index) => (
                    <motion.path
                        key={`field-${index}`}
                        d={path}
                        fill="none"
                        stroke={`url(#fieldGradient${(index % 3) + 1})`}
                        strokeWidth={index === 0 ? 3 : index === 1 ? 2.5 : 2}
                        strokeLinecap="round"
                        opacity={0.6 - index * 0.08}
                        initial={{ x: 0 }}
                        animate={prefersReducedMotion ? {} : {
                            x: [-100, 100, -100],
                        }}
                        transition={{
                            duration: animationDuration + index * 5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: index * 2,
                        }}
                        style={{
                            filter: `blur(${index * 0.5}px)`,
                        }}
                    />
                ))}

                {/* Subtle flowing particles representing seeds/growth */}
                {!prefersReducedMotion && [...Array(12)].map((_, i) => (
                    <motion.circle
                        key={`particle-${i}`}
                        r={1.5 + Math.random()}
                        fill={isDark ? 'rgba(34, 197, 94, 0.3)' : 'rgba(34, 197, 94, 0.4)'}
                        initial={{
                            cx: Math.random() * 1600,
                            cy: 100 + Math.random() * 400,
                            opacity: 0,
                        }}
                        animate={{
                            cx: [
                                Math.random() * 1600,
                                Math.random() * 1600,
                                Math.random() * 1600,
                            ],
                            cy: [
                                100 + Math.random() * 400,
                                150 + Math.random() * 400,
                                100 + Math.random() * 400,
                            ],
                            opacity: [0, 0.6, 0],
                        }}
                        transition={{
                            duration: 20 + Math.random() * 15,
                            repeat: Infinity,
                            delay: Math.random() * 10,
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </svg>

            {/* Subtle overlay for depth */}
            <div
                className="absolute inset-0 transition-opacity duration-1000"
                style={{
                    background: isDark
                        ? 'radial-gradient(ellipse at center, transparent 0%, rgba(15, 23, 42, 0.3) 100%)'
                        : 'radial-gradient(ellipse at center, transparent 0%, rgba(255, 255, 255, 0.2) 100%)',
                }}
            />
        </div>
    );
};
