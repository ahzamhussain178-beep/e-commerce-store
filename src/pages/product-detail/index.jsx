import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import ProductImageGallery from './components/ProductImageGallery';
import ProductInfo from './components/ProductInfo';
import ProductTabs from './components/ProductTabs';
import RelatedProducts from './components/RelatedProducts';
import RecentlyViewed from './components/RecentlyViewed';

const ProductDetail = () => {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [cartMessage, setCartMessage] = useState('');

  // Mock product data
  const product = {
    id: 1,
    name: "ZZQ Premium Protection Case",
    price: 39.99,
    originalPrice: 54.99,
    description: `The ZZQ Premium Protection Case represents the perfect fusion of military-grade protection and sophisticated design. 
    Engineered with advanced shock-absorption technology and premium materials, this case provides uncompromising protection 
    while maintaining the sleek profile your device deserves.`,
    category: "Phone Cases",
    brand: "ZZQ Stores",
    sku: "ZZQ-PPC-001",
    inStock: true,
    stockCount: 247,
    rating: 4.8,
    reviewCount: 2847,
    features: [
      "Military-grade drop protection up to 12 feet",
      "Wireless charging compatible",
      "Raised camera lip protection",
      "Anti-fingerprint oleophobic coating",
      "Precision-molded tactile buttons",
      "Air-Guard corner technology"
    ],
    compatibility: ["iPhone 15 Pro", "iPhone 15 Pro Max"],
    colors: ["Midnight Black", "Crimson Red", "Ocean Blue", "Crystal Clear"],
    warranty: "2 years",
    shipping: "Free shipping on orders over $50"
  };

  // Breadcrumb navigation
  const breadcrumbs = [
    { name: 'Home', path: '/homepage' },
    { name: 'Shop', path: '/smart-shop' },
    { name: 'Phone Cases', path: '/smart-shop?category=cases' },
    { name: product?.name, path: '/product-detail', current: true }
  ];

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Set page title
    document.title = `${product?.name} - ZZQ Stores`;
  }, [product?.name]);

  const handleAddToCart = (quantity, selectedColor) => {
    // Add to cart logic here
    setCartMessage(`Added ${quantity} ${selectedColor} case(s) to cart!`);
    setTimeout(() => setCartMessage(''), 3000);
    
    // In a real app, this would update cart state/context
    console.log('Added to cart:', { product: product?.name, quantity, color: selectedColor });
  };

  const handleAddToWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // In a real app, this would update wishlist state/context
    console.log(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleBreadcrumbClick = (path) => {
    if (path !== '/product-detail') {
      navigate(path);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: product?.description,
        url: window.location?.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard?.writeText(window.location?.href);
      alert('Product link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Success Message */}
      {cartMessage && (
        <div className="fixed top-20 right-4 z-50 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-brand animate-slide-up">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-green-600" />
            <span className="font-inter">{cartMessage}</span>
          </div>
        </div>
      )}
      <main className="pt-16">
        {/* Breadcrumb Navigation */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              {breadcrumbs?.map((item, index) => (
                <React.Fragment key={item?.name}>
                  {index > 0 && (
                    <Icon name="ChevronRight" size={14} className="text-gray-400" />
                  )}
                  <button
                    onClick={() => handleBreadcrumbClick(item?.path)}
                    className={`font-inter transition-colors duration-200 ${
                      item?.current
                        ? 'text-gray-900 font-medium cursor-default' :'text-gray-600 hover:text-gray-900'
                    }`}
                    disabled={item?.current}
                  >
                    {item?.name}
                  </button>
                </React.Fragment>
              ))}
            </nav>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <div className="order-1">
              <ProductImageGallery product={product} />
            </div>

            {/* Product Information */}
            <div className="order-2">
              <ProductInfo
                product={product}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
              />
              
              {/* Social Share */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700 font-inter">Share:</span>
                  <button
                    onClick={handleShare}
                    className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors duration-200"
                  >
                    <Icon name="Share2" size={16} />
                    <span className="text-sm font-inter">Share Product</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductTabs product={product} />
        </div>

        {/* Related Products */}
        <RelatedProducts />

        {/* Recently Viewed */}
        <RecentlyViewed />

        {/* Trust Signals Footer */}
        <div className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center space-y-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Shield" size={24} className="text-white" />
                </div>
                <h3 className="font-semibold font-inter">Premium Protection</h3>
                <p className="text-gray-300 text-sm font-inter">
                  Military-grade materials tested to withstand extreme conditions
                </p>
              </div>
              
              <div className="flex flex-col items-center space-y-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Award" size={24} className="text-white" />
                </div>
                <h3 className="font-semibold font-inter">2-Year Warranty</h3>
                <p className="text-gray-300 text-sm font-inter">
                  Comprehensive coverage for manufacturing defects and wear
                </p>
              </div>
              
              <div className="flex flex-col items-center space-y-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Truck" size={24} className="text-white" />
                </div>
                <h3 className="font-semibold font-inter">Free Shipping</h3>
                <p className="text-gray-300 text-sm font-inter">
                  Fast, secure delivery on all orders over $50
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Add to Cart (Mobile) */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="text-lg font-bold text-gray-900 font-inter">${product?.price}</div>
              <div className="text-sm text-gray-500 font-inter">{product?.name}</div>
            </div>
            <button
              onClick={() => handleAddToCart(1, 'black')}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium font-inter hover:bg-primary/90 transition-colors duration-200 flex items-center space-x-2"
            >
              <Icon name="ShoppingCart" size={18} />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;