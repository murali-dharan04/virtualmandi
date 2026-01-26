import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const languages = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
];

export const LanguageSelector: React.FC = () => {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [hasSelected, setHasSelected] = React.useState(false);

  React.useEffect(() => {
    const hasVisited = localStorage.getItem('virtualmandi_visited');
    if (hasVisited) {
      setHasSelected(true);
    }
  }, []);

  const handleLanguageSelect = (langCode: string) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('virtualmandi_visited', 'true');
    setHasSelected(true);
  };

  if (hasSelected) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-background flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="max-w-lg w-full bg-card rounded-2xl p-8 shadow-xl border border-border"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-heading font-bold text-2xl">VM</span>
          </div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold mb-2">Virtual Mandi</h1>
          <p className="text-muted-foreground">{t('language.title')}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {languages.map((lang, index) => (
            <motion.div
              key={lang.code}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <Button
                variant={i18n.language === lang.code ? 'default' : 'outline'}
                className="w-full h-auto py-4 flex flex-col gap-1 touch-target"
                onClick={() => handleLanguageSelect(lang.code)}
              >
                <span className="text-lg font-semibold">{lang.native}</span>
                <span className="text-xs opacity-70">{lang.name}</span>
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
