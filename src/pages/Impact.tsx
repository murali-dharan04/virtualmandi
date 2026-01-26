import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  Users,
  Ban,
  Handshake,
  ArrowRight,
  MapPin,
  BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

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

const Impact: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const stats = [
    {
      icon: Users,
      value: 50000,
      suffix: '+',
      label: t('impact.farmers'),
      color: 'bg-primary',
    },
    {
      icon: Users,
      value: 25000,
      suffix: '+',
      label: t('impact.buyers'),
      color: 'bg-secondary',
    },
    {
      icon: Ban,
      value: 100,
      suffix: '%',
      label: t('impact.savings'),
      color: 'bg-accent',
    },
    {
      icon: Handshake,
      value: 150000,
      suffix: '+',
      label: t('impact.trades'),
      color: 'bg-primary',
    },
  ];

  const achievements = [
    {
      title: 'Farmer Income Increased',
      value: '35%',
      description: 'Average income increase for farmers using Virtual Mandi',
    },
    {
      title: 'States Covered',
      value: '12',
      description: 'Presence across major agricultural states in India',
    },
    {
      title: 'Crop Varieties',
      value: '200+',
      description: 'Different crops traded on our platform',
    },
    {
      title: 'Daily Transactions',
      value: '5000+',
      description: 'Successful trades happening every day',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20">
        {/* Hero */}
        <section className="bg-primary py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.div
                className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary-foreground/20 flex items-center justify-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <BarChart3 className="w-12 h-12 text-primary-foreground" />
              </motion.div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
                {t('impact.title')}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80">
                See how Virtual Mandi is transforming agricultural trade and improving the lives of
                farmers across India.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Stats */}
        <section className="py-16 md:py-24 -mt-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="farmer-card text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div
                    className={`w-14 h-14 rounded-full ${stat.color} flex items-center justify-center mx-auto mb-4`}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  >
                    <stat.icon className="w-7 h-7 text-primary-foreground" />
                  </motion.div>
                  <div className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-1">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} delay={index * 200} />
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="bg-muted py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.h2
              className="font-heading text-3xl md:text-4xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Key Achievements
            </motion.h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {achievements.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-card rounded-xl p-6 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="font-heading text-4xl md:text-5xl font-bold text-primary mb-2">
                    {item.value}
                  </div>
                  <h3 className="font-heading text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Our Vision</h2>
              <p className="text-lg text-muted-foreground mb-8">
                We envision a future where every farmer in India has direct access to markets,
                receives fair prices for their produce, and can thrive without depending on
                middlemen. Join us in making this vision a reality.
              </p>
              <Button size="lg" className="text-lg px-8 py-6" onClick={() => navigate('/register')}>
                Join the Movement
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Impact;
