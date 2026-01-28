import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  TrendingUp,
  TrendingDown,
  IndianRupee,
  Package,
  ShoppingCart,
  Percent,
  BarChart3,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AudioGuideButton } from '@/components/AudioGuideButton';
import { audioGuides } from '@/i18n/audioGuides';
import { cn } from '@/lib/utils';

interface SellerAnalyticsProps {
  totalRevenue: number;
  productionCost: number;
  totalOrders: number;
  pendingOrders: number;
  acceptedOrders: number;
}

export const SellerAnalytics: React.FC<SellerAnalyticsProps> = ({
  totalRevenue,
  productionCost,
  totalOrders,
  pendingOrders,
  acceptedOrders,
}) => {
  const { t, i18n } = useTranslation();
  
  const netProfit = totalRevenue - productionCost;
  const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;
  const isProfit = netProfit >= 0;
  
  const currentLang = i18n.language as keyof typeof audioGuides;
  const analyticsGuide = audioGuides[currentLang]?.analytics || audioGuides.en.analytics;

  const stats = [
    {
      label: t('analytics.totalRevenue', 'Total Revenue'),
      value: totalRevenue,
      icon: IndianRupee,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: t('analytics.productionCost', 'Production Cost'),
      value: productionCost,
      icon: Package,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      label: t('analytics.netProfit', 'Net Profit/Loss'),
      value: netProfit,
      icon: isProfit ? TrendingUp : TrendingDown,
      color: isProfit ? 'text-primary' : 'text-destructive',
      bgColor: isProfit ? 'bg-primary/10' : 'bg-destructive/10',
    },
    {
      label: t('analytics.profitMargin', 'Profit Margin'),
      value: `${profitMargin.toFixed(1)}%`,
      icon: Percent,
      color: isProfit ? 'text-primary' : 'text-destructive',
      bgColor: isProfit ? 'bg-primary/10' : 'bg-destructive/10',
      isPercentage: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-6 h-6 text-primary" />
          <h2 className="font-heading text-xl font-bold">
            {t('analytics.title', 'Profit & Loss Dashboard')}
          </h2>
        </div>
        <AudioGuideButton text={analyticsGuide} size="md" />
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden">
              <CardContent className="p-4">
                <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center mb-3', stat.bgColor)}>
                  <stat.icon className={cn('w-5 h-5', stat.color)} />
                </div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className={cn('text-2xl font-bold', stat.color)}>
                  {stat.isPercentage ? stat.value : `₹${typeof stat.value === 'number' ? stat.value.toLocaleString('en-IN') : stat.value}`}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Profit Status Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Card className={cn(
          'border-2',
          isProfit ? 'border-primary/30 bg-primary/5' : 'border-destructive/30 bg-destructive/5'
        )}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {isProfit ? (
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center">
                    <TrendingDown className="w-6 h-6 text-destructive" />
                  </div>
                )}
                <div>
                  <h3 className={cn('text-lg font-bold', isProfit ? 'text-primary' : 'text-destructive')}>
                    {isProfit ? t('analytics.inProfit', 'You are in Profit! 🎉') : t('analytics.inLoss', 'You are in Loss')}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {isProfit 
                      ? t('analytics.profitDesc', 'Keep up the great work!')
                      : t('analytics.lossDesc', 'Consider adjusting your prices or reducing costs')
                    }
                  </p>
                </div>
              </div>
              <div className={cn('text-3xl font-bold', isProfit ? 'text-primary' : 'text-destructive')}>
                {isProfit ? '+' : ''}₹{Math.abs(netProfit).toLocaleString('en-IN')}
              </div>
            </div>
            
            {/* Profit Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t('analytics.profitProgress', 'Profit Margin')}</span>
                <span className={isProfit ? 'text-primary' : 'text-destructive'}>
                  {profitMargin.toFixed(1)}%
                </span>
              </div>
              <Progress 
                value={Math.min(Math.abs(profitMargin), 100)} 
                className={cn('h-3', !isProfit && '[&>div]:bg-destructive')}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Orders Summary */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <ShoppingCart className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
            <p className="text-2xl font-bold">{totalOrders}</p>
            <p className="text-sm text-muted-foreground">{t('analytics.totalOrders', 'Total Orders')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-6 h-6 mx-auto mb-2 rounded-full bg-secondary/20 flex items-center justify-center">
              <span className="text-secondary font-bold text-sm">{pendingOrders}</span>
            </div>
            <p className="text-2xl font-bold text-secondary">{pendingOrders}</p>
            <p className="text-sm text-muted-foreground">{t('analytics.pending', 'Pending')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-6 h-6 mx-auto mb-2 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold text-sm">✓</span>
            </div>
            <p className="text-2xl font-bold text-primary">{acceptedOrders}</p>
            <p className="text-sm text-muted-foreground">{t('analytics.accepted', 'Accepted')}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
