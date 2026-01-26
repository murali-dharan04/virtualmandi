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
      <div className="hero-gradient min-h-screen flex items-center pt-20">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Animated Crop Icon */}
              <motion.div
                className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Sprout className="w-12 h-12 md:w-16 md:h-16 text-primary" />
              </motion.div>

              <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4">
                {t('hero.title')}
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground mb-4">
                {t('hero.subtitle')}
              </p>

              <motion.p
                className="text-base md:text-lg text-primary font-medium mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                {t('hero.tagline')}
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 touch-target"
                  onClick={() => navigate('/register')}
                >
                  {t('hero.cta')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 touch-target"
                  onClick={() => navigate('/about')}
                >
                  {t('hero.learnMore')}
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Story Section */}
      <div className="bg-background py-16 md:py-24">
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
      <div className="bg-primary py-16 md:py-20">
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
