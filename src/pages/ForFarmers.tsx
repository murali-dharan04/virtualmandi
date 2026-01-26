import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Tractor, TrendingUp, Ban, Smartphone, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const ForFarmers: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const benefits = [
    {
      icon: TrendingUp,
      title: t('forFarmers.benefit1'),
      description: 'Connect directly with buyers without any intermediaries',
    },
    {
      icon: TrendingUp,
      title: t('forFarmers.benefit2'),
      description: 'Receive fair market prices for your quality produce',
    },
    {
      icon: Ban,
      title: t('forFarmers.benefit3'),
      description: 'No hidden fees or commission cuts from your earnings',
    },
    {
      icon: Smartphone,
      title: t('forFarmers.benefit4'),
      description: 'Simple interface designed for everyone',
    },
  ];

  const steps = [
    { step: '1', title: 'Register', desc: 'Sign up as a farmer with your mobile number' },
    { step: '2', title: 'List Products', desc: 'Add your crops with price and quantity' },
    { step: '3', title: 'Get Requests', desc: 'Receive purchase requests from buyers' },
    { step: '4', title: 'Sell Direct', desc: 'Accept requests and complete the sale' },
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
                className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Tractor className="w-12 h-12 text-primary" />
              </motion.div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
                {t('forFarmers.title')}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Join thousands of farmers who are already selling directly to buyers and earning
                better prices for their hard work.
              </p>
              <Button size="lg" className="text-lg px-8 py-6" onClick={() => navigate('/register')}>
                {t('forFarmers.cta')}
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
              Why Choose Virtual Mandi?
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
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-primary" />
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
        <section className="bg-primary py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.h2
              className="font-heading text-3xl md:text-4xl font-bold text-center text-primary-foreground mb-12"
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
                    className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center mx-auto mb-4"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  >
                    <span className="font-heading text-2xl font-bold text-primary-foreground">
                      {step.step}
                    </span>
                  </motion.div>
                  <h3 className="font-heading text-lg font-semibold text-primary-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-primary-foreground/80">{step.desc}</p>
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
                variant="secondary"
                className="text-lg px-8 py-6"
                onClick={() => navigate('/register')}
              >
                Start Selling Today
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

export default ForFarmers;
