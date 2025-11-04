import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/Appimage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TrendingProducts = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  const products = [
  {
    id: 1,
    name: "ProShield Elite",
    category: "professional",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.9,
    reviews: 1247,
    image: "https://images.unsplash.com/photo-1667862714290-f44b8e1c257b",
    alt: "Premium black leather smartphone case with magnetic closure and card slots",
    badge: "Best Seller",
    features: ["Drop Protection", "Wireless Charging", "Card Storage"],
    isNew: false,
    discount: 20
  },
  {
    id: 2,
    name: "GameMax Pro",
    category: "gaming",
    price: 89.99,
    originalPrice: null,
    rating: 4.8,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1683891358030-46610982e059",
    alt: "Gaming smartphone case with RGB lighting strips and enhanced grip texture",
    badge: "Pro Series",
    features: ["Cooling Vents", "Enhanced Grip", "RGB Lighting"],
    isNew: true,
    discount: 0
  },
  {
    id: 3,
    name: "AdventureGuard",
    category: "outdoor",
    price: 94.99,
    originalPrice: 119.99,
    rating: 4.9,
    reviews: 654,
    image: "https://images.unsplash.com/photo-1564133471861-7068d2014198",
    alt: "Rugged waterproof smartphone case with reinforced corners and lanyard attachment",
    badge: "Military Grade",
    features: ["Waterproof", "Shockproof", "Dustproof"],
    isNew: false,
    discount: 21
  },
  {
    id: 4,
    name: "StyleFlex Marble",
    category: "fashion",
    price: 49.99,
    originalPrice: 59.99,
    rating: 4.7,
    reviews: 1893,
    image: "https://images.unsplash.com/photo-1592535557118-fc979e971bcf",
    alt: "Fashionable marble pattern smartphone case with rose gold accents and glossy finish",
    badge: "Trending",
    features: ["Marble Design", "Slim Profile", "Scratch Resistant"],
    isNew: false,
    discount: 17
  },
  {
    id: 5,
    name: "ClearVision Ultra",
    category: "minimalist",
    price: 34.99,
    originalPrice: null,
    rating: 4.6,
    reviews: 2156,
    image: "https://images.unsplash.com/photo-1706379062668-5685e457c10d",
    alt: "Crystal clear minimalist smartphone case with anti-yellowing technology",
    badge: "Essential",
    features: ["Crystal Clear", "Anti-Yellow", "Lightweight"],
    isNew: false,
    discount: 0
  },
  {
    id: 6,
    name: "LuxeLeather Executive",
    category: "professional",
    price: 129.99,
    originalPrice: 149.99,
    rating: 4.9,
    reviews: 423,
    image: "https://images.unsplash.com/photo-1644762472703-5a9d9cfc02ce",
    alt: "Premium genuine leather smartphone case with gold hardware and executive design",
    badge: "Luxury",
    features: ["Genuine Leather", "Gold Hardware", "Handcrafted"],
    isNew: true,
    discount: 13
  }];


  const tabs = [
  { id: 'all', label: 'All Products', icon: 'Grid3X3' },
  { id: 'professional', label: 'Professional', icon: 'Briefcase' },
  { id: 'gaming', label: 'Gaming', icon: 'Gamepad2' },
  { id: 'outdoor', label: 'Outdoor', icon: 'Mountain' },
  { id: 'fashion', label: 'Fashion', icon: 'Sparkles' },
  { id: 'minimalist', label: 'Minimalist', icon: 'Minus' }];


  const filteredProducts = activeTab === 'all' ?
  products :
  products?.filter((product) => product?.category === activeTab);

  const handleProductClick = (productId) => {
    navigate('/product-detail', { state: { productId } });
  };

  const handleAddToCart = (e, product) => {
    e?.stopPropagation();
    // Add to cart logic would go here
    console.log('Added to cart:', product?.name);
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-6">
            <Icon name="TrendingUp" size={16} className="mr-2" />
            Trending Now
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
            Most Popular Cases
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Discover what's trending among our customers. These top-rated cases combine style, protection, and innovation.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs?.map((tab) =>
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeTab === tab?.id ?
            'bg-primary text-primary-foreground shadow-brand' :
            'bg-background text-text-secondary hover:bg-muted hover:text-text-primary'}`
            }>

              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts?.map((product) =>
          <div
            key={product?.id}
            onClick={() => handleProductClick(product?.id)}
            className="group bg-card rounded-2xl overflow-hidden shadow-brand hover:shadow-brand-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">

              {/* Product Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                src={product?.image}
                alt={product?.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />

                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    {product?.badge}
                  </span>
                  {product?.isNew &&
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      New
                    </span>
                }
                  {product?.discount > 0 &&
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      -{product?.discount}%
                    </span>
                }
                </div>

                {/* Quick Actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white hover:text-primary transition-colors">
                    <Icon name="Heart" size={16} />
                  </button>
                  <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white hover:text-primary transition-colors">
                    <Icon name="Eye" size={16} />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                {/* Rating */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)]?.map((_, i) =>
                  <Icon
                    key={i}
                    name="Star"
                    size={14}
                    className={`${
                    i < Math.floor(product?.rating) ?
                    'text-yellow-400 fill-current' : 'text-gray-300'}`
                    } />

                  )}
                  </div>
                  <span className="text-sm text-text-secondary">
                    {product?.rating} ({product?.reviews})
                  </span>
                </div>

                {/* Product Name */}
                <h3 className="text-xl font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                  {product?.name}
                </h3>

                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {product?.features?.slice(0, 3)?.map((feature, index) =>
                <span
                  key={index}
                  className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">

                      {feature}
                    </span>
                )}
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-primary">
                      ${product?.price}
                    </span>
                    {product?.originalPrice &&
                  <span className="text-sm text-text-secondary line-through">
                        ${product?.originalPrice}
                      </span>
                  }
                  </div>
                  
                  <Button
                  variant="default"
                  size="sm"
                  onClick={(e) => handleAddToCart(e, product)}
                  className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                  iconName="ShoppingCart"
                  iconPosition="left">

                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* View All Products CTA */}
        <div className="text-center mt-16">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/smart-shop')}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            iconName="ArrowRight"
            iconPosition="right">

            View All Products
          </Button>
        </div>
      </div>
    </section>);

};

export default TrendingProducts;