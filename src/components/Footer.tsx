import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-bold text-xl">VM</span>
              </div>
              <span className="font-heading font-bold text-xl">Virtual Mandi</span>
            </div>
            <p className="text-background/70 text-sm max-w-md">
              Connecting farmers directly with buyers. Fair prices, transparent trade, no middlemen.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-background/70 hover:text-background text-sm transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/for-farmers" className="text-background/70 hover:text-background text-sm transition-colors">
                  {t('nav.forFarmers')}
                </Link>
              </li>
              <li>
                <Link to="/for-buyers" className="text-background/70 hover:text-background text-sm transition-colors">
                  {t('nav.forBuyers')}
                </Link>
              </li>
              <li>
                <Link to="/impact" className="text-background/70 hover:text-background text-sm transition-colors">
                  {t('nav.impact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>support@virtualmandi.in</li>
              <li>1800-XXX-XXXX (Toll Free)</li>
              <li>Government of India Initiative</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm text-background/50">
          <p>© {new Date().getFullYear()} Virtual Mandi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
