import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState, memo } from 'react';
import { useTheme } from '@/components/theme-provider';

const AgriculturalBackground = () => {
    const { scrollY } = useScroll();
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    const yParallaxFast = useTransform(scrollY, [0, 1000], [0, 300]);
    const yParallaxSlow = useTransform(scrollY, [0, 1000], [0, 150]);

    // Mouse Parallax
    const xParallax1 = useTransform(smoothMouseX, [0, 1], [-30, 30]);
    const xParallax2 = useTransform(smoothMouseX, [0, 1], [-60, 60]);
    const yParallaxMouse = useTransform(smoothMouseY, [0, 1], [-15, 15]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX / window.innerWidth);
            mouseY.set(e.clientY / window.innerHeight);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    if (!mounted) return null;

    return (
        <div className={`fixed inset-0 -z-50 overflow-hidden transition-colors duration-1000 ${isDark ? 'bg-[#0f172a]' : 'bg-[#e0f2fe]'}`}>
            {/* Sky Atmosphere */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ${isDark ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900" />
                {/* Twinkling Stars */}
                {[...Array(80)].map((_, i) => (
                    <motion.div
                        key={`star-${i}`}
                        className="absolute bg-white rounded-full"
                        style={{
                            width: Math.random() * 2 + 0.5,
                            height: Math.random() * 2 + 0.5,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 70}%`,
                        }}
                        animate={{ opacity: [0.1, 1, 0.1], scale: [1, 1.2, 1] }}
                        transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 5 }}
                    />
                ))}
            </div>

            <div className={`absolute inset-0 transition-opacity duration-1000 ${isDark ? 'opacity-0' : 'opacity-100'}`}>
                <div className="absolute inset-0 bg-gradient-to-b from-[#38bdf8] via-[#bae6fd] to-[#fef3c7]" />
                {/* Dynamic Sun Rays */}
                <motion.div
                    className="absolute top-[-50px] right-[-50px] w-[500px] h-[500px] pointer-events-none opacity-20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full text-yellow-300 fill-current">
                        {[...Array(12)].map((_, i) => (
                            <rect key={i} x="48" y="0" width="4" height="50" transform={`rotate(${i * 30} 50 50)`} rx="2" />
                        ))}
                    </svg>
                </motion.div>
            </div>

            {/* Sun/Moon */}
            <motion.div
                className="absolute top-16 right-16"
                style={{ x: xParallax1, y: yParallaxMouse }}
            >
                {isDark ? (
                    <div className="w-24 h-24 bg-slate-100 rounded-full shadow-[0_0_80px_rgba(255,255,255,0.4)] relative">
                        <div className="absolute top-4 left-6 w-5 h-5 bg-slate-200 rounded-full opacity-60" />
                        <div className="absolute bottom-6 right-10 w-3 h-3 bg-slate-200 rounded-full opacity-60" />
                    </div>
                ) : (
                    <div className="w-28 h-28 bg-yellow-400 rounded-full shadow-[0_0_100px_rgba(250,204,21,0.9)] relative">
                        <motion.div
                            className="absolute inset-[-10px] rounded-full border-2 border-yellow-200/40"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />
                    </div>
                )}
            </motion.div>

            {/* Clouds */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={`cloud-${i}`}
                    className={`absolute rounded-full filter blur-xl ${isDark ? 'bg-indigo-300/10' : 'bg-white/60'}`}
                    style={{
                        width: 200 + i * 100,
                        height: 60 + i * 20,
                        left: `${(i * 30) % 100}%`,
                        top: `${10 + (i * 15) % 40}%`,
                    }}
                    animate={{
                        x: [-100, 100, -100],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 30 + i * 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* Far Mountains */}
            <motion.div
                className={`absolute bottom-0 left-[-10%] w-[120%] h-[60vh] transition-colors duration-1000 ${isDark ? 'text-[#1e293b]' : 'text-[#86efac]/30'}`}
                style={{ y: yParallaxSlow, x: xParallax1 }}
            >
                <svg viewBox="0 0 1440 400" className="w-full h-full" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,320L120,280C240,240,480,160,720,180C960,200,1200,320,1440,280L1440,400L0,400Z" />
                </svg>
            </motion.div>

            {/* Near Hills */}
            <motion.div
                className={`absolute bottom-[-10vh] left-[-10%] w-[120%] h-[50vh] transition-colors duration-1000 ${isDark ? 'text-[#064e3b]' : 'text-[#4ade80]/40'}`}
                style={{ y: yParallaxFast, x: xParallax2 }}
            >
                <svg viewBox="0 0 1440 400" className="w-full h-full" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,280C360,180,720,380,1440,220L1440,400L0,400Z" />
                </svg>
            </motion.div>

            {/* Interactive Crops/Wheat */}
            <div className="absolute bottom-0 w-full h-[35vh] flex items-end justify-center perspective-1000 z-10">
                <div className="relative w-full h-full flex items-end justify-between px-2">
                    {[...Array(window.innerWidth < 768 ? 40 : 80)].map((_, i) => (
                        <WheatStalk key={`wheat-${i}`} isDark={isDark} />
                    ))}
                </div>
            </div>

            {/* Floating Grass/Leaves Particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={`leaf-${i}`}
                        className={`absolute w-3 h-1.5 rounded-full ${isDark ? 'bg-emerald-400/20' : 'bg-emerald-500/20'}`}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            x: [0, 200, 400],
                            y: [0, 50, -50, 100],
                            rotate: [0, 360, 720],
                        }}
                        transition={{
                            duration: 15 + Math.random() * 10,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

const WheatStalk = memo(({ isDark }: { isDark: boolean }) => {
    const height = 40 + Math.random() * 60;
    const swayRange = 3 + Math.random() * 5;
    const duration = 2.5 + Math.random() * 2;
    const delay = Math.random() * -5;

    return (
        <motion.div
            className={`w-[2px] md:w-[3px] rounded-t-full origin-bottom relative transition-colors duration-1000 ${isDark ? 'bg-gradient-to-t from-[#1e3a1a] to-[#2d4d2d]' : 'bg-gradient-to-t from-[#854d0e] via-[#ca8a04] to-[#fde047]'
                }`}
            style={{ height: `${height}%` }}
            animate={{ rotate: [-swayRange, swayRange, -swayRange] }}
            transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
            whileHover={{ scale: 1.1, rotate: 20, transition: { duration: 0.2 } }}
        >
            {/* Grain Head */}
            {!isDark && (
                <div className="absolute top-0 left-[-2px] w-[6px] md:w-[7px] h-[30%] bg-inherit rounded-t-full opacity-80" />
            )}
        </motion.div>
    );
});

export default AgriculturalBackground;
