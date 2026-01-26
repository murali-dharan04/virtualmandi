import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sprout, Store, Handshake, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AnimatedNumber: React.FC<{ value: number; suffix?: string; delay?: number }> = ({
  value,
  suffix = '',
  delay = 0,
}) => {
  const [count, setCount] = React.useState(0);
  const [hasAnimated, setHasAnimated] = React.useState(false);

  React.useEffect(() => {
    if (hasAnimated) return;

    const timer = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const interval = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      setHasAnimated(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay, hasAnimated]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const GrowthVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-md aspect-square">
      <motion.div
        className="absolute inset-0 bg-primary/20 rounded-full blur-[100px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <svg viewBox="0 0 400 400" className="w-full h-full relative z-10 drop-shadow-2xl">
        {/* Ground */}
        <path d="M50,350 Q200,320 350,350" fill="none" stroke="currentColor" strokeWidth="4" className="text-secondary/60" />

        {/* Animated Growing Plant */}
        <motion.path
          d="M200,340 C200,340 180,250 200,150"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          className="text-primary"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />

        {/* Leaves */}
        <motion.path
          d="M200,280 Q230,260 250,280 Q230,300 200,280"
          fill="currentColor"
          className="text-primary/80"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        />
        <motion.path
          d="M200,230 Q170,210 150,230 Q170,250 200,230"
          fill="currentColor"
          className="text-primary/70"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        />
        <motion.path
          d="M200,180 Q240,150 260,180 Q240,210 200,180"
          fill="currentColor"
          className="text-primary/90"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
        />

        {/* Sparkling dots */}
        {[...Array(8)].map((_, i) => (
          <motion.circle
            key={i}
            r="3"
            fill="currentColor"
            className="text-secondary"
            cx={150 + Math.random() * 100}
            cy={150 + Math.random() * 100}
            animate={{ y: [0, -20, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
          />
        ))}
      </svg>
    </div>
  );
}

export const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const storySteps = [
    {
      icon: Sprout,
      title: t('story.step1Title'),
      desc: t('story.step1Desc'),
      color: 'bg-primary',
    },
    {
      icon: Store,
      title: t('story.step2Title'),
      desc: t('story.step2Desc'),
      color: 'bg-secondary',
    },
    {
      icon: Handshake,
      title: t('story.step3Title'),
      desc: t('story.step3Desc'),
      color: 'bg-accent',
    },
    {
      icon: TrendingUp,
      title: t('story.step4Title'),
      desc: t('story.step4Desc'),
      color: 'bg-primary',
    },
  ];

  const stats = [
    { value: 50000, suffix: '+', label: t('impact.farmers') },
    { value: 25000, suffix: '+', label: t('impact.buyers') },
    { value: 100, suffix: '%', label: t('impact.savings') },
    { value: 150000, suffix: '+', label: t('impact.trades') },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Hero */}
      <div className="flex items-center pt-24 min-h-[90vh]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-left">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Badge */}
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6 backdrop-blur-sm border border-primary/20">
                  {t('hero.tagline')}
                </span>

                <h1 className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-6 leading-[1.1]">
                  {t('hero.title')}
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl">
                  {t('hero.subtitle')}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="text-lg px-8 py-7 rounded-2xl shadow-2xl hover:translate-y-[-2px] transition-all"
                    onClick={() => navigate('/register')}
                  >
                    {t('hero.cta')}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-8 py-7 rounded-2xl glass-card border-white/20 hover:bg-white/10"
                    onClick={() => navigate('/about')}
                  >
                    {t('hero.learnMore')}
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Growth Visual Container */}
            <div className="flex-1 w-full flex justify-center items-center">
              <GrowthVisual />
            </div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.h2
            className="font-heading text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('story.title')}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {storySteps.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
              >
                <div className="farmer-card h-full text-center">
                  <motion.div
                    className={`w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-full ${step.color} flex items-center justify-center`}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  >
                    <step.icon className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground" />
                  </motion.div>
                  <h3 className="font-heading text-lg md:text-xl font-semibold mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>

                {/* Connector Line */}
                {index < storySteps.length - 1 && (
                  <motion.div
                    className="hidden lg:block absolute top-1/3 -right-4 w-8 h-0.5 bg-primary/30"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.3, duration: 0.4 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-primary/90 backdrop-blur-md py-16 md:py-20 shadow-2xl">
        <div className="container mx-auto px-4">
          <motion.h2
            className="font-heading text-3xl md:text-4xl font-bold text-center text-primary-foreground mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('impact.title')}
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <div className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground mb-2">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} delay={index * 200} />
                </div>
                <p className="text-sm md:text-base text-primary-foreground/80">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};