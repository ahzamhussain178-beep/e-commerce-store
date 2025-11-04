import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CartItem from './components/CartItem';
import CartSummary from './components/CartSummary';
import CheckoutProgress from './components/CheckoutProgress';
import RecommendedProducts from './components/RecommendedProducts';
import EmptyCart from './components/EmptyCart';
import GiftOptions from './components/GiftOptions';

const ShoppingCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [giftOptions, setGiftOptions] = useState({
    isGift: false,
    giftMessage: '',
    giftWrap: false,
    scheduledDelivery: ''
  });

  // Mock cart data
  const mockCartItems = [
  {
    id: 1,
    name: "Premium Leather Case",
    variant: "Midnight Black",
    compatibility: "iPhone 15 Pro Max",
    price: 49.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1667862714290-f44b8e1c257b",
    imageAlt: "Black leather phone case with premium stitching and card slots"
  },
  {
    id: 2,
    name: "Clear Crystal Case",
    variant: "Transparent",
    compatibility: "iPhone 15 Pro",
    price: 29.99,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1605000977407-2771f2f8e908",
    imageAlt: "Transparent crystal clear phone case showing device design"
  },
  {
    id: 3,
    name: "Rugged Armor Case",
    variant: "Military Green",
    compatibility: "Samsung Galaxy S24 Ultra",
    price: 39.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1625465329894-9cfaf8a63332",
    imageAlt: "Military green rugged armor case with reinforced corners and grip texture"
  }];


  const mockRecommendedProducts = [
  {
    id: 101,
    name: "Wireless Charging Stand",
    compatibility: "Universal",
    price: 24.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1615526675365-c3dfde0cd836",
    imageAlt: "Modern wireless charging stand with LED indicator and adjustable angle"
  },
  {
    id: 102,
    name: "Screen Protector Kit",
    compatibility: "iPhone 15 Series",
    price: 19.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1714058948950-95c356dbb2a2",
    imageAlt: "Tempered glass screen protector kit with installation tools and cleaning cloth"
  },
  {
    id: 103,
    name: "Car Mount Holder",
    compatibility: "Universal",
    price: 34.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1729067218696-90ef6f67840c",
    imageAlt: "Adjustable car mount holder with magnetic grip and dashboard attachment"
  }];


  useEffect(() => {
    // Load cart from localStorage or set mock data
    const savedCart = localStorage.getItem('zzq_cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    } else {
      setCartItems(mockCartItems);
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('zzq_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleUpdateQuantity = (itemId, newQuantity) => {
    setCartItems((items) =>
    items?.map((item) =>
    item?.id === itemId ? { ...item, quantity: newQuantity } : item
    )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems((items) => items?.filter((item) => item?.id !== itemId));
  };

  const handleApplyPromo = async (code) => {
    // Mock promo code validation
    const validPromoCodes = {
      'SAVE10': 10,
      'WELCOME20': 20,
      'STUDENT15': 15
    };

    if (validPromoCodes?.[code?.toUpperCase()]) {
      setPromoCode(code?.toUpperCase());
      setPromoDiscount(validPromoCodes?.[code?.toUpperCase()]);
    } else {
      alert('Invalid promo code. Try: SAVE10, WELCOME20, or STUDENT15');
    }
  };

  const handleAddToCart = (product) => {
    const existingItem = cartItems?.find((item) => item?.id === product?.id);

    if (existingItem) {
      handleUpdateQuantity(product?.id, existingItem?.quantity + 1);
    } else {
      setCartItems((items) => [...items, { ...product, quantity: 1 }]);
    }
  };

  const handleGiftOptionsChange = (options) => {
    setGiftOptions(options);
  };

  // Calculate totals
  const subtotal = cartItems?.reduce((sum, item) => sum + item?.price * item?.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const giftWrapCost = giftOptions?.giftWrap ? 4.99 : 0;
  const total = subtotal + shipping + tax + giftWrapCost - promoDiscount;

  if (cartItems?.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <EmptyCart />
          </div>
        </main>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}>

                <Icon name="ArrowLeft" size={20} />
              </Button>
              <h1 className="text-3xl font-bold text-foreground font-inter">
                Shopping Cart
              </h1>
            </div>
            <p className="text-muted-foreground">
              Review your items and proceed to secure checkout
            </p>
          </div>

          {/* Checkout Progress */}
          <CheckoutProgress currentStep={1} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Cart Items List */}
              <div className="space-y-4">
                {cartItems?.map((item) =>
                <CartItem
                  key={item?.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem} />

                )}
              </div>

              {/* Gift Options */}
              <GiftOptions onGiftOptionsChange={handleGiftOptionsChange} />

              {/* Recommended Products */}
              <RecommendedProducts
                products={mockRecommendedProducts}
                onAddToCart={handleAddToCart} />

            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <CartSummary
                  subtotal={subtotal}
                  shipping={shipping}
                  tax={tax + giftWrapCost}
                  total={total}
                  onApplyPromo={handleApplyPromo}
                  promoCode={promoCode}
                  promoDiscount={promoDiscount} />

              </div>
            </div>
          </div>

          {/* Security Features */}
          <div className="mt-12 bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground font-inter mb-4 text-center">
              Secure Shopping Guarantee
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-success/10 rounded-full flex items-center justify-center">
                  <Icon name="Shield" size={24} className="text-success" />
                </div>
                <h4 className="text-sm font-medium text-foreground font-inter mb-1">
                  SSL Encrypted
                </h4>
                <p className="text-xs text-muted-foreground">
                  256-bit SSL encryption protects your data
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-success/10 rounded-full flex items-center justify-center">
                  <Icon name="CreditCard" size={24} className="text-success" />
                </div>
                <h4 className="text-sm font-medium text-foreground font-inter mb-1">
                  Secure Payments
                </h4>
                <p className="text-xs text-muted-foreground">
                  Powered by Stripe payment processing
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-success/10 rounded-full flex items-center justify-center">
                  <Icon name="RotateCcw" size={24} className="text-success" />
                </div>
                <h4 className="text-sm font-medium text-foreground font-inter mb-1">
                  Easy Returns
                </h4>
                <p className="text-xs text-muted-foreground">
                  30-day hassle-free return policy
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-success/10 rounded-full flex items-center justify-center">
                  <Icon name="Headphones" size={24} className="text-success" />
                </div>
                <h4 className="text-sm font-medium text-foreground font-inter mb-1">
                  24/7 Support
                </h4>
                <p className="text-xs text-muted-foreground">
                  Expert customer service team
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>);

};

export default ShoppingCart;