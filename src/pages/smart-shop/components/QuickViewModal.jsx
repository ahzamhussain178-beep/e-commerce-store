import React, { useState } from 'react';
import Image from '../../../components/Appimage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const QuickViewModal = ({ product, isOpen, onClose, onAddToCart }) => {
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !product) return null;

  const quantityOptions = Array.from({ length: 10 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1}`
  }));

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
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

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      selectedColor,
      quantity: selectedQuantity
    });
    onClose();
  };

  const productImages = product?.gallery || [product?.image];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-background rounded-lg shadow-brand-xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-secondary font-inter">Quick View</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-text-secondary hover:text-primary"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <Image
                src={productImages?.[currentImageIndex]}
                alt={`${product?.name} - View ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            
            {productImages?.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {productImages?.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      currentImageIndex === index ? 'border-primary' : 'border-border'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product?.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Brand & Category */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-primary uppercase tracking-wide">
                {product?.brand}
              </span>
              <span className="text-sm text-text-secondary">
                {product?.category}
              </span>
            </div>

            {/* Product Name */}
            <h1 className="text-2xl font-bold text-secondary font-inter">
              {product?.name}
            </h1>

            {/* Rating & Reviews */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                {renderStars(product?.rating)}
              </div>
              <span className="font-medium text-secondary">
                {product?.rating}
              </span>
              <span className="text-text-secondary">
                ({product?.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-secondary font-inter">
                {formatPrice(product?.price)}
              </span>
              {product?.originalPrice && product?.originalPrice > product?.price && (
                <span className="text-lg text-text-secondary line-through">
                  {formatPrice(product?.originalPrice)}
                </span>
              )}
              {product?.discount && (
                <span className="bg-green-600 text-white text-sm font-medium px-2 py-1 rounded-full">
                  Save {product?.discount}%
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-text-secondary leading-relaxed">
              {product?.description}
            </p>

            {/* Compatibility */}
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-medium text-secondary mb-2 font-inter">Device Compatibility</h4>
              <p className="text-sm text-text-secondary">{product?.compatibility}</p>
            </div>

            {/* Features */}
            <div>
              <h4 className="font-medium text-secondary mb-3 font-inter">Key Features</h4>
              <div className="flex flex-wrap gap-2">
                {product?.features?.map((feature, index) => (
                  <span
                    key={index}
                    className="bg-muted text-text-secondary text-sm px-3 py-1 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            {product?.colors && product?.colors?.length > 0 && (
              <div>
                <h4 className="font-medium text-secondary mb-3 font-inter">Color</h4>
                <div className="flex space-x-2">
                  {product?.colors?.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor === color ? 'border-primary scale-110' : 'border-border'
                      }`}
                      style={{ backgroundColor: color?.toLowerCase() }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary mb-2 font-inter">
                  Quantity
                </label>
                <Select
                  options={quantityOptions}
                  value={selectedQuantity}
                  onChange={setSelectedQuantity}
                  className="w-24"
                />
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="default"
                  onClick={handleAddToCart}
                  disabled={product?.stock === 0}
                  className="flex-1"
                  iconName="ShoppingCart"
                  iconPosition="left"
                >
                  {product?.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {/* Handle wishlist */}}
                  iconName="Heart"
                  size="lg"
                />
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                product?.stock > 10 ? 'bg-green-500' : 
                product?.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'
              }`} />
              <span className="text-sm text-text-secondary">
                {product?.stock > 10 ? 'In Stock' : 
                 product?.stock > 0 ? `Only ${product?.stock} left in stock` : 'Out of Stock'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;