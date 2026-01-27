import { useEffect, useState } from 'react';

export type DeviceTier = 'high' | 'mid' | 'low';

export interface DeviceCapability {
    tier: DeviceTier;
    supportsGPU: boolean;
    isMobile: boolean;
    screenWidth: number;
    reducedParticles: boolean;
}

/**
 * Custom hook to detect device performance capabilities
 * Used to optimize background animations based on device tier
 */
export const useDeviceCapability = (): DeviceCapability => {
    const [capability, setCapability] = useState<DeviceCapability>({
        tier: 'mid',
        supportsGPU: true,
        isMobile: false,
        screenWidth: typeof window !== 'undefined' ? window.innerWidth : 1920,
        reducedParticles: false,
    });

    useEffect(() => {
        const detectCapability = () => {
            const width = window.innerWidth;
            const isMobile = width < 768;
            const isTablet = width >= 768 && width < 1024;

            // Check for GPU support
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            const supportsGPU = !!gl;

            // Detect device tier based on multiple factors
            let tier: DeviceTier = 'mid';

            if (isMobile) {
                // Mobile devices get lower tier by default
                tier = 'low';

                // Check for high-end mobile (based on device pixel ratio and screen size)
                if (window.devicePixelRatio >= 2 && width >= 390) {
                    tier = 'mid';
                }
            } else if (isTablet) {
                tier = 'mid';
            } else {
                // Desktop - assume high tier unless indicators suggest otherwise
                tier = 'high';

                // Check for low-end indicators
                if (!supportsGPU || navigator.hardwareConcurrency <= 2) {
                    tier = 'mid';
                }
            }

            setCapability({
                tier,
                supportsGPU,
                isMobile,
                screenWidth: width,
                reducedParticles: tier === 'low' || isMobile,
            });
        };

        detectCapability();

        const handleResize = () => detectCapability();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return capability;
};
