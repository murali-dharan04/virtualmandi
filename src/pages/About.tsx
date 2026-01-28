import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Target, Eye, Users, Shield, Globe, Heart } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PageAudioGuide } from '@/components/PageAudioGuide';

const About: React.FC = () => {
  const { t } = useTranslation();

  const values = [
    {
      icon: Users,
      title: 'Farmer First',
      description: 'Every decision we make puts farmers at the center',
    },
    {
      icon: Shield,
      title: 'Transparency',
      description: 'Open and honest pricing with no hidden fees',
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Simple technology that anyone can use',
    },
    {
      icon: Heart,
      title: 'Fair Trade',
      description: 'Ensuring fair prices for quality produce',
    },
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
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
                {t('about.title')}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                A digital agricultural marketplace that connects farmers directly with buyers,
                eliminating middlemen and improving price transparency for all.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <motion.div
                className="farmer-card"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h2 className="font-heading text-2xl font-bold mb-4">{t('about.mission')}</h2>
                <p className="text-muted-foreground text-lg">{t('about.missionText')}</p>
              </motion.div>

              <motion.div
                className="farmer-card"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <Eye className="w-8 h-8 text-secondary" />
                </div>
                <h2 className="font-heading text-2xl font-bold mb-4">{t('about.vision')}</h2>
                <p className="text-muted-foreground text-lg">{t('about.visionText')}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-muted py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.h2
              className="font-heading text-3xl md:text-4xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Our Values
            </motion.h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="bg-card rounded-xl p-6 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div
                    className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  >
                    <value.icon className="w-7 h-7 text-primary" />
                  </motion.div>
                  <h3 className="font-heading text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <PageAudioGuide pageKey="about" />
    </div>
  );
};

export default About;
