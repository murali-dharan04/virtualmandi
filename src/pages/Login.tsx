import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { Phone, Mail, Lock, Eye, EyeOff, Tractor, ShoppingCart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { BackgroundController } from '@/components/backgrounds';

const Login: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [authMethod, setAuthMethod] = useState<'mobile' | 'email'>('mobile');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = () => {
    setLoading(true);
    setTimeout(() => {
      setOtpSent(true);
      setLoading(false);
    }, 1000);
  };

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      // Demo login - in production, this would verify with backend
      const demoUser = {
        id: 'user_' + Date.now(),
        name: 'Demo User',
        mobile: mobile || undefined,
        email: email || undefined,
        role: 'buyer' as UserRole,
        location: { lat: 13.0827, lng: 80.2707, address: 'Chennai, Tamil Nadu' },
      };
      login(demoUser);
      navigate('/dashboard');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <BackgroundController type="digital-network" />
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-2">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-bold text-2xl">VM</span>
              </div>
              <CardTitle className="font-heading text-2xl">{t('auth.login')}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <Tabs
                defaultValue="mobile"
                onValueChange={(v) => setAuthMethod(v as 'mobile' | 'email')}
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="mobile" className="touch-target">
                    <Phone className="w-4 h-4 mr-2" />
                    {t('auth.mobile')}
                  </TabsTrigger>
                  <TabsTrigger value="email" className="touch-target">
                    <Mail className="w-4 h-4 mr-2" />
                    {t('auth.email')}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="mobile" className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="mobile">{t('auth.mobile')}</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="mobile"
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        className="pl-10 h-12 touch-target"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                      />
                    </div>
                  </div>

                  {otpSent ? (
                    <div className="space-y-2">
                      <Label htmlFor="otp">{t('auth.otp')}</Label>
                      <Input
                        id="otp"
                        type="text"
                        placeholder="XXXXXX"
                        className="h-12 text-center text-2xl tracking-widest touch-target"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                    </div>
                  ) : null}

                  <Button
                    className="w-full h-12 text-lg touch-target"
                    disabled={loading || !mobile}
                    onClick={otpSent ? handleLogin : handleSendOtp}
                  >
                    {loading
                      ? t('common.loading')
                      : otpSent
                        ? t('auth.verifyOtp')
                        : t('auth.sendOtp')}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </TabsContent>

                <TabsContent value="email" className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('auth.email')}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="pl-10 h-12 touch-target"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">{t('auth.password')}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="pl-10 pr-10 h-12 touch-target"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    className="w-full h-12 text-lg touch-target"
                    disabled={loading || !email || !password}
                    onClick={handleLogin}
                  >
                    {loading ? t('common.loading') : t('auth.login')}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </TabsContent>
              </Tabs>

              <div className="text-center pt-4 border-t">
                <p className="text-muted-foreground">
                  {t('auth.noAccount')}{' '}
                  <Link to="/register" className="text-primary font-medium hover:underline">
                    {t('auth.register')}
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
