import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Leaf, Shield, MapPin, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PageAudioGuide } from '@/components/PageAudioGuide';

const ForBuyers: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const benefits = [
    {
      icon: Leaf,
      title: t('forBuyers.benefit1'),
      description: 'Source produce directly from the farm, ensuring freshness',
    },
    {
      icon: Shield,
      title: t('forBuyers.benefit2'),
      description: 'Clear pricing with no hidden costs or middleman markups',
    },
    {
      icon: Leaf,
      title: t('forBuyers.benefit3'),
      description: 'Access verified farmers with quality produce',
    },
    {
      icon: MapPin,
      title: t('forBuyers.benefit4'),
      description: 'Help strengthen local agricultural communities',
    },
  ];

  const steps = [
    { step: '1', title: 'Register', desc: 'Sign up as a buyer in minutes' },
    { step: '2', title: 'Browse', desc: 'Discover farmers near your location' },
    { step: '3', title: 'Request', desc: 'Send purchase requests directly' },
    { step: '4', title: 'Buy', desc: 'Complete your purchase with ease' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20">
        {/* Hero */}
        <section className="hero-gradient py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.div
                className="w-24 h-24 mx-auto mb-6 rounded-full bg-secondary/10 flex items-center justify-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <ShoppingCart className="w-12 h-12 text-secondary" />
              </motion.div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
                {t('forBuyers.title')}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Source fresh, quality produce directly from farmers. Get transparent pricing and
                support local agriculture.
              </p>
              <Button size="lg" className="text-lg px-8 py-6" onClick={() => navigate('/register')}>
                {t('forBuyers.cta')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.h2
              className="font-heading text-3xl md:text-4xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Why Buy on Virtual Mandi?
            </motion.h2>

            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="farmer-card flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="bg-secondary py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.h2
              className="font-heading text-3xl md:text-4xl font-bold text-center text-secondary-foreground mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              How It Works
            </motion.h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div
                    className="w-16 h-16 rounded-full bg-secondary-foreground/20 flex items-center justify-center mx-auto mb-4"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  >
                    <span className="font-heading text-2xl font-bold text-secondary-foreground">
                      {step.step}
                    </span>
                  </motion.div>
                  <h3 className="font-heading text-lg font-semibold text-secondary-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-secondary-foreground/80">{step.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 bg-secondary-foreground text-secondary hover:bg-secondary-foreground/90"
                onClick={() => navigate('/register')}
              >
                Start Buying Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <PageAudioGuide pageKey="forBuyers" />
    </div>
  );
};

export default ForBuyers;
