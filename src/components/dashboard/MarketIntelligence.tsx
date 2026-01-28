import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart3,
  MapPin,
  AlertCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AudioGuideButton } from '@/components/AudioGuideButton';
import { audioGuides } from '@/i18n/audioGuides';
import { cn } from '@/lib/utils';

interface MarketPrice {
  cropName: string;
  yourPrice: number;
  marketAverage: number;
  mandiPrice: number;
  trend: 'up' | 'down' | 'stable';
  demandLevel: 'high' | 'medium' | 'low';
}

interface MarketIntelligenceProps {
  prices: MarketPrice[];
  userLocation?: string;
}

// Sample market data - in production this would come from an API
const sampleMarketData: MarketPrice[] = [
  { cropName: 'Rice', yourPrice: 2200, marketAverage: 2100, mandiPrice: 2050, trend: 'up', demandLevel: 'high' },
  { cropName: 'Wheat', yourPrice: 2400, marketAverage: 2450, mandiPrice: 2400, trend: 'stable', demandLevel: 'medium' },
  { cropName: 'Cotton', yourPrice: 6500, marketAverage: 6800, mandiPrice: 6700, trend: 'down', demandLevel: 'low' },
  { cropName: 'Sugarcane', yourPrice: 350, marketAverage: 340, mandiPrice: 330, trend: 'up', demandLevel: 'high' },
  { cropName: 'Tomato', yourPrice: 25, marketAverage: 30, mandiPrice: 28, trend: 'up', demandLevel: 'high' },
];

export const MarketIntelligence: React.FC<MarketIntelligenceProps> = ({
  prices = sampleMarketData,
  userLocation = 'Tamil Nadu',
}) => {
  const { t, i18n } = useTranslation();
  
  const currentLang = i18n.language as keyof typeof audioGuides;
  const marketGuide = audioGuides[currentLang]?.marketIntelligence || audioGuides.en.marketIntelligence;

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-primary" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-destructive" />;
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getDemandBadge = (level: string) => {
    switch (level) {
      case 'high':
        return <Badge className="bg-primary/10 text-primary border-primary/30">{t('market.highDemand', 'High Demand')}</Badge>;
      case 'medium':
        return <Badge className="bg-secondary/10 text-secondary border-secondary/30">{t('market.mediumDemand', 'Medium')}</Badge>;
      default:
        return <Badge variant="outline" className="text-muted-foreground">{t('market.lowDemand', 'Low')}</Badge>;
    }
  };

  const getPriceComparison = (yourPrice: number, marketAverage: number) => {
    const diff = ((yourPrice - marketAverage) / marketAverage) * 100;
    if (diff > 5) {
      return { text: t('market.aboveMarket', 'Above market'), color: 'text-primary', icon: TrendingUp };
    } else if (diff < -5) {
      return { text: t('market.belowMarket', 'Below market'), color: 'text-destructive', icon: TrendingDown };
    }
    return { text: t('market.atMarket', 'At market rate'), color: 'text-muted-foreground', icon: Minus };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-6 h-6 text-accent" />
          <div>
            <h2 className="font-heading text-xl font-bold">
              {t('market.title', 'Market Intelligence')}
            </h2>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {userLocation}
            </p>
          </div>
        </div>
        <AudioGuideButton text={marketGuide} size="md" />
      </div>

      {/* Price Comparison Cards */}
      <div className="space-y-4">
        {prices.map((item, index) => {
          const comparison = getPriceComparison(item.yourPrice, item.marketAverage);
          const ComparisonIcon = comparison.icon;
          
          return (
            <motion.div
              key={item.cropName}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <span className="text-lg">🌾</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">{item.cropName}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          {getTrendIcon(item.trend)}
                          <span>{t(`market.trend.${item.trend}`, item.trend)}</span>
                        </div>
                      </div>
                    </div>
                    {getDemandBadge(item.demandLevel)}
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-2 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">{t('market.yourPrice', 'Your Price')}</p>
                      <p className="font-bold text-lg">₹{item.yourPrice.toLocaleString()}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-accent/10">
                      <p className="text-xs text-muted-foreground mb-1">{t('market.marketAvg', 'Market Avg')}</p>
                      <p className="font-bold text-lg text-accent">₹{item.marketAverage.toLocaleString()}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-secondary/10">
                      <p className="text-xs text-muted-foreground mb-1">{t('market.mandiPrice', 'Mandi Price')}</p>
                      <p className="font-bold text-lg text-secondary">₹{item.mandiPrice.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className={cn('flex items-center gap-2 mt-3 pt-3 border-t', comparison.color)}>
                    <ComparisonIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">{comparison.text}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Market Alert */}
      <Card className="border-accent/30 bg-accent/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-accent mt-0.5" />
            <div>
              <h4 className="font-semibold text-accent mb-1">
                {t('market.smartTip', 'Smart Selling Tip')}
              </h4>
              <p className="text-sm text-muted-foreground">
                {t('market.tipContent', 'Tomato and Rice prices are rising. Consider selling now for better returns. Demand is high in your region.')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
