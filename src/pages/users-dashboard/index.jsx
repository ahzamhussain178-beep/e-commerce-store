import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import DashboardStats from './components/DashboardStats';
import RecentOrders from './components/RecentOrders';
import WishlistPreview from './components/WishlistPreview';
import PersonalizedRecommendations from './components/PersonalizedRecommendations';
import QuickActions from './components/QuickActions';
import LoyaltyProgram from './components/LoyaltyProgram';
import AccountOverview from './components/AccountOverview';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Mock user authentication check
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Mock authentication check
    const token = localStorage.getItem('authToken');
    if (!token) {
      setIsAuthenticated(false);
      navigate('/login');
    }
  }, [navigate]);

  // Mock user data
  const userProfile = {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    memberSince: "January 2023",
    avatar: "https://images.unsplash.com/photo-1700561791890-a15d45b9c79d",
    avatarAlt: "Professional headshot of woman with shoulder-length brown hair wearing white blazer"
  };

  const dashboardStats = {
    totalOrders: 24,
    loyaltyPoints: 3450,
    wishlistItems: 8,
    activeCases: 3
  };

  const recentOrders = [
  {
    id: "ORD-2024-001",
    orderNumber: "ZZQ240001",
    productName: "Premium Clear Case - iPhone 15 Pro",
    image: "https://images.unsplash.com/photo-1605000977407-2771f2f8e908",
    imageAlt: "Clear transparent phone case showing iPhone design underneath",
    date: "October 15, 2024",
    total: "29.99",
    status: "Delivered",
    reviewed: false
  },
  {
    id: "ORD-2024-002",
    orderNumber: "ZZQ240002",
    productName: "Leather Wallet Case - Samsung Galaxy S24",
    image: "https://images.unsplash.com/photo-1662569074546-d99afa414862",
    imageAlt: "Brown leather wallet phone case with card slots and magnetic closure",
    date: "October 12, 2024",
    total: "45.99",
    status: "Shipped",
    reviewed: false
  },
  {
    id: "ORD-2024-003",
    orderNumber: "ZZQ240003",
    productName: "Rugged Armor Case - iPhone 15",
    image: "https://images.unsplash.com/photo-1589832600171-815a49a57239",
    imageAlt: "Black rugged phone case with reinforced corners and textured grip surface",
    date: "October 8, 2024",
    total: "34.99",
    status: "Processing",
    reviewed: false
  }];


  const wishlistItems = [
  {
    id: "WISH-001",
    name: "Magnetic MagSafe Case",
    compatibility: "iPhone 15 Pro Max",
    price: "39.99",
    originalPrice: "49.99",
    image: "https://images.unsplash.com/photo-1640596446943-46f674540eda",
    imageAlt: "Sleek magnetic phone case with MagSafe compatibility ring visible on back"
  },
  {
    id: "WISH-002",
    name: "Gaming Grip Case",
    compatibility: "Samsung Galaxy S24 Ultra",
    price: "42.99",
    image: "https://images.unsplash.com/photo-1732020883989-b22d66f8f1b9",
    imageAlt: "Gaming phone case with ergonomic grips and cooling vents for extended play"
  },
  {
    id: "WISH-003",
    name: "Eco-Friendly Bamboo Case",
    compatibility: "iPhone 15",
    price: "27.99",
    originalPrice: "32.99",
    image: "https://images.unsplash.com/photo-1597646053494-71809e4b147f",
    imageAlt: "Natural bamboo phone case with smooth finish and laser-engraved logo"
  },
  {
    id: "WISH-004",
    name: "Waterproof Adventure Case",
    compatibility: "iPhone 15 Pro",
    price: "59.99",
    image: "https://images.unsplash.com/photo-1688528653595-9780d83d0470",
    imageAlt: "Waterproof phone case with sealed ports and lanyard attachment point"
  }];


  const personalizedRecommendations = [
  {
    id: "REC-001",
    name: "Crystal Clear Pro Case",
    compatibility: "iPhone 15 Pro",
    price: "24.99",
    originalPrice: "29.99",
    rating: 4.8,
    reviews: 342,
    matchPercentage: 95,
    isNew: true,
    discount: 17,
    image: "https://images.unsplash.com/photo-1631725937846-54195511c3f3",
    imageAlt: "Ultra-clear phone case with anti-yellowing technology and precise cutouts"
  },
  {
    id: "REC-002",
    name: "Minimalist Leather Case",
    compatibility: "iPhone 15 Pro",
    price: "49.99",
    rating: 4.6,
    reviews: 128,
    matchPercentage: 88,
    image: "https://images.unsplash.com/photo-1569400324745-00a4c6db3edf",
    imageAlt: "Premium leather phone case in cognac brown with stitched edges and card slot"
  },
  {
    id: "REC-003",
    name: "Wireless Charging Case",
    compatibility: "iPhone 15 Pro",
    price: "35.99",
    originalPrice: "42.99",
    rating: 4.7,
    reviews: 256,
    matchPercentage: 82,
    discount: 16,
    image: "https://images.unsplash.com/photo-1561018734-423d0008da1f",
    imageAlt: "Slim phone case optimized for wireless charging with built-in metal ring"
  }];


  const loyaltyData = {
    currentPoints: 3450,
    nextTierPoints: 5000,
    currentTier: "Silver",
    nextTier: "Gold",
    recentEarnings: [
    {
      id: 1,
      description: "Purchase Reward",
      points: 150,
      date: "Oct 15, 2024"
    },
    {
      id: 2,
      description: "Product Review",
      points: 50,
      date: "Oct 12, 2024"
    },
    {
      id: 3,
      description: "Referral Bonus",
      points: 200,
      date: "Oct 8, 2024"
    }],

    availableRewards: [
    {
      id: 1,
      title: "Free Shipping",
      description: "Free shipping on next order",
      points: 500
    },
    {
      id: 2,
      title: "10% Discount",
      description: "10% off any case purchase",
      points: 1000
    },
    {
      id: 3,
      title: "Premium Case",
      description: "Free premium case of choice",
      points: 2500
    },
    {
      id: 4,
      title: "VIP Access",
      description: "Early access to new collections",
      points: 5000
    }]

  };

  // Event handlers
  const handleViewAllOrders = () => {
    navigate('/order-history');
  };

  const handleReorder = (orderId) => {
    console.log('Reordering:', orderId);
    // Add to cart logic here
  };

  const handleTrackOrder = (orderId) => {
    navigate(`/track-order/${orderId}`);
  };

  const handleViewAllWishlist = () => {
    navigate('/wishlist');
  };

  const handleAddToCart = (productId) => {
    console.log('Adding to cart:', productId);
    // Add to cart logic here
  };

  const handleRemoveFromWishlist = (itemId) => {
    console.log('Removing from wishlist:', itemId);
    // Remove from wishlist logic here
  };

  const handleAddToWishlist = (productId) => {
    console.log('Adding to wishlist:', productId);
    // Add to wishlist logic here
  };

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case 'track-order':navigate('/track-order');
        break;
      case 'browse-new':navigate('/smart-shop?filter=new');
        break;
      case 'protection-lab':navigate('/protection-lab');
        break;
      case 'refer-friend':navigate('/referral');
        break;
      case 'customer-support':navigate('/support');
        break;
      case 'account-settings':navigate('/account-settings');
        break;
      default:
        console.log('Unknown action:', actionId);
    }
  };

  const handleRedeemPoints = (rewardId) => {
    console.log('Redeeming reward:', rewardId);
    // Redeem points logic here
  };

  const handleViewRewards = () => {
    navigate('/loyalty-rewards');
  };

  const handleEditProfile = (section) => {
    navigate(`/account-settings?section=${section}`);
  };

  const handleChangePassword = () => {
    navigate('/account-settings?section=security');
  };

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Welcome back, {userProfile?.name?.split(' ')?.[0]}!
                </h1>
                <p className="text-muted-foreground mt-1">
                  Here's what's happening with your ZZQ Stores account
                </p>
              </div>
              <Button
                variant="default"
                onClick={() => navigate('/smart-shop')}
                iconName="ShoppingBag"
                iconPosition="left">

                Shop Now
              </Button>
            </div>
          </div>

          {/* Dashboard Stats */}
          <div className="mb-8">
            <DashboardStats stats={dashboardStats} />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Recent Orders */}
              <RecentOrders
                orders={recentOrders}
                onViewAll={handleViewAllOrders}
                onReorder={handleReorder}
                onTrackOrder={handleTrackOrder} />


              {/* Personalized Recommendations */}
              <PersonalizedRecommendations
                recommendations={personalizedRecommendations}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist} />

            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <QuickActions onAction={handleQuickAction} />

              {/* Wishlist Preview */}
              <WishlistPreview
                wishlistItems={wishlistItems}
                onViewAll={handleViewAllWishlist}
                onAddToCart={handleAddToCart}
                onRemoveFromWishlist={handleRemoveFromWishlist} />

            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* Loyalty Program */}
            <LoyaltyProgram
              loyaltyData={loyaltyData}
              onRedeemPoints={handleRedeemPoints}
              onViewRewards={handleViewRewards} />


            {/* Account Overview */}
            <AccountOverview
              userProfile={userProfile}
              onEditProfile={handleEditProfile}
              onChangePassword={handleChangePassword} />

          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-brand rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">Z</span>
                </div>
                <span className="text-xl font-bold">ZZQ Stores</span>
              </div>
              <p className="text-secondary-foreground/80 mb-4">
                Premium phone protection that enhances your device's style. Where function meets fashion.
              </p>
              <div className="flex items-center space-x-4">
                <Icon name="Facebook" size={20} className="text-secondary-foreground/60 hover:text-secondary-foreground cursor-pointer" />
                <Icon name="Twitter" size={20} className="text-secondary-foreground/60 hover:text-secondary-foreground cursor-pointer" />
                <Icon name="Instagram" size={20} className="text-secondary-foreground/60 hover:text-secondary-foreground cursor-pointer" />
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-secondary-foreground/80">
                <li><button onClick={() => navigate('/smart-shop')} className="hover:text-secondary-foreground">Shop Cases</button></li>
                <li><button onClick={() => navigate('/protection-lab')} className="hover:text-secondary-foreground">Protection Lab</button></li>
                <li><button onClick={() => navigate('/support')} className="hover:text-secondary-foreground">Support</button></li>
                <li><button onClick={() => navigate('/about')} className="hover:text-secondary-foreground">About Us</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Account</h4>
              <ul className="space-y-2 text-secondary-foreground/80">
                <li><button onClick={() => navigate('/user-dashboard')} className="hover:text-secondary-foreground">Dashboard</button></li>
                <li><button onClick={() => navigate('/order-history')} className="hover:text-secondary-foreground">Order History</button></li>
                <li><button onClick={() => navigate('/wishlist')} className="hover:text-secondary-foreground">Wishlist</button></li>
                <li><button onClick={() => navigate('/loyalty-rewards')} className="hover:text-secondary-foreground">Rewards</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center text-secondary-foreground/60">
            <p>&copy; {new Date()?.getFullYear()} ZZQ Stores. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>);

};

export default UserDashboard;