import React from 'react';
import { useTheme } from '@/components/theme-provider';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Seasonal Gradient Continuum™ - Global Background
 * Smooth animated gradients reflecting agricultural seasons and cycles
 * Minimalist design with zero geometric elements
 */
export const SeasonalGradient: React.FC = () => {
    const { theme } = useTheme();
    const prefersReducedMotion = useReducedMotion();

    const isDark = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    // Seasonal color palettes
    const seasonalPalettes = isDark ? {
        spring: ['#1e3a1a', '#2d5016', '#22543d'],
        summer: ['#78350f', '#92400e', '#b45309'],
        monsoon: ['#0c4a6e', '#075985', '#0369a1'],
        harvest: ['#78350f', '#92400e', '#d97706'],
    } : {
        spring: ['#dcfce7', '#bbf7d0', '#86efac'],
        summer: ['#fef3c7', '#fde68a', '#fcd34d'],
        monsoon: ['#dbeafe', '#bfdbfe', '#93c5fd'],
        harvest: ['#fed7aa', '#fdba74', '#fb923c'],
    };

    // Create gradient stops for smooth transitions
    const createGradient = (colors: string[]) => {
        return `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`;
    };

    return (
        <div className="fixed inset-0 -z-40 overflow-hidden pointer-events-none">
            {/* Base layer */}
            <div
                className="absolute inset-0 transition-all duration-1000"
                style={{
                    background: isDark
                        ? 'linear-gradient(to bottom, #0f172a, #1e293b)'
                        : 'linear-gradient(to bottom, #f0f9ff, #fefce8)',
                }}
            />

            {/* Animated seasonal gradients */}
            <div className="absolute inset-0">
                {/* Spring gradient */}
                <div
                    className="absolute inset-0 transition-opacity duration-1000"
                    style={{
                        background: createGradient(seasonalPalettes.spring),
                        opacity: 0.15,
                        animation: prefersReducedMotion ? 'none' : 'seasonalFade 60s ease-in-out infinite',
                        animationDelay: '0s',
                    }}
                />

                {/* Summer gradient */}
                <div
                    className="absolute inset-0 transition-opacity duration-1000"
                    style={{
                        background: createGradient(seasonalPalettes.summer),
                        opacity: 0.15,
                        animation: prefersReducedMotion ? 'none' : 'seasonalFade 60s ease-in-out infinite',
                        animationDelay: '15s',
                    }}
                />

                {/* Monsoon gradient */}
                <div
                    className="absolute inset-0 transition-opacity duration-1000"
                    style={{
                        background: createGradient(seasonalPalettes.monsoon),
                        opacity: 0.15,
                        animation: prefersReducedMotion ? 'none' : 'seasonalFade 60s ease-in-out infinite',
                        animationDelay: '30s',
                    }}
                />

                {/* Harvest gradient */}
                <div
                    className="absolute inset-0 transition-opacity duration-1000"
                    style={{
                        background: createGradient(seasonalPalettes.harvest),
                        opacity: 0.15,
                        animation: prefersReducedMotion ? 'none' : 'seasonalFade 60s ease-in-out infinite',
                        animationDelay: '45s',
                    }}
                />
            </div>

            {/* Subtle radial overlay for depth */}
            <div
                className="absolute inset-0 transition-opacity duration-1000"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.1) 100%)',
                    opacity: isDark ? 0.3 : 0.15,
                }}
            />

            <style jsx>{`
        @keyframes seasonalFade {
          0%, 100% { opacity: 0; }
          25% { opacity: 0.15; }
          50% { opacity: 0; }
        }
      `}</style>
        </div>
    );
};
