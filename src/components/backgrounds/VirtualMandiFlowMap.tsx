import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/theme-provider';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';

/**
 * Virtual Mandi Flow Map™ - Impact Visualization
 * Abstract directional paths showing crop and price movement across markets
 * Features glowing routes with animated particles
 */
export const VirtualMandiFlowMap: React.FC = () => {
    const { theme } = useTheme();
    const prefersReducedMotion = useReducedMotion();
    const { tier } = useDeviceCapability();

    const isDark = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    // Flow paths representing market connections across India
    const flowPaths = [
        // North to South routes
        'M300,100 Q400,300 350,500 T400,700',
        'M800,120 Q900,350 850,550 T900,750',
        // East to West routes
        'M100,300 Q500,280 900,300 T1400,320',
        'M150,450 Q600,430 1050,450 T1500,470',
        // Diagonal connections
        'M200,150 Q600,400 1000,650',
        'M1200,200 Q800,450 400,700',
    ];

    // Particle count based on device tier
    const particlesPerPath = tier === 'high' ? 3 : tier === 'mid' ? 2 : 1;

    return (
        <div className="fixed inset-0 -z-40 overflow-hidden pointer-events-none">
            {/* Background gradient */}
            <div
                className="absolute inset-0 transition-all duration-1000"
                style={{
                    background: isDark
                        ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.95) 50%, rgba(15, 23, 42, 0.98) 100%)'
                        : 'linear-gradient(135deg, rgba(240, 249, 255, 0.5) 0%, rgba(254, 252, 232, 0.5) 50%, rgba(240, 249, 255, 0.5) 100%)',
                }}
            />

            {/* Abstract India map outline (simplified) */}
            <svg
                className="absolute inset-0 w-full h-full opacity-10"
                viewBox="0 0 1600 900"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M700,100 L750,120 L800,180 L850,250 L900,350 L920,450 L900,550 L850,650 L800,720 L750,780 L700,800 L650,780 L600,720 L550,650 L500,550 L480,450 L500,350 L550,250 L600,180 L650,120 Z"
                    fill="none"
                    stroke={isDark ? 'rgba(34, 197, 94, 0.15)' : 'rgba(34, 197, 94, 0.1)'}
                    strokeWidth="2"
                    strokeDasharray="10,5"
                />
            </svg>

            {/* Flow paths and particles */}
            <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 1600 900"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    {/* Glow filter for routes */}
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    {/* Gradient for flow paths */}
                    <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={isDark ? 'rgba(34, 197, 94, 0.3)' : 'rgba(34, 197, 94, 0.2)'} />
                        <stop offset="50%" stopColor={isDark ? 'rgba(251, 191, 36, 0.3)' : 'rgba(251, 191, 36, 0.2)'} />
                        <stop offset="100%" stopColor={isDark ? 'rgba(34, 197, 94, 0.3)' : 'rgba(34, 197, 94, 0.2)'} />
                    </linearGradient>
                </defs>

                {/* Static flow paths */}
                {flowPaths.map((path, index) => (
                    <motion.path
                        key={`path-${index}`}
                        d={path}
                        fill="none"
                        stroke="url(#flowGradient)"
                        strokeWidth={2}
                        strokeLinecap="round"
                        opacity={0.4}
                        filter="url(#glow)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={prefersReducedMotion ? { opacity: 0.4 } : {
                            pathLength: 1,
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                            pathLength: { duration: 3, delay: index * 0.3 },
                            opacity: {
                                duration: 4,
                                repeat: Infinity,
                                delay: index * 0.5,
                            },
                        }}
                    />
                ))}

                {/* Animated particles flowing along paths */}
                {!prefersReducedMotion && flowPaths.map((path, pathIndex) => (
                    [...Array(particlesPerPath)].map((_, particleIndex) => (
                        <motion.circle
                            key={`particle-${pathIndex}-${particleIndex}`}
                            r={3}
                            fill={isDark ? 'rgba(251, 191, 36, 0.9)' : 'rgba(251, 191, 36, 0.8)'}
                            filter="url(#glow)"
                        >
                            <animateMotion
                                dur={`${15 + pathIndex * 2}s`}
                                repeatCount="indefinite"
                                begin={`${particleIndex * 5}s`}
                            >
                                <mpath href={`#animPath${pathIndex}`} />
                            </animateMotion>
                        </motion.circle>
                    ))
                ))}

                {/* Hidden paths for particle animation */}
                {flowPaths.map((path, index) => (
                    <path
                        key={`animPath-${index}`}
                        id={`animPath${index}`}
                        d={path}
                        fill="none"
                        stroke="none"
                    />
                ))}
            </svg>

            {/* Subtle overlay for depth */}
            <div
                className="absolute inset-0 transition-opacity duration-1000"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 0, 0.2) 100%)',
                    opacity: isDark ? 0.4 : 0.2,
                }}
            />
        </div>
    );
};
