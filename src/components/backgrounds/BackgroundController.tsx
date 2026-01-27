import React, { lazy, Suspense } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';

// Lazy load background components for better performance
const LivingFields = lazy(() => import('./LivingFields').then(m => ({ default: m.LivingFields })));
const DigitalSoilNetwork = lazy(() => import('./DigitalSoilNetwork').then(m => ({ default: m.DigitalSoilNetwork })));
const SeasonalGradient = lazy(() => import('./SeasonalGradient').then(m => ({ default: m.SeasonalGradient })));
const VirtualMandiFlowMap = lazy(() => import('./VirtualMandiFlowMap').then(m => ({ default: m.VirtualMandiFlowMap })));

export type BackgroundType = 'living-fields' | 'digital-network' | 'seasonal-gradient' | 'flow-map' | 'none';

interface BackgroundControllerProps {
    type?: BackgroundType;
    forceSimple?: boolean;
}

/**
 * Background Controller - Intelligent background selection and rendering
 * Automatically selects appropriate background based on device capabilities and user preferences
 */
export const BackgroundController: React.FC<BackgroundControllerProps> = ({
    type = 'living-fields',
    forceSimple = false,
}) => {
    const prefersReducedMotion = useReducedMotion();
    const { tier, isMobile } = useDeviceCapability();

    // Determine which background to render based on capabilities
    const getBackgroundComponent = (): React.ReactNode => {
        // If user prefers reduced motion or forced simple mode, use seasonal gradient
        if (prefersReducedMotion || forceSimple) {
            return <SeasonalGradient />;
        }

        // For low-end devices, always use seasonal gradient
        if (tier === 'low') {
            return <SeasonalGradient />;
        }

        // For mobile mid-tier, use seasonal gradient for complex backgrounds
        if (isMobile && tier === 'mid' && (type === 'flow-map' || type === 'digital-network')) {
            return <SeasonalGradient />;
        }

        // Render requested background type
        switch (type) {
            case 'living-fields':
                return <LivingFields />;
            case 'digital-network':
                return <DigitalSoilNetwork />;
            case 'seasonal-gradient':
                return <SeasonalGradient />;
            case 'flow-map':
                return <VirtualMandiFlowMap />;
            case 'none':
                return null;
            default:
                return <SeasonalGradient />;
        }
    };

    // Fallback component while lazy loading
    const LoadingFallback = () => (
        <div className="fixed inset-0 -z-40 bg-background transition-colors duration-1000" />
    );

    return (
        <Suspense fallback={<LoadingFallback />}>
            {getBackgroundComponent()}
        </Suspense>
    );
};
