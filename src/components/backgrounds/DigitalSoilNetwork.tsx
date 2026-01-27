import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/components/theme-provider';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';

interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
}

/**
 * Digital Soil Network™ - Market Connectivity Layer
 * Animated nodes and links representing farmers, buyers, and market connections
 * Optimized for dark mode with soft glowing particles
 */
export const DigitalSoilNetwork: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();
    const prefersReducedMotion = useReducedMotion();
    const { tier, isMobile } = useDeviceCapability();
    const [nodes, setNodes] = useState<Node[]>([]);

    const isDark = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    // Adjust particle count based on device capability
    const nodeCount = prefersReducedMotion ? 0 : (
        tier === 'high' ? 50 : tier === 'mid' ? 30 : 20
    );
    const connectionDistance = isMobile ? 120 : 150;

    // Initialize nodes
    useEffect(() => {
        if (prefersReducedMotion || nodeCount === 0) return;

        const newNodes: Node[] = [];
        for (let i = 0; i < nodeCount; i++) {
            newNodes.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                radius: 2 + Math.random() * 2,
            });
        }
        setNodes(newNodes);
    }, [nodeCount, prefersReducedMotion]);

    // Animation loop
    useEffect(() => {
        if (prefersReducedMotion || nodes.length === 0) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        let animationFrameId: number;

        const animate = () => {
            if (!ctx || !canvas) return;

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw nodes
            nodes.forEach((node, i) => {
                // Update position
                node.x += node.vx;
                node.y += node.vy;

                // Bounce off edges
                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

                // Keep within bounds
                node.x = Math.max(0, Math.min(canvas.width, node.x));
                node.y = Math.max(0, Math.min(canvas.height, node.y));

                // Draw connections to nearby nodes
                nodes.forEach((otherNode, j) => {
                    if (i >= j) return;

                    const dx = node.x - otherNode.x;
                    const dy = node.y - otherNode.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        const opacity = (1 - distance / connectionDistance) * 0.3;
                        ctx.strokeStyle = isDark
                            ? `rgba(34, 197, 94, ${opacity})`
                            : `rgba(34, 197, 94, ${opacity * 0.6})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(otherNode.x, otherNode.y);
                        ctx.stroke();
                    }
                });

                // Draw node with glow effect
                const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 3);
                gradient.addColorStop(0, isDark ? 'rgba(34, 197, 94, 0.8)' : 'rgba(34, 197, 94, 0.6)');
                gradient.addColorStop(0.5, isDark ? 'rgba(34, 197, 94, 0.3)' : 'rgba(34, 197, 94, 0.2)');
                gradient.addColorStop(1, 'rgba(34, 197, 94, 0)');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
                ctx.fill();

                // Draw core node
                ctx.fillStyle = isDark ? 'rgba(34, 197, 94, 1)' : 'rgba(34, 197, 94, 0.9)';
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [nodes, isDark, connectionDistance, prefersReducedMotion]);

    if (prefersReducedMotion) {
        // Static fallback for reduced motion
        return (
            <div className="fixed inset-0 -z-40 pointer-events-none">
                <div
                    className="absolute inset-0 transition-all duration-1000"
                    style={{
                        background: isDark
                            ? 'radial-gradient(ellipse at center, rgba(34, 197, 94, 0.05) 0%, rgba(15, 23, 42, 0.95) 100%)'
                            : 'radial-gradient(ellipse at center, rgba(34, 197, 94, 0.03) 0%, rgba(255, 255, 255, 0.5) 100%)',
                    }}
                />
            </div>
        );
    }

    return (
        <div className="fixed inset-0 -z-40 pointer-events-none">
            {/* Background layer */}
            <div
                className="absolute inset-0 transition-all duration-1000"
                style={{
                    background: isDark
                        ? 'linear-gradient(to bottom, rgba(15, 23, 42, 0.98), rgba(30, 41, 59, 0.95))'
                        : 'linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(224, 242, 254, 0.5))',
                }}
            />

            {/* Canvas for network visualization */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ opacity: isDark ? 0.9 : 0.7 }}
            />
        </div>
    );
};
