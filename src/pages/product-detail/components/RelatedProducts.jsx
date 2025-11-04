import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RelatedProducts = () => {
  const navigate = useNavigate();

  const relatedProducts = [
  {
    id: 1,
    name: "ZZQ Clear Shield Pro",
    price: 34.99,
    originalPrice: 44.99,
    image: "https://images.unsplash.com/photo-1618177941067-3f26d7c6eecf",
    imageAlt: "Clear transparent phone case showing device design through crystal clear material",
    rating: 4.7,
    reviews: 1234,
    badge: "TRENDING",
    features: ["Crystal Clear", "Drop Protection", "Wireless Charging"]
  },
  {
    id: 2,
    name: "ZZQ Leather Executive",
    price: 59.99,
    originalPrice: 79.99,
    image: "https://images.unsplash.com/photo-1662569074546-d99afa414862",
    imageAlt: "Premium brown leather phone case with card slots and professional finish",
    rating: 4.9,
    reviews: 892,
    badge: "PREMIUM",
    features: ["Genuine Leather", "Card Slots", "Stand Function"]
  },
  {
    id: 3,
    name: "ZZQ Sport Armor",
    price: 42.99,
    originalPrice: 54.99,
    image: "https://images.unsplash.com/photo-1625465329894-9cfaf8a63332",
    imageAlt: "Rugged black phone case with textured grip and reinforced corners for sports",
    rating: 4.8,
    reviews: 2156,
    badge: "BESTSELLER",
    features: ["Rugged Design", "Enhanced Grip", "Shock Absorption"]
  },
  {
    id: 4,
    name: "ZZQ Minimalist Thin",
    price: 24.99,
    originalPrice: 29.99,
    image: "https://images.unsplash.com/photo-1625383659159-8ee66e4e1828",
    imageAlt: "Ultra-thin black phone case with minimal design and precise cutouts",
    rating: 4.6,
    reviews: 756,
    badge: "LIGHTWEIGHT",
    features: ["Ultra Thin", "Lightweight", "Precise Fit"]
  }];


  const handleProductClick = (productId) => {
    // In a real app, this would navigate to the specific product
    navigate('/product-detail');
    window.scrollTo(0, 0);
  };

  const handleAddToCart = (product, e) => {
    e?.stopPropagation();
    // Add to cart logic here
    console.log('Added to cart:', product?.name);
  };

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 font-inter">
            You Might Also Like
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-inter">
            Discover more premium protection solutions designed to complement your style and needs
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts?.map((product) =>
          <div
            key={product?.id}
            onClick={() => handleProductClick(product?.id)}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-brand-lg transition-all duration-300 cursor-pointer group">

              {/* Product Image */}
              <div className="relative aspect-square bg-gray-50 overflow-hidden">
                <Image
                src={product?.image}
                alt={product?.imageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />

                
                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium font-inter ${
                product?.badge === 'BESTSELLER' ? 'bg-primary text-primary-foreground' :
                product?.badge === 'PREMIUM' ? 'bg-purple-100 text-purple-800' :
                product?.badge === 'TRENDING' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`
                }>
                    {product?.badge}
                  </span>
                </div>

                {/* Quick Actions */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                  onClick={(e) => {
                    e?.stopPropagation();
                    // Add to wishlist logic
                  }}
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-brand hover:bg-gray-50 transition-colors duration-200">

                    <Icon name="Heart" size={16} className="text-gray-600" />
                  </button>
                </div>

                {/* Quick Add to Cart */}
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                  variant="default"
                  size="sm"
                  onClick={(e) => handleAddToCart(product, e)}
                  className="w-full"
                  iconName="ShoppingCart"
                  iconPosition="left">

                    Quick Add
                  </Button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-2">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)]?.map((_, i) =>
                  <Icon
                    key={i}
                    name="Star"
                    size={12}
                    className={i < Math.floor(product?.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} />

                  )}
                  </div>
                  <span className="text-xs text-gray-600 font-inter">
                    {product?.rating} ({product?.reviews})
                  </span>
                </div>

                {/* Product Name */}
                <h3 className="font-semibold text-gray-900 mb-2 font-inter line-clamp-2">
                  {product?.name}
                </h3>

                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {product?.features?.slice(0, 2)?.map((feature, index) =>
                <span
                  key={index}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded font-inter">

                      {feature}
                    </span>
                )}
                  {product?.features?.length > 2 &&
                <span className="text-xs text-gray-500 font-inter">
                      +{product?.features?.length - 2} more
                    </span>
                }
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-900 font-inter">
                    ${product?.price}
                  </span>
                  <span className="text-sm text-gray-500 line-through font-inter">
                    ${product?.originalPrice}
                  </span>
                </div>

                {/* Savings */}
                <div className="mt-1">
                  <span className="text-xs text-green-600 font-medium font-inter">
                    Save ${(product?.originalPrice - product?.price)?.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Button
            variant="outline"
            onClick={() => navigate('/smart-shop')}
            iconName="ArrowRight"
            iconPosition="right">

            View All Products
          </Button>
        </div>
      </div>
    </div>);

};

export default RelatedProducts;