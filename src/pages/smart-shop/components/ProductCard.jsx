import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/Appimage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product, onQuickView, onAddToCart, onToggleWishlist, isInWishlist }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate('/product-detail', { state: { product } });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={12}
        className={index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    })?.format(price);
  };

  return (
    <div 
      className="bg-background border border-border rounded-lg overflow-hidden shadow-brand hover:shadow-brand-lg transition-all duration-300 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product?.image}
          alt={product?.imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
          onClick={handleProductClick}
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {product?.isNew && (
            <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
              New
            </span>
          )}
          {product?.isBestseller && (
            <span className="bg-yellow-500 text-white text-xs font-medium px-2 py-1 rounded-full">
              Bestseller
            </span>
          )}
          {product?.discount && (
            <span className="bg-green-600 text-white text-xs font-medium px-2 py-1 rounded-full">
              -{product?.discount}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e?.stopPropagation();
            onToggleWishlist(product?.id);
          }}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-brand transition-all duration-200"
        >
          <Icon
            name="Heart"
            size={16}
            className={isInWishlist ? 'text-primary fill-current' : 'text-text-secondary'}
          />
        </button>

        {/* Quick Actions (Hover) */}
        {isHovered && (
          <div className="absolute inset-x-3 bottom-3 flex space-x-2 animate-slide-up">
            <Button
              variant="secondary"
              size="sm"
              onClick={(e) => {
                e?.stopPropagation();
                onQuickView(product);
              }}
              className="flex-1"
              iconName="Eye"
              iconPosition="left"
            >
              Quick View
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={(e) => {
                e?.stopPropagation();
                onAddToCart(product);
              }}
              className="flex-1"
              iconName="ShoppingCart"
              iconPosition="left"
            >
              Add to Cart
            </Button>
          </div>
        )}
      </div>
      {/* Product Info */}
      <div className="p-4">
        {/* Brand & Category */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-primary uppercase tracking-wide">
            {product?.brand}
          </span>
          <span className="text-xs text-text-secondary">
            {product?.category}
          </span>
        </div>

        {/* Product Name */}
        <h3 
          className="font-semibold text-secondary mb-2 line-clamp-2 cursor-pointer hover:text-primary transition-colors font-inter"
          onClick={handleProductClick}
        >
          {product?.name}
        </h3>

        {/* Device Compatibility */}
        <p className="text-sm text-text-secondary mb-3">
          Compatible with {product?.compatibility}
        </p>

        {/* Rating & Reviews */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center space-x-1">
            {renderStars(product?.rating)}
          </div>
          <span className="text-sm font-medium text-secondary">
            {product?.rating}
          </span>
          <span className="text-sm text-text-secondary">
            ({product?.reviewCount} reviews)
          </span>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product?.features?.slice(0, 2)?.map((feature, index) => (
            <span
              key={index}
              className="text-xs bg-muted text-text-secondary px-2 py-1 rounded-full"
            >
              {feature}
            </span>
          ))}
          {product?.features?.length > 2 && (
            <span className="text-xs text-text-secondary px-2 py-1">
              +{product?.features?.length - 2} more
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-secondary font-inter">
              {formatPrice(product?.price)}
            </span>
            {product?.originalPrice && product?.originalPrice > product?.price && (
              <span className="text-sm text-text-secondary line-through">
                {formatPrice(product?.originalPrice)}
              </span>
            )}
          </div>
          
          {/* Stock Status */}
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${
              product?.stock > 10 ? 'bg-green-500' : 
              product?.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'
            }`} />
            <span className="text-xs text-text-secondary">
              {product?.stock > 10 ? 'In Stock' : 
               product?.stock > 0 ? `${product?.stock} left` : 'Out of Stock'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;