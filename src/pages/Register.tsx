import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Tractor, ShoppingCart, ArrowRight, User, MapPin, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { useToast } from '@/hooks/use-toast';

const Register: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signUp, isLoading: authLoading } = useAuth();
  const { toast } = useToast();

  const [step, setStep] = useState<'role' | 'details'>('role');
  const [role, setRole] = useState<UserRole>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [locationAddress, setLocationAddress] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setStep('details');
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: 'Password mismatch',
        description: 'Passwords do not match',
        variant: 'destructive',
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: 'Password too short',
        description: 'Password must be at least 6 characters',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    // Default location (can be updated later)
    const location = locationAddress
      ? { lat: 13.0827, lng: 80.2707, address: locationAddress }
      : undefined;

    const { error } = await signUp(email, password, name, role, location);
    setLoading(false);

    if (error) {
      toast({
        title: 'Registration failed',
        description: error,
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Account created!',
      description: 'Welcome to Virtual Mandi',
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
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
              <CardTitle className="font-heading text-2xl">{t('auth.register')}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {step === 'role' ? (
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-center text-muted-foreground mb-6">{t('auth.selectRole')}</p>

                  <div className="grid grid-cols-2 gap-4">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        variant="outline"
                        className="w-full h-auto py-8 flex flex-col gap-3 border-2 hover:border-primary hover:bg-primary/5"
                        onClick={() => handleRoleSelect('seller')}
                      >
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <Tractor className="w-8 h-8 text-primary" />
                        </div>
                        <span className="font-heading font-semibold text-lg">
                          {t('auth.farmer')}
                        </span>
                      </Button>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        variant="outline"
                        className="w-full h-auto py-8 flex flex-col gap-3 border-2 hover:border-secondary hover:bg-secondary/5"
                        onClick={() => handleRoleSelect('buyer')}
                      >
                        <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
                          <ShoppingCart className="w-8 h-8 text-secondary" />
                        </div>
                        <span className="font-heading font-semibold text-lg">
                          {t('auth.buyer')}
                        </span>
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setStep('role')}
                    className="mb-4"
                  >
                    ← Back
                  </Button>

                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg mb-6">
                    {role === 'seller' ? (
                      <Tractor className="w-6 h-6 text-primary" />
                    ) : (
                      <ShoppingCart className="w-6 h-6 text-secondary" />
                    )}
                    <span className="font-medium">
                      {role === 'seller' ? t('auth.farmer') : t('auth.buyer')}
                    </span>
                  </div>

                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="name"
                          type="text"
                          placeholder="Your name"
                          className="pl-10 h-12 touch-target"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">{t('auth.email')} *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          className="pl-10 h-12 touch-target"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">{t('auth.password')} *</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          className="pl-10 pr-10 h-12 touch-target"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          disabled={loading}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password *</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          className="pl-10 h-12 touch-target"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location (Optional)</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="location"
                          type="text"
                          placeholder="Your city or village"
                          className="pl-10 h-12 touch-target"
                          value={locationAddress}
                          onChange={(e) => setLocationAddress(e.target.value)}
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 text-lg touch-target"
                      disabled={loading || authLoading || !email || !password || !name}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          {t('common.loading')}
                        </>
                      ) : (
                        <>
                          {t('auth.register')}
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </motion.div>
              )}

              <div className="text-center pt-4 border-t">
                <p className="text-muted-foreground">
                  {t('auth.hasAccount')}{' '}
                  <Link to="/login" className="text-primary font-medium hover:underline">
                    {t('auth.login')}
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

export default Register;
