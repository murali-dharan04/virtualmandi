import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Package,
  MessageSquare,
  MapPin,
  Search,
  Filter,
  Tractor,
  ShoppingCart,
  Check,
  X,
  Clock,
  Leaf,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navbar } from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { useData, Product, PurchaseRequest } from '@/contexts/DataContext';

const SellerDashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { getSellerProducts, getSellerRequests, addProduct, deleteProduct, updateRequestStatus } =
    useData();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Form state
  const [cropName, setCropName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState<'kg' | 'quintal' | 'ton'>('kg');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState(user?.location?.address || '');

  const products = user ? getSellerProducts(user.id) : [];
  const requests = user ? getSellerRequests(user.id) : [];

  const handleAddProduct = () => {
    if (!user || !cropName || !quantity || !price) return;

    addProduct({
      sellerId: user.id,
      sellerName: user.name,
      cropName,
      quantity: parseFloat(quantity),
      unit,
      pricePerUnit: parseFloat(price),
      location: user.location || { lat: 13.0827, lng: 80.2707, address: location },
    });

    setCropName('');
    setQuantity('');
    setPrice('');
    setIsAddDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary">
            <Clock className="w-3 h-3 mr-1" />
            {t('request.pending')}
          </Badge>
        );
      case 'accepted':
        return (
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
            <Check className="w-3 h-3 mr-1" />
            {t('request.accepted')}
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive">
            <X className="w-3 h-3 mr-1" />
            {t('request.rejected')}
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold">
            {t('dashboard.welcome')}, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-muted-foreground flex items-center gap-2 mt-1">
            <Tractor className="w-4 h-4" />
            {t('auth.farmer')}
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="touch-target">
              <Plus className="w-5 h-5 mr-2" />
              {t('dashboard.addProduct')}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-heading">{t('dashboard.addProduct')}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="cropName">{t('product.cropName')}</Label>
                <Input
                  id="cropName"
                  value={cropName}
                  onChange={(e) => setCropName(e.target.value)}
                  placeholder="e.g. Rice, Wheat, Cotton"
                  className="h-12"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">{t('product.quantity')}</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="100"
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">{t('product.unit')}</Label>
                  <Select value={unit} onValueChange={(v) => setUnit(v as typeof unit)}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">{t('product.kg')}</SelectItem>
                      <SelectItem value="quintal">{t('product.quintal')}</SelectItem>
                      <SelectItem value="ton">{t('product.ton')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">{t('product.price')} (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="35"
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">{t('product.location')}</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Your location"
                    className="pl-10 h-12"
                  />
                </div>
              </div>

              <Button className="w-full h-12 text-lg" onClick={handleAddProduct}>
                {t('product.add')}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="listings">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="listings" className="touch-target">
            <Package className="w-4 h-4 mr-2" />
            {t('dashboard.myListings')} ({products.length})
          </TabsTrigger>
          <TabsTrigger value="requests" className="touch-target">
            <MessageSquare className="w-4 h-4 mr-2" />
            {t('dashboard.requests')} ({requests.filter((r) => r.status === 'pending').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="listings" className="mt-6">
          {products.length === 0 ? (
            <Card className="border-dashed border-2">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Leaf className="w-16 h-16 text-muted-foreground/50 mb-4" />
                <h3 className="font-heading text-lg font-semibold mb-2">No products yet</h3>
                <p className="text-muted-foreground mb-4">Start by adding your first product</p>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  {t('dashboard.addProduct')}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-heading text-lg font-semibold">{product.cropName}</h3>
                          <p className="text-muted-foreground text-sm">
                            {product.quantity} {t(`product.${product.unit}`)}
                          </p>
                          <p className="text-primary font-bold text-xl mt-2">
                            ₹{product.pricePerUnit.toLocaleString()}/{product.unit}
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-2">
                            <MapPin className="w-3 h-3" />
                            {product.location.address}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => deleteProduct(product.id)}
                        >
                          {t('product.delete')}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="requests" className="mt-6">
          {requests.length === 0 ? (
            <Card className="border-dashed border-2">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <MessageSquare className="w-16 h-16 text-muted-foreground/50 mb-4" />
                <h3 className="font-heading text-lg font-semibold mb-2">No requests yet</h3>
                <p className="text-muted-foreground">Buyer requests will appear here</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {requests.map((request) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{request.buyerName}</h3>
                          <p className="text-sm text-muted-foreground">
                            Requested {request.quantity} units
                          </p>
                          <div className="mt-2">{getStatusBadge(request.status)}</div>
                        </div>
                        {request.status === 'pending' && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => updateRequestStatus(request.id, 'accepted')}
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateRequestStatus(request.id, 'rejected')}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const BuyerDashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { products, getBuyerRequests, sendRequest } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCrop, setSelectedCrop] = useState<string>('all');

  const requests = user ? getBuyerRequests(user.id) : [];

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.cropName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCrop = selectedCrop === 'all' || p.cropName === selectedCrop;
    return matchesSearch && matchesCrop;
  });

  const uniqueCrops = Array.from(new Set(products.map((p) => p.cropName)));

  const handleSendRequest = (product: Product) => {
    if (!user) return;
    sendRequest({
      productId: product.id,
      buyerId: user.id,
      buyerName: user.name,
      sellerId: product.sellerId,
      quantity: product.quantity,
    });
  };

  const hasRequestedProduct = (productId: string) => {
    return requests.some((r) => r.productId === productId);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary">
            <Clock className="w-3 h-3 mr-1" />
            {t('request.pending')}
          </Badge>
        );
      case 'accepted':
        return (
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
            <Check className="w-3 h-3 mr-1" />
            {t('request.accepted')}
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive">
            <X className="w-3 h-3 mr-1" />
            {t('request.rejected')}
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold">
          {t('dashboard.welcome')}, {user?.name?.split(' ')[0]}! 👋
        </h1>
        <p className="text-muted-foreground flex items-center gap-2 mt-1">
          <ShoppingCart className="w-4 h-4" />
          {t('auth.buyer')}
        </p>
      </div>

      <Tabs defaultValue="discover">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="discover" className="touch-target">
            <Search className="w-4 h-4 mr-2" />
            {t('dashboard.discover')}
          </TabsTrigger>
          <TabsTrigger value="requests" className="touch-target">
            <MessageSquare className="w-4 h-4 mr-2" />
            {t('dashboard.myRequests')} ({requests.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="discover" className="mt-6 space-y-4">
          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder={t('common.search')}
                className="pl-10 h-12"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedCrop} onValueChange={setSelectedCrop}>
              <SelectTrigger className="w-full sm:w-48 h-12">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder={t('common.filter')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Crops</SelectItem>
                {uniqueCrops.map((crop) => (
                  <SelectItem key={crop} value={crop}>
                    {crop}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Products Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="overflow-hidden h-full">
                  <CardContent className="p-4">
                    <div className="flex flex-col h-full">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-heading text-lg font-semibold">{product.cropName}</h3>
                          <p className="text-sm text-muted-foreground">by {product.sellerName}</p>
                        </div>
                        <Badge variant="secondary" className="ml-2">
                          {product.quantity} {product.unit}
                        </Badge>
                      </div>

                      <p className="text-primary font-bold text-2xl mb-3">
                        ₹{product.pricePerUnit.toLocaleString()}
                        <span className="text-sm font-normal text-muted-foreground">
                          /{product.unit}
                        </span>
                      </p>

                      <p className="text-sm text-muted-foreground flex items-center gap-1 mb-4">
                        <MapPin className="w-3 h-3" />
                        {product.location.address}
                      </p>

                      <div className="mt-auto">
                        {hasRequestedProduct(product.id) ? (
                          <Button disabled variant="outline" className="w-full h-11">
                            <Check className="w-4 h-4 mr-2" />
                            Request Sent
                          </Button>
                        ) : (
                          <Button
                            className="w-full h-11"
                            onClick={() => handleSendRequest(product)}
                          >
                            {t('request.send')}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <Card className="border-dashed border-2">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Search className="w-16 h-16 text-muted-foreground/50 mb-4" />
                <h3 className="font-heading text-lg font-semibold mb-2">{t('common.noResults')}</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="requests" className="mt-6">
          {requests.length === 0 ? (
            <Card className="border-dashed border-2">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <MessageSquare className="w-16 h-16 text-muted-foreground/50 mb-4" />
                <h3 className="font-heading text-lg font-semibold mb-2">No requests yet</h3>
                <p className="text-muted-foreground">
                  Send purchase requests to farmers to get started
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {requests.map((request) => {
                const product = products.find((p) => p.id === request.productId);
                return (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{product?.cropName || 'Product'}</h3>
                            <p className="text-sm text-muted-foreground">
                              From {product?.sellerName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Quantity: {request.quantity}
                            </p>
                          </div>
                          {getStatusBadge(request.status)}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        {user.role === 'seller' ? <SellerDashboard /> : <BuyerDashboard />}
      </div>
    </div>
  );
};

export default Dashboard;
